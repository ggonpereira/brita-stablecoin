import { useEffect, useState } from "react";

import axios from "axios";

import { IBritaApiResponse, IBitcoinApiResponse } from "../interfaces";

function formatDate(dateValue: number) {
  if (dateValue < 10) return `0${dateValue}`;
  return String(dateValue);
}

function generateDate(date: Date) {
  const day = formatDate(date.getDate());
  const month = formatDate(date.getMonth() + 1);
  const year = date.getFullYear();
  const dateToday = `'${month}-${day}-${year}'`;
  return dateToday;
}

async function fetchBritaPrice(url: string) {
  let { data } = await axios.get<IBritaApiResponse>(url);

  if (data.value[1]) return data.value[1].cotacaoCompra;
  else return data.value[0].cotacaoCompra;
}

export default function useGetPrices() {
  const [britaPrice, setBritaPrice] = useState<string>("");
  const [bitcoinPrice, setBitcoinPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Creating a URL that gets a period of dates: from yesterday to today. If today hasn't any price yet, then will assume yesterday's price
  const dateToday = generateDate(new Date());
  const yesterdayDate = generateDate(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );
  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial=${yesterdayDate}&@dataFinalCotacao=${dateToday}`;

  // Fetching the price of USD/BRL to define Brita Price
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cotacaoCompra = await fetchBritaPrice(url);
      const price = Number(cotacaoCompra).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      setBritaPrice(price);
      return setLoading(false);
    };

    fetchData();
  }, [url]);

  // Fetching the price of Bitcoin
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<IBitcoinApiResponse>(
        "https://www.mercadobitcoin.net/api/BTC/ticker/"
      );

      const cotacaoCompra = await data.ticker.buy;
      const price = Number(cotacaoCompra).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      setBitcoinPrice(price);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { britaPrice, bitcoinPrice, loading };
}
