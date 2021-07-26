import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { AccountDataContext } from "../../contexts/AccountData";
import { auth } from "../../services/firebase";

import "./styles.scss";

const MoneyInAccount: FC = () => {
  const { money, britas, bitcoins } = useContext(AccountDataContext);
  const authenticated = auth.currentUser;

  console.log(authenticated);

  if (!authenticated) return null;

  return (
    <div className="coinsInAccount">
      <Link to="/brl-bitcoin" className="bitcoinsInAccount moneyInAccount">
        {bitcoins.toFixed(8)}
        <strong> BTC</strong>
      </Link>
      <Link to="/brl-brita" className="britasInAccount moneyInAccount">
        {britas.toFixed(2)}
        <strong> BRI</strong>
      </Link>
      <div className="reaisInAccount moneyInAccount">
        <strong>R$ </strong>
        {money.toFixed(2)}
      </div>
    </div>
  );
};

export default MoneyInAccount;
