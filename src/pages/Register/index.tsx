import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../services/firebase";

import ErrorText from "../../components/ErrorText";
import FormButton from "../../components/FormButton";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Input from "../../components/Input";

import "./styles.scss";

const Register: React.FC = (): JSX.Element => {
  const [registering, setRegistering] = useState<boolean>(false);
  // const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const signUpWithEmailAndPassword = async () => {
    if (password !== confirmPw) setError("As senhas não se coincidem.");
    if (!error) setError("");

    setRegistering(true);

    try {
      const authenticate = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(authenticate);
      history.push("/login");
    } catch (error) {
      console.log(error);
      if (error.code.includes("auth/weak-password")) {
        setError("Por favor, utilize uma senha mais segura.");
      } else if (error.code.includes("auth/email-already-in-use")) {
        setError("O e-mail preenchido já está em uso.");
      } else {
        setError(
          "Não foi possível se registrar. Por favor tente novamente mais tarde."
        );
      }

      setRegistering(false);
    }
  };

  const handleFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    signUpWithEmailAndPassword();
  };

  return (
    <div id="register-page">
      <Header />
      <Container>
        <main>
          <h1>Faça já seu cadastro e aproveite o melhor do mundo cripto!</h1>
          <p className="subtitle">
            Seu cadastro é fácil, rápido e seguro. Todos os seus dados ficam
            guardados em segurança em nossos servidores e nunca iremos
            compartilhá-los com terceiros, fique tranquilo(a). :)
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
              <Input
                name="confirmPw"
                type="password"
                label="Confirme sua senha"
                stateListener={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPw(event.target.value)
                }
                required
                autoComplete="new-password"
              />
              <FormButton disabled={registering}>Enviar</FormButton>
            </div>

            <footer>
              <p>
                Já possui uma conta? <Link to="/login">Faça login</Link>
              </p>
              <ErrorText>{error}</ErrorText>
            </footer>
          </form>
        </main>
      </Container>
    </div>
  );
};

export default Register;
