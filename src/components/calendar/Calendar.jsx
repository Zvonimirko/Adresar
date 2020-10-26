import React from "react";
import "./calendar.scss";

function Input({ handleChange, ...otherProps }) {
  return (
    <div className="group">
      <input className="form-calendar" onChange={handleChange} {...otherProps} />
      <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>
        {otherProps.label}
      </label>
    </div>
  );
}

export default Input;
