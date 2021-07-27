import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../services/firebase";

import { IAuthRouteProps } from "../../interfaces";

const AuthRoute: FC<IAuthRouteProps> = ({ children }) => {
  if (!auth.currentUser) {
    return <Redirect to={"/login"} />;
  }

  return <div>{children}</div>;
};

export default AuthRoute;
