import React, { FC, useState } from "react";

import { InputProps } from "../../interfaces";

import "./styles.scss";

const Input: FC<InputProps> = ({
  name,
  type,
  label,
  stateListener,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      {type === "password" ? (
        <div className="passwordInput">
          <input
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            required
            onChange={stateListener}
            {...rest}
          />
          <small onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </small>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          required
          onChange={stateListener}
          {...rest}
        />
      )}
    </div>
  );
};

export default Input;
