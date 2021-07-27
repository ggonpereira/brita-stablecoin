import React from "react";
import { FC } from "react";

interface ICommonBrlCardProps {
  coinName: string;
  loading: boolean;
  price: string;
  britas: number;
  bitcoins: number;
  moneyInTransaction: number;
  handleTransaction: any;
  handleChangeMoneyInAccount: any;
  buying: boolean;
}

const CommonBrlCard: FC<ICommonBrlCardProps> = ({
  coinName,
  loading,
  price,
  britas,
  bitcoins,
  moneyInTransaction,
  handleTransaction,
  handleChangeMoneyInAccount,
  buying,
}) => {
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
            onClick={() => handleChangeMoneyInAccount(buying)}
          >
            {buying ? "Comprar" : "Vender"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonBrlCard;
