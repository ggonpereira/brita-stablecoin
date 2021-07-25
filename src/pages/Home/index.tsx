import React from "react";
import { Link } from "react-router-dom";

import useGetPrices from "../../hooks/useGetPrices";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import icon from "../../assets/images/icon.png";
import bitcoin from "../../assets/images/bitcoin.png";

import "./styles.scss";

const Home: React.FC = (): JSX.Element => {
  const { britaPrice, bitcoinPrice, loading } = useGetPrices();
  return (
    <div id="home-page">
      <div className="hero">
        <Header />
        <Container>
          <main>
            <h1>Stablecoin rápida, descentralizada e segura.</h1>
            <h3>
              Brita é uma stablecoin lastrada ao dólar americano com uma
              blockchain revolucionaria
            </h3>

            <Link to="/trade">
              Compre agora mesmo <i className="fas fa-arrow-right"></i>
            </Link>
          </main>
          <article>
            <Link to="/brita" className="brita">
              <div className="content">
                <div className="top">
                  <p>Destaque</p>
                  <h2>
                    Brita <small>(BRI)</small>
                  </h2>
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
            <Link to="/bitcoin" className="bitcoin">
              <div className="content">
                <div className="top">
                  <p>Destaque</p>
                  <h2>
                    Bitcoin <small>(BTC)</small>
                  </h2>
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
        </Container>
      </div>
    </div>
  );
};

export default Home;
