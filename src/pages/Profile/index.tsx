import React from "react";

// import useGetPrices from "../../hooks/useGetPrices";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import "./styles.scss";

interface ITransactionProps {
  bitcoinsBought: number | null;
  bitcoinsSold: number | null;
  britasBought: string | number | null;
  britasSold: string | number | null;
  moneyInAccount: number | null;
  moneyInTransaction: number | null;
}

const Profile: React.FC = (): JSX.Element => {
  const storedData = localStorage.getItem("@brita-stablecoin:accountData");
  let parsedData;
  if (storedData) parsedData = JSON.parse(storedData);

  return (
    <div id="profile-page">
      <Header />
      <Container>
        <main>
          <h1>Seu perfil.</h1>

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
                  parsedData.transactions.map(
                    (transaction: ITransactionProps, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{transaction.bitcoinsBought}</td>
                          <td>{transaction.bitcoinsSold}</td>
                          <td>{transaction.britasBought}</td>
                          <td>{transaction.britasSold}</td>
                          <td>{transaction.moneyInAccount?.toFixed(2)}</td>
                          <td>{transaction.moneyInTransaction?.toFixed(2)}</td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Profile;
