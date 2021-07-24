import React, { FC, ReactNode } from "react";

import "./styles.scss";

interface IContainerProps {
  children: ReactNode;
}

const Container: FC<IContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
