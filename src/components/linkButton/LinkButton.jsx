import React from "react";

import "./linkButton.scss";

function LinkButton({ children, centered, ...otherProps }) {
  return (
    <button {...otherProps} className={`${centered ? "centered" : ""} custom-link`}>
      {children}
    </button>
  );
}

export default LinkButton;
