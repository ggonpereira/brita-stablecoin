import React, { FC } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const MoneyInAccount: FC = () => {
  const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
  const dataParsed = dataStored && JSON.parse(dataStored);

  return (
    <div className="coinsInAccount">
      <Link to="/brl-bitcoin" className="bitcoinsInAccount moneyInAccount">
        {dataParsed?.bitcoins.toFixed(8)}
        <strong> BTC</strong>
      </Link>
      <Link to="/brl-brita" className="britasInAccount moneyInAccount">
        {dataParsed?.britas.toFixed(2)}
        <strong> BRI</strong>
      </Link>
      <div className="reaisInAccount moneyInAccount">
        <strong>R$ </strong>
        {dataParsed?.money.toFixed(2)}
      </div>
    </div>
  );
};

export default MoneyInAccount;
