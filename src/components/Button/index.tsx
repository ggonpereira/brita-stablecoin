import React, { FC } from "react";
import { Link } from "react-router-dom";

import { IButtonProps } from "../../interfaces";

import "./styles.scss";

const Button: FC<IButtonProps> = ({ toUrl, children }) => {
  return (
    <Link to={toUrl} className="button">
      {children} <i className="fas fa-arrow-right"></i>
    </Link>
  );
};

export default Button;
