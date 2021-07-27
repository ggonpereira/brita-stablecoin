import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useGetPrices from "../../hooks/useGetPrices";

import { AccountDataContext } from "../../contexts/AccountData";
import useSaveLocalStorage from "../../hooks/useSaveLocalStorage";

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

  const { saveBritas, saveBitcoins, saveTransactions } = useSaveLocalStorage();

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

  function handleChangeBitcoinsInAccount(buying: boolean) {
    if (buying) {
      if (bitcoins < bitcoinsSold) {
        return toast.error(
          "Você não possui Bitcoins suficientes para comprar essa quantia de Britas"
        );
      } else {
        setBitcoinsInAccount(bitcoins - bitcoinsSold);
        setBritasInAccount(Number(britas) + Number(britasBought));
        toast.success("Transação efetuada com sucesso");
      }
    } else {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui Britas suficientes para comprar essa quantia de Bitcoin"
        );
      } else {
        setBitcoinsInAccount(bitcoins + bitcoinsBought);
        setBritasInAccount(Number(britas) - Number(britasSold));
        toast.success("Transação efetuada com sucesso");
      }
    }

    handleAddTransaction();
  }

  function handleChangeBritasInAccount(buying: boolean) {
    if (buying) {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui Britas suficientes para comprar essa quantia de Bitcoin"
        );
      } else {
        setBritasInAccount(britas - britasSold);
        setBitcoinsInAccount(Number(bitcoins) + Number(bitcoinsBought));
        toast.success("Transação efetuada com sucesso");
      }
    } else {
      if (britas < britasSold) {
        return toast.error(
          "Você não possui Bitcoins suficientes para comprar essa quantia de Britas"
        );
      } else {
        setBritasInAccount(britas + britasBought);
        setBitcoinsInAccount(Number(bitcoins) - Number(bitcoinsSold));
        toast.success("Transação efetuada com sucesso");
      }
    }

    handleAddTransaction();
  }

  useEffect(() => {
    saveBritas(britas);
  }, [saveBritas, britas]);

  useEffect(() => {
    saveBitcoins(bitcoins);
  }, [saveBitcoins, bitcoins]);

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
            <h1>Faça a troca entre criptomoedas facilmente!</h1>
            <h3>
              Aproveite nossa facilidade de trocas e taxas mínimas para comprar
              ou vender as criptomoedas desejadas!
              <br />
              Aqui você pode trocar suas Britas por Bitcoins ou o contrário,
              troque como quiser! 😀
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
