import React from "react";
import { withRouter, Link } from "react-router-dom";
import Button from "../../components/button/Button";
import LinkButton from "../../components/linkButton/LinkButton";
import { db } from "../../firebase";

import "./kontaktDetalji.scss";

const KontaktDetalji = ({ contacts, match, history }) => {
  const person = contacts.filter((item) => item.id === match.params.id)[0];

  const handleFBDelete = () => {
    db.collection("adresar").doc(person.id).delete();
    history.push("/adresar");
  };

  if (person) {
    var { name, surname, dateOfBirth, typeContact, contact } = person.person;
  }

  return (
    <div className="kontakt-detail-container">
      <div className="kontakt-detail">
        <h1 className="kontakt-detail__title">Kontakt</h1>
        {person ? (
          <div className="kontakt-detail__body">
            <div className="kontakt-detail__body__spans">
              <p>Ime:</p>
              <p>Prezime:</p>
              <p>Datum Rođenja:</p>
              <p>Vrsta Kontakta:</p>
              <p>Kontakt:</p>
            </div>
            <div className="kontakt-detail__body__data">
              <p>{name}</p>
              <p>{surname}</p>
              <p>{dateOfBirth}</p>
              <p>{typeContact}</p>
              <p>{contact}</p>
            </div>
          </div>
        ) : null}
        <div className="kontakt-detail__footer">
          <Button onClick={handleFBDelete}>Izbriši</Button>
          <LinkButton>
            <Link
              className="konakt-detail__link"
              to={{ pathname: "/kontakt", state: { prevPath: match.params.id } }}
            >
              Prepravi kontakt
            </Link>
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default withRouter(KontaktDetalji);
