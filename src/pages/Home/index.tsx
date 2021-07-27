import React from "react";
import { Link } from "react-router-dom";

import useGetPrices from "../../hooks/useGetPrices";

import Header from "../../components/Header/index";
import HeaderNotLoggedIn from "../../components/HeaderNotLoggedIn/index";
import Container from "../../components/Container";

import icon from "../../assets/images/icon.png";
import bitcoin from "../../assets/images/bitcoin.png";

import "./styles.scss";
import Button from "../../components/Button";
import { auth } from "../../services/firebase";

const Home: React.FC = (): JSX.Element => {
  const { britaPrice, bitcoinPrice, loading } = useGetPrices();

  const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
  const dataParsed = dataStored && JSON.parse(dataStored);

  return (
    <div id="home-page">
      <div className="hero">
        {auth.currentUser && dataParsed ? <Header /> : <HeaderNotLoggedIn />}

        <Container>
          <main>
            <h1>Stablecoin rápida, descentralizada e segura.</h1>
            <h3>
              Brita é uma stablecoin lastrada ao dólar americano com uma
              blockchain revolucionária
            </h3>

            <Button toUrl="/brl-brita">Compre agora mesmo </Button>
          </main>
          <article>
            <Link to="/brl-brita" className="brita">
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
            <Link to="/brl-bitcoin" className="bitcoin">
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
