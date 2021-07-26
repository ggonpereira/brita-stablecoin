import React, { FC, useState, createContext, ReactNode } from "react";

interface IAccountData {
  money: number;
  transactions: string[];
  britas: number;
  bitcoins: number;
  setMoneyInAccount: any;
  setTransactions: any;
  setBritasInAccount: any;
  setBitcoinsInAccount: any;
}

interface IAccountDataProviderProps {
  children: ReactNode;
}

export const AccountDataContext = createContext({} as IAccountData);

const AccountDataProvider: FC<IAccountDataProviderProps> = ({ children }) => {
  const dataStored = localStorage.getItem("@brita-stablecoin:accountData");

  const [moneyInAccount, setMoneyInAccount] = useState<number>(() => {
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const moneyStored = dataParsed.money;
      return moneyStored;
    }

    return 100000;
  });

  const [britasInAccount, setBritasInAccount] = useState<number>(() => {
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const britasStored = dataParsed.britas;
      return britasStored;
    }

    return 0;
  });

  const [bitcoinsInAccount, setBitcoinsInAccount] = useState<number>(() => {
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const bitcoinsStored = dataParsed.bitcoins;
      return bitcoinsStored;
    }

    return 0;
  });

  const [transactions, setTransactions] = useState<string[]>(() => {
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const transactionsStored = dataParsed.transactions;
      return transactionsStored;
    }

    return 100000;
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
