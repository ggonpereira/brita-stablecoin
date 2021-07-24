import React from "react";
import { Route, Switch } from "react-router-dom";

// import PriceContextProvider from "../contexts/PriceContext";

import Home from "../pages/Home/index";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";

export default function Routes() {
  return (
    // <PriceContextProvider>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
    // </PriceContextProvider>
  );
}
