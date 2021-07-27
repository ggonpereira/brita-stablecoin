import { InputHTMLAttributes, ReactNode } from "react";
import { RouteProps } from "react-router-dom";

export interface IBritaApiResponse {
  "@odata.context": string;
  value: [
    {
      cotacaoCompra: string;
      cotacaoVenda: string;
      dataHoraCotacao: string;
    },
    {
      cotacaoCompra?: string;
      cotacaoVenda?: string;
      dataHoraCotacao?: string;
    }
  ];
}

export interface IBitcoinApiResponse {
  ticker: {
    high: string;
    low: string;
    vol: string;
    last: string;
    buy: string;
    sell: string;
    open: string;
    date: number;
  };
}

export interface IPrices {
  britaPrice: string;
  bitcoinPrice: string;
  loading: boolean;
}

export interface IAuthRouteProps {
  children: ReactNode;
}

export interface IButtonProps {
  toUrl: string;
  children: ReactNode;
}

export interface IBuyBrlCardProps {
  coinName: string;
  price: string;
  moneyInTransaction: number;
  loading: boolean;
  setMoneyInTransaction: any;
  setBritasBought?: any;
  setBitcoinsBought?: any;
  handleChangeMoneyInAccount: any;
}

export interface IBuyCoinCardProps {
  coinName: string;
  loading: boolean;
  bitcoinPrice: string;
  britaPrice: string;
  setBritasBought?: any;
  setBritasSold?: any;
  setBitcoinsBought?: any;
  setBitcoinsSold?: any;
  handleChangeBitcoinsInAccount?: any;
  handleChangeBritasInAccount?: any;
}

export interface IContainerProps {
  children: ReactNode;
}

export interface IErrorTextProps {
  children: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label: string;
  stateListener: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export interface ISellBrlCardProps {
  coinName: string;
  price: string;
  moneyInTransaction: number;
  loading: boolean;
  setMoneyInTransaction: any;
  setBritasSold?: any;
  setBitcoinsSold?: any;
  handleChangeMoneyInAccount: any;
}

export interface IAccountData {
  money: number;
  transactions: string[];
  britas: number;
  bitcoins: number;
  setMoneyInAccount: any;
  setTransactions: any;
  setBritasInAccount: any;
  setBitcoinsInAccount: any;
}

export interface IAccountDataProviderProps {
  children: ReactNode;
}

export interface ITransactionProps {
  bitcoinsBought: number | null;
  bitcoinsSold: number | null;
  britasBought: string | number | null;
  britasSold: string | number | null;
  moneyInAccount: number | null;
  moneyInTransaction: number | null;
}

export interface ICustomRoutesProps extends RouteProps {
  isPrivate?: boolean;
}
