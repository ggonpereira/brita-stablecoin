import React from "react";
import { Switch } from "react-router-dom";

import CustomRoute from "./CustomRoute";

import AccountDataProvider from "../contexts/AccountData";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import TradeMainPage from "../pages/Trade-Main-Page";
import BrlBrita from "../pages/Brl-Brita";
import BrlBitcoin from "../pages/Brl-Bitcoin";
import BitcoinBrita from "../pages/Bitcoin-Brita";
import { auth } from "../services/firebase";

export default function Routes() {
  return (
    // <PriceContextProvider>
    <Switch>
      {!auth.currentUser && <CustomRoute path="/" exact component={Home} />}
      <CustomRoute path="/register" component={Register} />
      <CustomRoute path="/login" component={Login} />
      <AccountDataProvider>
        {auth.currentUser && <CustomRoute path="/" exact component={Home} />}
        <CustomRoute isPrivate path="/profile" component={Profile} />
        <CustomRoute isPrivate path="/trade" component={TradeMainPage} />
        <CustomRoute isPrivate path="/brl-brita" component={BrlBrita} />
        <CustomRoute isPrivate path="/brl-bitcoin" component={BrlBitcoin} />
        <CustomRoute isPrivate path="/bitcoin-brita" component={BitcoinBrita} />
      </AccountDataProvider>
    </Switch>
    // </PriceContextProvider>
  );
}
