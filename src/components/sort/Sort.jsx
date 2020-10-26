import React from "react";
import Button from "../button/Button";

const Sort = ({ sorting, setSorting }) => {
  const handleChange = () => {
    let sort = "desc";
    if (sorting !== "desc") {
      setSorting(sort);
    } else {
      setSorting("asc");
    }
  };

  return (
    <Button inverted onClick={handleChange}>
      sortiraj
    </Button>
  );
};

export default Sort;
