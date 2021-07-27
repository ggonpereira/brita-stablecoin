import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useGetPrices from "../../hooks/useGetPrices";

import { AccountDataContext } from "../../contexts/AccountData";
import useSaveLocalStorage from "../../hooks/useSaveLocalStorage";

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

  const { saveBritas, saveMoney, saveTransactions } = useSaveLocalStorage();

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
    saveMoney(money);
  }, [saveMoney, money]);

  useEffect(() => {
    saveBritas(britas);
  }, [saveBritas, britas]);

  useEffect(() => {
    saveTransactions(transactions);
  }, [saveTransactions, transactions]);

  return (
    <div id="trade-page">
      <Toaster position="top-right" />
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
