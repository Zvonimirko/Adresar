import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import Favourite from "../favourite/Favourite";

import "./person.scss";

const Person = ({ item }) => {
  const { name, surname, contact } = item.person;

  return (
    <div className="person">
      <p>{name}</p>
      <p>{surname}</p>
      <p>{contact}</p>
      <p>
        <span>
          <Favourite id={item.id} item={item.person} />
        </span>
        <span>
          <Link to={`/kontakt/${item.id}`}>&#9998;</Link>
        </span>
        <span
          onClick={() => {
            db.collection("adresar").doc(item.id).delete();
          }}
        >
          &#10005;
        </span>
      </p>
    </div>
  );
};

export default Person;
