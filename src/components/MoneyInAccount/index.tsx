import React, { FC, useContext } from "react";

import { AccountDataContext } from "../../contexts/AccountData";

import "./styles.scss";

const MoneyInAccount: FC = () => {
  const { money } = useContext(AccountDataContext);

  return (
    <div className="moneyInAccount">
      <strong>R$ </strong>
      {money.toFixed(2)}
    </div>
  );
};

export default MoneyInAccount;
