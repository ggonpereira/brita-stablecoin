import React, { useState } from "react";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import { ITransactionProps } from "../../interfaces";

import "./styles.scss";

const Profile: React.FC = (): JSX.Element => {
  const [noOfElements, setNoOfElements] = useState(14);

  const storedData = localStorage.getItem("@brita-stablecoin:accountData");
  let parsedData;
  if (storedData) parsedData = JSON.parse(storedData);

  const loadedTransactions = parsedData.transactions.slice(0, noOfElements);

  return (
    <div id="profile-page">
      <Header />
      <Container>
        <main>
          <h1>Seu perfil</h1>
          <h3>Aqui você confere todas as transações efetuadas em sua conta!</h3>

          {parsedData.transactions && parsedData.transactions.length !== 0 ? (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID Transação</th>
                      <th>Bitcoins comprados</th>
                      <th>Bitcoins vendidos</th>
                      <th>Britas compradas</th>
                      <th>Britas vendidas</th>
                      <th>Dinheiro na conta</th>
                      <th>Dinheiro transacionado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData &&
                      loadedTransactions.map(
                        (transaction: ITransactionProps, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{transaction.bitcoinsBought}</td>
                              <td>{transaction.bitcoinsSold}</td>
                              <td>{transaction.britasBought}</td>
                              <td>{transaction.britasSold}</td>
                              <td>
                                R$ {transaction.moneyInAccount?.toFixed(2)}
                              </td>
                              <td>
                                R$ {transaction.moneyInTransaction?.toFixed(2)}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
              <button onClick={() => setNoOfElements(noOfElements + 14)}>
                Carregar mais
              </button>
            </>
          ) : (
            <h2>Você não efetuou nenhuma transação até o momento 🙁</h2>
          )}
        </main>
      </Container>
    </div>
  );
};

export default Profile;
