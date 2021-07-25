import React, { FC, ReactNode } from "react";

import "./styles.scss";

type IButtonProps = {
  children: ReactNode;
  disabled: boolean;
};

const FormButton: FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="form-button" type="submit" {...rest}>
      {children}
    </button>
  );
};

export default FormButton;
