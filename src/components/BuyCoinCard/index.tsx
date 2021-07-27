import React, { FC, useContext } from "react";
import toast from "react-hot-toast";
import { AccountDataContext } from "../../contexts/AccountData";

import { IBuyCoinCardProps } from "../../interfaces";

import "../BuyBrlCard/styles.scss";

// Dealing with numbers with "," as decimal separator
function parseMoney(val: string): number {
  return Number(val.trim().replace(".", "").replace(",", "."));
}

const BuyCoinCard: FC<IBuyCoinCardProps> = ({
  coinName,
  loading,
  bitcoinPrice,
  britaPrice,
  setBritasBought,
  setBritasSold,
  setBitcoinsBought,
  setBitcoinsSold,
  handleChangeBitcoinsInAccount,
  handleChangeBritasInAccount,
}) => {
  const { britas, bitcoins } = useContext(AccountDataContext);

  function handleTransaction(e: React.ChangeEvent<HTMLInputElement>) {
    if (Number(e.target.value) < 0)
      return toast.error("Use somente valores maiores que zero!");

    // Parsing actual price of coin 1 to convert into price of coin 2
    if (coinName === "Brita") {
      const totalBritaPrice = Number(e.target.value) * parseMoney(britaPrice);

      const bitcoinsToSell = totalBritaPrice / parseMoney(bitcoinPrice);
      setBritasBought(Number(e.target.value));
      return setBitcoinsSold(bitcoinsToSell);
    }
    const totalBitcoinPrice = Number(e.target.value) * parseMoney(bitcoinPrice);

    const britasToSell = totalBitcoinPrice / parseMoney(britaPrice);
    setBitcoinsBought(Number(e.target.value));
    return setBritasSold(britasToSell);
  }

  function actualCoinPrice(): string {
    if (coinName === "Brita") return britaPrice;
    else return bitcoinPrice;
  }

  function showCoinEquivalent(coinName: string) {
    // Converting how much coins you can buy from another
    if (coinName === "Brita") {
      const equivalent = parseMoney(britaPrice) / parseMoney(bitcoinPrice);
      return equivalent.toFixed(10);
    }
    const equivalent = parseMoney(bitcoinPrice) / parseMoney(britaPrice);
    return equivalent.toFixed(2);
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
            <span>{!loading ? actualCoinPrice() : "Carregando..."}</span>
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
              <strong>1 {coinName}s</strong> = {showCoinEquivalent(coinName)}
              <strong> {coinName === "Brita" ? "(BTC)" : "(BRI)"}</strong>
            </p>
          </div>

          <input
            min="0"
            type="number"
            placeholder="Formato dos decimais: 0.5"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleTransaction(e);
            }}
          />

          {coinName === "Brita" ? (
            <button
              className={coinName.toLowerCase()}
              onClick={handleChangeBitcoinsInAccount}
            >
              Comprar Brita
            </button>
          ) : (
            <button
              className={coinName.toLowerCase()}
              onClick={handleChangeBritasInAccount}
            >
              Comprar Bitcoin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyCoinCard;
