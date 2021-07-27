import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

import "../Header/styles.scss";
import Modal from "../Modal";

export default function HeaderNotLoggedIn() {
  const [visible, setVisible] = useState<boolean>(false);

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
            <Link to="/login">Entrar</Link>
          </li>
        </ul>
      </nav>
      <Modal visible={visible} setVisible={setVisible} />
    </header>
  );
}
