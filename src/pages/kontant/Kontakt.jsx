import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import LinkButton from "../../components/linkButton/LinkButton";
import { db } from "../../firebase";

import "./kontakt.scss";
import Calendar from "../../components/calendar/Calendar";

const Kontakt = ({ handleChange, input, history, location, contacts, setInput }) => {
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [contactError, setContactError] = useState("");

  const validate = () => {
    let nameError = "";
    let surnameError = "";
    let contactError = "";

    if (!input.name) {
      nameError = "Neispravno ime";
    }

    if (!input.surname) {
      surnameError = "Neispravno prezime";
    }

    if (!input.contact) {
      contactError = "Neispravan kontakt";
    } else if (input.typeContact !== "email" && !input.contact.match(/^[0-9]*$/)) {
      contactError = "Samo brojke!";
    } else if (
      input.typeContact === "email" &&
      !input.contact.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    ) {
      contactError = "Neispravan email!";
    }
    if (nameError || surnameError || contactError) {
      setNameError(nameError);
      setSurnameError(surnameError);
      setContactError(contactError);

      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    const isValid = validate();
    if (isValid) {
      if (location.state) {
        event.preventDefault();
        db.collection("adresar")
          .doc(input.id)
          .update({
            ...input,
          });
        setInput({
          dateOfBirth: "",
          name: "",
          contact: "",
          favourite: false,
          surname: "",
          typeContact: "mobile",
        });
        setNameError("");
        setSurnameError("");
        setContactError("");
        history.replace("/kontakt", null);
      } else {
        event.preventDefault();
        db.collection("adresar").add({
          ...input,
        });
        setInput({
          dateOfBirth: "",
          name: "",
          contact: "",
          favourite: false,
          surname: "",
          typeContact: "mobile",
        });
        setNameError("");
        setSurnameError("");
        setContactError("");
      }
    }
    event.preventDefault();
  };

  useEffect(() => {
    if (location.state && contacts.length > 0) {
      const updateContact = contacts.filter((item) => item.id === location.state.prevPath)[0];
      setInput({ ...updateContact.person, id: updateContact.id });
    } else {
      history.replace("/kontakt", null);
    }
  }, []);

  return (
    <div className="kontakt__container">
      <h1>Obrazac za unos kontakta</h1>
      <div className="kontakt">
        <form id="kontakt__form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="ime"
            value={input.name}
            handleChange={handleChange}
            maxLength="100"
          />
          <Input
            type="text"
            name="surname"
            label="prezime"
            value={input.surname}
            handleChange={handleChange}
            maxLength="300"
          />
          <Calendar
            type="date"
            handleChange={handleChange}
            name="dateOfBirth"
            value={input.dateOfBirth}
            label="Datum rođenja"
          />
          <div className="kontakt__error1">
            <p>{nameError}</p>
            <p>{surnameError}</p>
          </div>

          <select onChange={handleChange} value={input.typeContact} name="typeContact">
            <option value="mobile">Mobitel</option>
            <option value="tel">Telefon</option>
            <option value="email">Email</option>
            <option value="pager">Pager</option>
          </select>
          <Input
            name="contact"
            label="Kontakt"
            value={input.contact}
            onChange={handleChange}
          />
          <div className="kontakt__error2">
            <p>{nameError || surnameError ? null : contactError}</p>
          </div>
          <Button type="submit">
            {location.state ? "prepravi kontakt" : "kreiraj kontakt"}
          </Button>
        </form>
        <LinkButton className="kontakt__link" kontakt onClick={() => history.push("/adresar")}>
          Adresar
        </LinkButton>
      </div>
    </div>
  );
};

export default withRouter(Kontakt);
