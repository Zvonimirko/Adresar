import React from "react";

import "./button.scss";

function Button({ children, inverted, ...otherProps }) {
  return (
    <button {...otherProps} className={`${inverted ? "inverted" : ""} custom-button`}>
      {children}
    </button>
  );
}

export default Button;
