import React, { FC, useContext } from "react";
import { AccountDataContext } from "../../contexts/AccountData";

import "./styles.scss";

interface IBuyCoinCardProps {
  coinName: string;
  price: string;
  loading: boolean;
  setBritasBought?: any;
  setBritasSold?: any;
  setBitcoinsBought?: any;
  setBitcoinsSold?: any;
  handleChangeCoinsInAccount: any;
}

// Dealing with numbers with "," as decimal separator
function parseMoney(val: string): number {
  return Number(val.trim().replace(".", "").replace(",", "."));
}

const BuyBrlCard: FC<IBuyCoinCardProps> = ({
  coinName,
  price,
  loading,
  setBritasBought,
  setBritasSold,
  setBitcoinsBought,
  setBitcoinsSold,
  handleChangeCoinsInAccount,
}) => {
  const { britas, bitcoins } = useContext(AccountDataContext);

  function handleTransaction(e: React.ChangeEvent<HTMLInputElement>) {
    if (coinName === "Brita") {
      setBritasBought(e.target.value);
      return setBitcoinsSold(e.target.value);
    }
    setBitcoinsBought(e.target.value);
    return setBritasSold(e.target.value);
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
          </div>

          <input
            type="number"
            placeholder="3"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleTransaction(e);
            }}
          />

          <button onClick={handleChangeCoinsInAccount}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default BuyBrlCard;
