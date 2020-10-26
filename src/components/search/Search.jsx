import React, { useState } from "react";

import Input from "../input/Input";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <div>
      <Input
        noMargin
        type="text"
        placeholder="pretraži"
        value={search}
        handleChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
