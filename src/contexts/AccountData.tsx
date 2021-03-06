import React, { FC, useState, createContext } from "react";

import { IAccountData, IAccountDataProviderProps } from "../interfaces";

export const AccountDataContext = createContext({} as IAccountData);

const AccountDataProvider: FC<IAccountDataProviderProps> = ({ children }) => {
  const defaultAccountData = {
    bitcoins: 0,
    britas: 0,
    money: 100000,
    transactions: [],
  };

  const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
  const dataParsed = dataStored ? JSON.parse(dataStored) : defaultAccountData;

  const [moneyInAccount, setMoneyInAccount] = useState<number>(() => {
    return dataParsed.money;
  });
  const [britasInAccount, setBritasInAccount] = useState<number>(() => {
    return dataParsed.britas;
  });
  const [bitcoinsInAccount, setBitcoinsInAccount] = useState<number>(() => {
    return dataParsed.bitcoins;
  });
  const [transactions, setTransactions] = useState<string[]>(() => {
    return dataParsed.transactions;
  });

  return (
    <AccountDataContext.Provider
      value={{
        money: moneyInAccount,
        transactions,
        britas: britasInAccount,
        bitcoins: bitcoinsInAccount,
        setMoneyInAccount,
        setTransactions,
        setBritasInAccount,
        setBitcoinsInAccount,
      }}
    >
      {children}
    </AccountDataContext.Provider>
  );
};

export default AccountDataProvider;
