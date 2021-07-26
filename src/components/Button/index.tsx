import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

interface IButtonProps {
  toUrl: string;
  children: ReactNode;
}

const Button: FC<IButtonProps> = ({ toUrl, children }) => {
  return (
    <Link to={toUrl} className="button">
      {children} <i className="fas fa-arrow-right"></i>
    </Link>
  );
};

export default Button;
