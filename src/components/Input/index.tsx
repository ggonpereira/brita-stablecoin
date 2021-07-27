import React, { FC } from "react";

import { InputProps } from "../../interfaces";

import "./styles.scss";

const Input: FC<InputProps> = ({
  name,
  type,
  label,
  stateListener,
  ...rest
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={stateListener}
        {...rest}
      />
    </div>
  );
};

export default Input;
