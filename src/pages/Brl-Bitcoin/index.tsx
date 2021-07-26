import React, { useContext, useEffect, useState } from "react";

import useGetPrices from "../../hooks/useGetPrices";

import { AccountDataContext } from "../../contexts/AccountData";

import BuyBrlCard from "../../components/BuyBrlCard/index";
import SellBrlCard from "../../components/SellBrlCard";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import "../Brl-Brita/styles.scss";
import MoneyInAccount from "../../components/MoneyInAccount";

const BrlBitcoin: React.FC = (): JSX.Element => {
  const { bitcoinPrice, loading } = useGetPrices();

  const [moneyInTransaction, setMoneyInTransaction] = useState<number>(0);
  const [bitcoinsBought, setBitcoinsBought] = useState<number>(0);
  const [bitcoinsSold, setBitcoinsSold] = useState<number>(0);

  const {
    money,
    setMoneyInAccount,
    transactions,
    setTransactions,
    bitcoins,
    setBitcoinsInAccount,
  } = useContext(AccountDataContext);

  function handleAddTransaction() {
    const newTransaction = {
      moneyInAccount: money,
      moneyInTransaction,
      bitcoinsBought: Number(bitcoinsBought),
      bitcoinsSold: Number(bitcoinsSold),
      britasBought: null,
      britasSold: null,
    };

    setTransactions((oldTransactions: object[]) => [
      ...oldTransactions,
      newTransaction,
    ]);
  }

  function handleChangeMoneyInAccount(buying: boolean) {
    if (buying) {
      if (money < moneyInTransaction) {
        return alert(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setMoneyInAccount(money - moneyInTransaction);
      }
    } else {
      if (bitcoins < bitcoinsSold) {
        return alert(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setMoneyInAccount(money + moneyInTransaction);
      }
    }

    handleAddTransaction();
    handleChangeBitcoinsInAccount(buying);
  }

  function handleChangeBitcoinsInAccount(buying: boolean) {
    if (buying) {
      setBitcoinsInAccount(Number(bitcoins) + Number(bitcoinsBought));
    } else {
      setBitcoinsInAccount(Number(bitcoins) - Number(bitcoinsSold));
    }
  }

  useEffect(() => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, money: money };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  }, [money]);

  useEffect(() => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, bitcoins: Number(bitcoins) };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  }, [bitcoins]);

  useEffect(() => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, transactions };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  }, [transactions]);

  return (
    <div id="trade-page">
      <div className="hero">
        <Header />
        <Container>
          <main>
            <h1>Teste.</h1>

            <section>
              <BuyBrlCard
                coinName="Bitcoin"
                price={bitcoinPrice}
                loading={loading}
                moneyInTransaction={moneyInTransaction}
                setMoneyInTransaction={setMoneyInTransaction}
                setBitcoinsBought={setBitcoinsBought}
                handleChangeMoneyInAccount={handleChangeMoneyInAccount}
              />
              <SellBrlCard
                coinName="Bitcoin"
                price={bitcoinPrice}
                loading={loading}
                moneyInTransaction={moneyInTransaction}
                setMoneyInTransaction={setMoneyInTransaction}
                setBitcoinsSold={setBitcoinsSold}
                handleChangeMoneyInAccount={handleChangeMoneyInAccount}
              />
            </section>
          </main>
        </Container>
      </div>
    </div>
  );
};

export default BrlBitcoin;
