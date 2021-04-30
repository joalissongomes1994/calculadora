import React from "react";

import "./button.css";

const Button = (props) => {
  return (
    <button
      className={`
      button
      ${props.operation ? "button-operation" : ""}
      ${props.double ? "button-double" : ""}
      ${props.triple ? "button-triple" : ""}
      `}
      onClick={() => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  );
};

export default Button;
