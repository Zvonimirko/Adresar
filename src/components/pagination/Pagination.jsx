import React from "react";
import Button from "../button/Button";

import "./pagination.scss";

const Pagination = ({ showPerPage, total, counter, setCounter }) => {
  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter <= 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (counter >= Math.ceil(total / showPerPage)) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="pagination">
      <Button
        inverted
        onClick={() => {
          onButtonClick("prev");
        }}
      >
        prošla
      </Button>
      <p>
        {counter} od {Math.ceil(total / showPerPage)}
      </p>
      <Button
        inverted
        onClick={() => {
          onButtonClick("next");
        }}
      >
        sljedeća
      </Button>
    </div>
  );
};

export default Pagination;
