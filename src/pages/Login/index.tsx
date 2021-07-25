import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../services/firebase";

import ErrorText from "../../components/ErrorText";
import FormButton from "../../components/FormButton";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Input from "../../components/Input";

import "../Register/styles.scss";

const Login: React.FC = (): JSX.Element => {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const signInWithEmailAndPassword = async () => {
    if (!error) setError("");

    setLoggingIn(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/profile");
    } catch (error) {
      console.log(error);
      if (error.code.includes("auth/user-not-found")) {
        setError("O usuário não foi encontrado.");
      } else {
        setError("Usuário ou senha inválida.");
      }
      setLoggingIn(false);
    }
  };

  const handleFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    signInWithEmailAndPassword();
  };

  return (
    <div id="login-page">
      <Header />
      <Container>
        <main>
          <h1>
            Faça seu login em nossa plataforma e comece a trocar criptos hoje
            mesmo!
          </h1>
          <p className="subtitle">
            Assim que você fizer seu login você já estará apto à fazer trade em
            nossa plataforma. Disponibilizamos sempre os melhores preços e
            segurança para você. E o melhor, não precisa de nenhum tipo de
            confirmação! :)
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="main-form">
              <Input
                name="email"
                type="email"
                label="Digite seu e-mail"
                stateListener={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                required
              />
              <Input
                name="password"
                type="password"
                label="Digite sua senha"
                stateListener={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                required
                autoComplete="new-password"
              />
              <FormButton disabled={loggingIn}>Entrar</FormButton>

              <ErrorText>{error}</ErrorText>
            </div>

            <footer>
              <p>
                Não possui uma conta?{" "}
                <Link to="/register">Faça seu cadastro</Link>
              </p>
            </footer>
          </form>
        </main>
      </Container>
    </div>
  );
};

export default Login;
