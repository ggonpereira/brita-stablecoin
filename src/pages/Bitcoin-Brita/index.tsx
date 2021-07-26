import React, { useContext, useEffect, useState } from "react";

import useGetPrices from "../../hooks/useGetPrices";

import { AccountDataContext } from "../../contexts/AccountData";

import BuyCoinCard from "../../components/BuyCoinCard/index";
import SellBrlCard from "../../components/SellBrlCard";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import "../Brl-Brita/styles.scss";
import MoneyInAccount from "../../components/MoneyInAccount";

const BitcoinBrita: React.FC = (): JSX.Element => {
  const { britaPrice, bitcoinPrice, loading } = useGetPrices();

  const [moneyInTransaction, setMoneyInTransaction] = useState<number>(0);
  const [bitcoinsBought, setBitcoinsBought] = useState<number>(0);
  const [bitcoinsSold, setBitcoinsSold] = useState<number>(0);
  const [britasBought, setBritasBought] = useState<number>(0);
  const [britasSold, setBritasSold] = useState<number>(0);

  const {
    transactions,
    setTransactions,
    bitcoins,
    setBitcoinsInAccount,
    britas,
    setBritasInAccount,
  } = useContext(AccountDataContext);

  function handleAddTransaction() {
    const newTransaction = {
      moneyInAccount: null,
      moneyInTransaction: null,
      britasBought: Number(britasBought),
      britasSold: Number(britasSold),
      bitcoinsBought: Number(bitcoinsBought),
      bitcoinsSold: Number(bitcoinsSold),
    };

    setTransactions((oldTransactions: object[]) => [
      ...oldTransactions,
      newTransaction,
    ]);
  }
  function handleChangeCoinsInAccount(buying: boolean, bitcoin: boolean) {
    if (buying) {
      if (bitcoin) {
        if (britas < britasSold) {
          return alert(
            "Você não possui saldo suficiente para fazer essa transação"
          );
        } else {
          setBritasInAccount(britas - britasSold);
          setBitcoinsInAccount(bitcoins + bitcoinsBought);
        }
      } else {
        console.log("oi");
        if (bitcoins < bitcoinsSold) {
          return alert(
            "Você não possui saldo suficiente para fazer essa transação"
          );
        } else {
          setBitcoinsInAccount(bitcoins - bitcoinsSold);
          setBritasInAccount(britas + britasBought);
        }
      }
    } else {
      if (bitcoin) {
        if (bitcoins < bitcoinsSold) {
          return alert(
            "Você não possui saldo suficiente para fazer essa transação"
          );
        } else {
          setBritasInAccount(britas + britasBought);
          setBitcoinsInAccount(bitcoins - bitcoinsSold);
        }
      } else {
        if (britas < britasSold) {
          return alert(
            "Você não possui saldo suficiente para fazer essa transação"
          );
        } else {
          setBitcoinsInAccount(bitcoins + bitcoinsBought);
          setBritasInAccount(britas - britasSold);
        }
      }
    }

    handleAddTransaction();
  }

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
      const newArray = { ...dataParsed, britas: Number(britas) };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  }, [britas]);

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
              <BuyCoinCard
                coinName="Brita"
                price={britaPrice}
                loading={loading}
                setBritasBought={setBritasBought}
                setBritasSold={setBritasSold}
                setBitcoinsBought={setBitcoinsBought}
                setBitcoinsSold={setBitcoinsSold}
                handleChangeCoinsInAccount={handleChangeCoinsInAccount}
              />
            </section>
          </main>
        </Container>
      </div>
    </div>
  );
};

export default BitcoinBrita;
