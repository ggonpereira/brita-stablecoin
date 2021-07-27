import React, { FC, useContext } from "react";
import toast from "react-hot-toast";
import { AccountDataContext } from "../../contexts/AccountData";

import { ISellBrlCardProps } from "../../interfaces";

import "../BuyBrlCard/styles.scss";

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
    if (Number(e.target.value) < 0)
      return toast.error("Use somente valores maiores que zero!");

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
              Total em conta:{" "}
              <span>
                {coinName === "Brita" ? britas.toFixed(2) : bitcoins.toFixed(8)}
              </span>{" "}
              <small>{coinName === "Brita" ? "(BRI)" : "(BTC)"}</small>
            </span>
            <p>
              <strong>R$</strong> {moneyInTransaction.toFixed(2)}
            </p>
          </div>

          <input
            type="number"
            min="0"
            placeholder="Formato dos decimais: 0.5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleTransaction(e);
            }}
          />

          <button
            className={coinName.toLowerCase()}
            onClick={() => handleChangeMoneyInAccount(false)}
          >
            Vender
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellBrlCard;
