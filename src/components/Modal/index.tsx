import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";

import signOut from "../../assets/images/sign-out.svg";
import logo from "../../assets/images/logo.png";
import hamburger from "../../assets/images/hamburger.svg";
import { auth } from "../../services/firebase";
import MoneyInAccount from "../CoinInAccount";

interface IModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Modal: FC<IModalProps> = ({ visible, setVisible }) => {
  const history = useHistory();
  const authenticated = auth.currentUser;

  const Logout = () => {
    auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button onClick={() => setVisible(!visible)} id="myBtn">
        <img src={hamburger} alt="" />
      </button>
      <div
        id="myModal"
        className="modal"
        style={{ display: visible ? "block" : "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={() => setVisible(!visible)}>
            &times;
          </span>

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
                  <div className="buttons">
                    <li>
                      <MoneyInAccount />
                    </li>
                    <li>
                      <button onClick={() => Logout()}>
                        Sair
                        <img src={signOut} alt="" />
                      </button>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Modal;
