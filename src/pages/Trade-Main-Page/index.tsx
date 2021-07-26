import React from "react";
import { Link } from "react-router-dom";

import useGetPrices from "../../hooks/useGetPrices";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import icon from "../../assets/images/icon.png";
import bitcoin from "../../assets/images/bitcoin.png";

import "../Home/styles.scss";
import "./styles.scss";
import Button from "../../components/Button";

const TradeMainPage: React.FC = (): JSX.Element => {
  const { britaPrice, bitcoinPrice, loading } = useGetPrices();
  return (
    <div id="trade-main-page">
      <div className="hero">
        <Header />
        <Container>
          <main>
            <h1>Conheça o nosso trade de criptomoedas.</h1>
            <h3>
              Possuímos as menores taxas do mercado e contamos com altíssima
              <br />
              liquidez para uma maior velocidade nas trocas
            </h3>
          </main>
          <article>
            <Link to="/brl-brita" className="brita">
              <div className="content">
                <div className="top">
                  <p>Comprar</p>
                  <h2>
                    Brita <small>(BRI)</small>
                  </h2>
                  <p>
                    com <strong>BRL</strong>
                  </p>
                </div>
                <div className="bottom">
                  <p>
                    <strong>R$ </strong>
                    <span>{!loading ? britaPrice : "Carregando..."}</span>
                  </p>
                </div>
              </div>
              <img src={icon} alt="Criptomoeda Brita" />
            </Link>
            <Link to="/brl-bitcoin" className="bitcoin">
              <div className="content">
                <div className="top">
                  <p>Comprar</p>
                  <h2>
                    Bitcoin <small>(BTC)</small>
                  </h2>
                  <p>
                    com <strong>BRL</strong>
                  </p>
                </div>
                <div className="bottom">
                  <p>
                    <strong>R$ </strong>
                    <span>{!loading ? bitcoinPrice : "Carregando..."}</span>
                  </p>
                </div>
              </div>
              <img src={bitcoin} alt="Criptomoeda Bitcoin" />
            </Link>
          </article>
          <div className="trade">
            <Button toUrl="/bitcoin-brita">Troca entre as moedas</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TradeMainPage;
