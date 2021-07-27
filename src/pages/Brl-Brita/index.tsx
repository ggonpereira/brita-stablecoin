import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useGetPrices from "../../hooks/useGetPrices";

import { AccountDataContext } from "../../contexts/AccountData";

import BuyBrlCard from "../../components/BuyBrlCard/index";
import SellBrlCard from "../../components/SellBrlCard";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import "./styles.scss";

const BrlBrita: React.FC = (): JSX.Element => {
  const { britaPrice, loading } = useGetPrices();

  const [moneyInTransaction, setMoneyInTransaction] = useState<number>(0);
  const [britasBought, setBritasBought] = useState<number>(0);
  const [britasSold, setBritasSold] = useState<number>(0);

  const {
    money,
    setMoneyInAccount,
    transactions,
    setTransactions,
    britas,
    setBritasInAccount,
  } = useContext(AccountDataContext);

  function handleAddTransaction() {
    const newTransaction = {
      moneyInAccount: money,
      moneyInTransaction,
      britasBought: Number(britasBought),
      britasSold: Number(britasSold),
      bitcoinsBought: null,
      bitcoinsSold: null,
    };

    setTransactions((oldTransactions: object[]) => [
      ...oldTransactions,
      newTransaction,
    ]);
  }

  function handleChangeMoneyInAccount(buying: boolean) {
    if (britasSold <= 0 || britasBought <= 0)
      return toast.error("Por favor, preencha um número maior que zero");

    if (buying) {
      if (money < moneyInTransaction) {
        return toast.error(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setMoneyInAccount(money - moneyInTransaction);
        toast.success("Transação efetuada com sucesso");
      }
    } else {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui saldo suficiente para fazer essa transação"
        );
      } else {
        setMoneyInAccount(money + moneyInTransaction);
        toast.success("Transação efetuada com sucesso");
      }
    }

    handleAddTransaction();
    handleChangeBritasInAccount(buying);
  }

  function handleChangeBritasInAccount(buying: boolean) {
    if (buying) {
      setBritasInAccount(Number(britas) + Number(britasBought));
    } else {
      setBritasInAccount(Number(britas) - Number(britasSold));
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
              <BuyBrlCard
                coinName="Brita"
                price={britaPrice}
                loading={loading}
                moneyInTransaction={moneyInTransaction}
                setMoneyInTransaction={setMoneyInTransaction}
                setBritasBought={setBritasBought}
                handleChangeMoneyInAccount={handleChangeMoneyInAccount}
              />
              <SellBrlCard
                coinName="Brita"
                price={britaPrice}
                loading={loading}
                moneyInTransaction={moneyInTransaction}
                setMoneyInTransaction={setMoneyInTransaction}
                setBritasSold={setBritasSold}
                handleChangeMoneyInAccount={handleChangeMoneyInAccount}
              />
            </section>
          </main>
        </Container>
      </div>
    </div>
  );
};

export default BrlBrita;
