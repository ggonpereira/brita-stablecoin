// Price Context Interfaces
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
