import React from "react";
import "./input.scss";

function Input({ handleChange, ...otherProps }) {
  return (
    <div className="group">
      <input
        className={`${otherProps.noMargin ? "noMargin" : ""} form-input`}
        onChange={handleChange}
        {...otherProps}
      />
      <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>
        {otherProps.label}
      </label>
    </div>
  );
}

export default Input;
