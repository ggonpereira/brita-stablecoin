import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

import "./styles.scss";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Brita Stablecoin" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/register">Registrar</Link>
          </li>
          <li>
            <Link to="/trade">Fazer trade</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
