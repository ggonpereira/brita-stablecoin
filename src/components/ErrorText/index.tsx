import React, { FC, ReactNode } from "react";

import "./styles.scss";

interface IErrorTextProps {
  children: ReactNode;
}

const ErrorText: FC<IErrorTextProps> = ({ children }) => {
  if (!children) return null;
  return <small className="error-text">{children}</small>;
};

export default ErrorText;
