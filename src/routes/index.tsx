import React from "react";
import { Switch } from "react-router-dom";

import CustomRoute from "./CustomRoute";

import AccountDataProvider from "../contexts/AccountData";

import Home from "../pages/Home/index";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";
import Profile from "../pages/Profile/index";
import BrlBrita from "../pages/Brl-Brita/index";
import BrlBitcoin from "../pages/Brl-Bitcoin/index";
import BitcoinBrita from "../pages/Bitcoin-Brita/index";

export default function Routes() {
  return (
    // <PriceContextProvider>
    <Switch>
      <CustomRoute path="/register" component={Register} />
      <CustomRoute path="/login" component={Login} />
      <AccountDataProvider>
        <CustomRoute path="/" exact component={Home} />
        <CustomRoute isPrivate path="/profile" component={Profile} />
        <CustomRoute isPrivate path="/brl-brita" component={BrlBrita} />
        <CustomRoute isPrivate path="/brl-bitcoin" component={BrlBitcoin} />
        <CustomRoute isPrivate path="/bitcoin-brita" component={BitcoinBrita} />
      </AccountDataProvider>
    </Switch>
    // </PriceContextProvider>
  );
}
