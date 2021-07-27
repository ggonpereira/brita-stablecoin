import React, { FC } from "react";

import { IContainerProps } from "../../interfaces";

import "./styles.scss";

const Container: FC<IContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
