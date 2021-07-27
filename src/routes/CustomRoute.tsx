import React, { FC, useEffect, useState } from "react";
import { Route, RouteProps } from "react-router-dom";
import { auth } from "../services/firebase";

import { css } from "@emotion/react";
// import ClipLoader from "react-spinners/ClipLoader";
import PuffLoader from "react-spinners/PuffLoader";

import AuthRoute from "../components/AuthRoute/index";
interface ICustomRoutesProps extends RouteProps {
  isPrivate?: boolean;
}

const override = css`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const CustomRoute: FC<ICustomRoutesProps> = ({ isPrivate, ...rest }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <PuffLoader
        color={"#835AFD"}
        loading={loading}
        css={override}
        size={150}
      />
    );
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
