import React, { FC, InputHTMLAttributes } from "react";

import "./styles.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label: string;
  stateListener: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
