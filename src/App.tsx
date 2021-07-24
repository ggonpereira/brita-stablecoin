import React from "react";
import Routes from "./routes/index";
import { BrowserRouter } from "react-router-dom";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
