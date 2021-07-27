import React, { FC } from "react";

import { IErrorTextProps } from "../../interfaces";

import "./styles.scss";

const ErrorText: FC<IErrorTextProps> = ({ children }) => {
  if (!children) return null;
  return <small className="error-text">{children}</small>;
};

export default ErrorText;
