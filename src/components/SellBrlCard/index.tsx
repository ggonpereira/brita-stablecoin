import React, { FC, useContext } from "react";
import { AccountDataContext } from "../../contexts/AccountData";

import "../BuyBrlCard/styles.scss";

interface ISellBrlCardProps {
  coinName: string;
  price: string;
  moneyInTransaction: number;
  loading: boolean;
  setMoneyInTransaction: any;
  setBritasSold?: any;
  setBitcoinsSold?: any;
  handleChangeMoneyInAccount: any;
}

// Dealing with numbers with "," as decimal separator
function parseMoney(val: string): number {
  return Number(val.trim().replace(".", "").replace(",", "."));
}

const SellBrlCard: FC<ISellBrlCardProps> = ({
  coinName,
  price,
  loading,
  moneyInTransaction,
  setMoneyInTransaction,
  setBritasSold,
  setBitcoinsSold,
  handleChangeMoneyInAccount,
}) => {
  const { britas, bitcoins } = useContext(AccountDataContext);

  function handleTransaction(e: React.ChangeEvent<HTMLInputElement>) {
    // Will get the value inputed from user and multiply by actual coin price
    setMoneyInTransaction(Number(e.target.value) * parseMoney(price));

    if (coinName === "Brita") {
      return setBritasSold(e.target.value);
    }
    return setBitcoinsSold(e.target.value);
  }

  return (
    <div className={`trade-card ${coinName.toLowerCase()}`}>
      <div className="content">
        <div className="header">
          <h2>
            {coinName} <small>{coinName === "Brita" ? "(BRI)" : "(BTC)"}</small>
          </h2>

          <p>
            <strong>R$ </strong>
            <span>{!loading ? price : "Carregando..."}</span>
          </p>
        </div>

        <div className="bottom">
          <div className="transaction-resume">
            <span>
              Total: <span>{coinName === "Brita" ? britas : bitcoins}</span>
            </span>
            <p>
              <strong>R$</strong> {moneyInTransaction.toFixed(2)}
            </p>
          </div>

          <input
            type="number"
            placeholder="3"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleTransaction(e);
            }}
          />

          <button onClick={() => handleChangeMoneyInAccount(false)}>
            Vender
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellBrlCard;