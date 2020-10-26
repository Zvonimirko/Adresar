import React from "react";

import "./linkButton.scss";

function LinkButton({ children, kontakt, ...otherProps }) {
  return (
    <button {...otherProps} className={`${kontakt ? "kontakt" : ""} custom-link`}>
      {children}
    </button>
  );
}

export default LinkButton;
