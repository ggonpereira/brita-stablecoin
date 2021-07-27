import React, { FC, useContext } from "react";
import toast from "react-hot-toast";
import { AccountDataContext } from "../../contexts/AccountData";

import { IBuyBrlCardProps } from "../../interfaces";
import CommonBrlCard from "../CommonBrlCard";

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
    <CommonBrlCard
      coinName={coinName}
      loading={loading}
      price={price}
      britas={britas}
      bitcoins={bitcoins}
      moneyInTransaction={moneyInTransaction}
      handleTransaction={handleTransaction}
      handleChangeMoneyInAccount={handleChangeMoneyInAccount}
      buying={true}
    />
  );
};

export default BuyBrlCard;
