const useSaveLocalStorage = () => {
  const saveBritas = (britasNum: number) => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, britas: Number(britasNum) };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  };

  const saveBitcoins = (bitcoinsNum: number) => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, bitcoins: Number(bitcoinsNum) };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  };

  const saveMoney = (moneyNum: number) => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, money: Number(moneyNum) };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  };

  const saveTransactions = (transactions: string[]) => {
    const dataStored = localStorage.getItem("@brita-stablecoin:accountData");
    if (dataStored) {
      const dataParsed = JSON.parse(dataStored);
      const newArray = { ...dataParsed, transactions };
      localStorage.setItem(
        "@brita-stablecoin:accountData",
        JSON.stringify(newArray)
      );
    }
  };

  return { saveBritas, saveBitcoins, saveMoney, saveTransactions };
};

export default useSaveLocalStorage;
