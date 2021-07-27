import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { AccountDataContext } from "../../contexts/AccountData";

import "./styles.scss";

const MoneyInAccount: FC = () => {
  const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
  const dataParsed = dataStored && JSON.parse(dataStored);

  const { money, britas, bitcoins } = useContext(AccountDataContext);

  // Function created to verify if datas aren't undefined
  function dataToShow(data: string) {
    // It will verify if exists data in the Context, if not, will get the localStorage data
    if (dataParsed) {
      if (data === "bitcoin") {
        if (bitcoins) return bitcoins.toFixed(8);
        return dataParsed.bitcoins.toFixed(8);
      } else if (data === "brita") {
        if (britas) return britas.toFixed(2);
        return dataParsed.britas.toFixed(2);
      } else {
        if (money) return money.toFixed(2);
        return dataParsed.money.toFixed(2);
      }
    }
  }

  return (
    <div className="coinsInAccount">
      <Link to="/brl-bitcoin" className="bitcoinsInAccount moneyInAccount">
        {dataToShow("bitcoin")}
        <strong> BTC</strong>
      </Link>
      <Link to="/brl-brita" className="britasInAccount moneyInAccount">
        {dataToShow("brita")}
        <strong> BRI</strong>
      </Link>
      <div className="reaisInAccount moneyInAccount">
        <strong>R$ </strong>
        {dataToShow("money")}
      </div>
    </div>
  );
};

export default MoneyInAccount;
