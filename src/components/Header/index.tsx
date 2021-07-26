import React from "react";
import logo from "../../assets/images/logo.png";
import { Link, useHistory } from "react-router-dom";
// import AccountDataProvider from "../../contexts/AccountData";

import signOut from "../../assets/images/sign-out.svg";
import { auth } from "../../services/firebase";
import MoneyInAccount from "../CoinInAccount";

import "./styles.scss";

export default function Header() {
  const history = useHistory();
  const authenticated = auth.currentUser;

  const Logout = () => {
    auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((error) => console.log(error));
  };

  return (
    // <AccountDataProvider>
    <header>
      <Link to="/">
        <img src={logo} alt="Brita Stablecoin" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          {!authenticated && (
            <>
              <li>
                <Link to="/register">Registrar</Link>
              </li>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
            </>
          )}
          {authenticated && (
            <>
              <li>
                <Link to="/trade">Fazer trade</Link>
              </li>
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <MoneyInAccount />
              </li>
              <li>
                <button onClick={() => Logout()}>
                  Sair
                  <img src={signOut} alt="" />
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
    // </AccountDataProvider>
  );
}
