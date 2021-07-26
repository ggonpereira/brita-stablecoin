import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useGetPrices from "../../hooks/useGetPrices";

import { AccountDataContext } from "../../contexts/AccountData";

import BuyCoinCard from "../../components/BuyCoinCard/index";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import "../Brl-Brita/styles.scss";

const BitcoinBrita: React.FC = (): JSX.Element => {
  const { bitcoinPrice, britaPrice, loading } = useGetPrices();

  const [bitcoinsBought, setBitcoinsBought] = useState<number>(0);
  const [bitcoinsSold, setBitcoinsSold] = useState<number>(0);
  const [britasBought, setBritasBought] = useState<number>(0);
  const [britasSold, setBritasSold] = useState<number>(0);

  const {
    money,
    transactions,
    setTransactions,
    britas,
    setBritasInAccount,
    bitcoins,
    setBitcoinsInAccount,
  } = useContext(AccountDataContext);

  function handleAddTransaction() {
    const newTransaction = {
      moneyInAccount: money,
      moneyInTransaction: 0,
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

  console.log(britasBought, bitcoinsSold);

  function handleChangeBitcoinsInAccount(buying: boolean) {
    if (buying) {
      if (bitcoins < bitcoinsSold) {
        return toast.error(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setBitcoinsInAccount(bitcoins - bitcoinsSold);
        setBritasInAccount(Number(britas) + Number(britasBought));
      }
    } else {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setBitcoinsInAccount(bitcoins + bitcoinsBought);
        setBritasInAccount(Number(britas) - Number(britasSold));
      }
    }

    handleAddTransaction();
  }

  function handleChangeBritasInAccount(buying: boolean) {
    if (buying) {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setBritasInAccount(britas - britasSold);
        setBitcoinsInAccount(Number(bitcoins) + Number(bitcoinsBought));
      }
    } else {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setBritasInAccount(britas + britasBought);
        setBitcoinsInAccount(Number(bitcoins) - Number(bitcoinsSold));
      }
    }

    handleAddTransaction();
  }

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
      <Toaster />
      <div className="hero">
        <Header />
        <Container>
          <main>
            <h1>Compre Brita usando reais facilmente!</h1>
            <h3>
              Aproveite nossa facilidade de trocas e taxas mínimas para comprar
              ou vender as criptomoedas desejadas!
            </h3>

            <section>
              <BuyCoinCard
                coinName="Brita"
                loading={loading}
                britaPrice={britaPrice}
                bitcoinPrice={bitcoinPrice}
                setBritasBought={setBritasBought}
                setBritasSold={setBritasSold}
                setBitcoinsBought={setBitcoinsBought}
                setBitcoinsSold={setBitcoinsSold}
                handleChangeBitcoinsInAccount={handleChangeBitcoinsInAccount}
              />
              <BuyCoinCard
                coinName="Bitcoin"
                loading={loading}
                britaPrice={britaPrice}
                bitcoinPrice={bitcoinPrice}
                setBritasBought={setBritasBought}
                setBritasSold={setBritasSold}
                setBitcoinsBought={setBitcoinsBought}
                setBitcoinsSold={setBitcoinsSold}
                handleChangeBritasInAccount={handleChangeBritasInAccount}
              />
            </section>
          </main>
        </Container>
      </div>
    </div>
  );
};

export default BitcoinBrita;
