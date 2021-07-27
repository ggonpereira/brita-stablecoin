import React, { FC, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { auth } from "../services/firebase";

import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

import { ICustomRoutesProps } from "../interfaces";

import AuthRoute from "../components/AuthRoute/index";

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
