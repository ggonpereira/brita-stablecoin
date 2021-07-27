import React, { FC, useContext } from "react";
import toast from "react-hot-toast";
import { AccountDataContext } from "../../contexts/AccountData";

import { IBuyBrlCardProps } from "../../interfaces";

import "./styles.scss";

// Dealing with numbers with "," as decimal separator
function parseMoney(val: string): number {
  return Number(val.trim().replace(".", "").replace(",", "."));
}

const BuyBrlCard: FC<IBuyBrlCardProps> = ({
  coinName,
  price,
  loading,
  moneyInTransaction,
  setMoneyInTransaction,
  setBritasBought,
  setBitcoinsBought,
  handleChangeMoneyInAccount,
}) => {
  const { britas, bitcoins } = useContext(AccountDataContext);

  function handleTransaction(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) < 0)
      return toast.error("Use somente valores maiores que zero!");

    // Will get the value inputed from user and multiply by actual coin price
    setMoneyInTransaction(Number(e.target.value) * parseMoney(price));

    if (coinName === "Brita") {
      return setBritasBought(e.target.value);
    }
    return setBitcoinsBought(e.target.value);
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
            onClick={handleChangeMoneyInAccount}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyBrlCard;
