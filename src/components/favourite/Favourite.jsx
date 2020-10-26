import React from "react";
import { db } from "../../firebase";

const Favourite = ({ item, id }) => {
  const handleUpdate = () => {
    db.collection("adresar").doc(id).update({
      favourite: !item.favourite,
    });
  };
  return (
    <>
      {item.favourite ? (
        <span onClick={handleUpdate}>&#9733;</span>
      ) : (
        <span onClick={handleUpdate}>&#9734;</span>
      )}
    </>
  );
};

export default Favourite;
