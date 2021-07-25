import React from "react";
import { Switch } from "react-router-dom";

import CustomRoute from "./CustomRoute";

import Home from "../pages/Home/index";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";
import Profile from "../pages/Profile/index";
import Trade from "../pages/Trade/index";

export default function Routes() {
  return (
    // <PriceContextProvider>
    <Switch>
      <CustomRoute path="/" exact component={Home} />
      <CustomRoute path="/register" component={Register} />
      <CustomRoute path="/login" component={Login} />
      <CustomRoute isPrivate path="/profile" component={Profile} />
      <CustomRoute isPrivate path="/trade" component={Trade} />
    </Switch>
    // </PriceContextProvider>
  );
}
