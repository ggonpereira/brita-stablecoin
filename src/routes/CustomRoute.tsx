import React, { FC, useEffect, useState } from "react";
import { Route, RouteProps } from "react-router-dom";
import {} from "react-router-dom";
import { auth } from "../services/firebase";

import AuthRoute from "../components/AuthRoute/index";

interface ICustomRoutesProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRoute: FC<ICustomRoutesProps> = ({ isPrivate, ...rest }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Usuário detectado.");
      } else {
        console.log("Não achamos seu usuário. Por favor, faça seu login!");
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (isPrivate) {
    return (
      <AuthRoute>
        <Route {...rest} />
      </AuthRoute>
    );
  }

  return <Route {...rest} />;
};

export default CustomRoute;
