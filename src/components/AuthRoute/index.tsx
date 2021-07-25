import React, { FC, ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../services/firebase";

export interface IAuthRouteProps {
  children: ReactNode;
}

const AuthRoute: FC<IAuthRouteProps> = ({ children }) => {
  if (!auth.currentUser) {
    console.log("não achamos usuários, redirecionando...");
    return <Redirect to={"/login"} />;
  }

  return <div>{children}</div>;
};

export default AuthRoute;
