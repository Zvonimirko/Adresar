import React from "react";
import Button from "../button/Button";

const ShowPerPage = ({ showPerPage, setShowPerPage, setCounter }) => {
  const onChangeShowPerPage = () => {
    setCounter(1);
    if (showPerPage === 15) {
      setShowPerPage(30);
    } else if (showPerPage === 30) {
      setShowPerPage(45);
    } else if (showPerPage === 45) {
      setShowPerPage(15);
    }
  };
  return (
    <Button onClick={onChangeShowPerPage} inverted>
      prikaži po stranici: {showPerPage}
    </Button>
  );
};

export default ShowPerPage;
