import { useEffect } from "react";
import useRatesHistoryStore from "@/stores/useRatesHistoryStore";
import useFromToStore from "@/stores/useFromToStore";

const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_HOST_API_KEY;

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const useExchangeRates = () => {
  const fromCurrency = useFromToStore((state) => state.fromCurrency);
  const toCurrency = useFromToStore((state) => state.toCurrency);
  const amount = useFromToStore((state) => state.amount);
  const setRatesHistory = useRatesHistoryStore(
    (state) => state.setRatesHistory
  );
  const setExchangeRate = useFromToStore((state) => state.setExchangeRate);
  const setConvertedAmount = useFromToStore(
    (state) => state.setConvertedAmount
  );
  const setHistoryLoading = useRatesHistoryStore(
    (state) => state.setHistoryLoading
  );
  const setIsLoading = useFromToStore((state) => state.setIsLoading);
  const setErrorMessage = useFromToStore((state) => state.setErrorMessage);

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 7);

  const todayFormatted = formatDate(today);
  const startFormatted = formatDate(startDate);

  // fetching the last 7 days exchange rates, and using todays rate as the exchange rate to calculate conversions
  const fetchExchangeRates = async () => {
    setHistoryLoading(true);
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://api.exchangerate.host/timeframe?access_key=${apiKey}&start_date=${startFormatted}&end_date=${todayFormatted}&source=${fromCurrency.code}&currencies=${toCurrency.code}&format=1`
      );
      const data = await res.json();
      // using the currency pair to get the rate since its returned as an object with currency pair as the key
      const currencyPair = `${fromCurrency.code}${toCurrency.code}`;
      const todayRate = data.quotes[todayFormatted]?.[currencyPair];

      if (data.success === true) {
        setRatesHistory(data.quotes);
        setExchangeRate(todayRate);
        setConvertedAmount(todayRate * amount);
        setHistoryLoading(false);
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch exchange rates history");
      }
    } catch (error) {
      console.error("Error fetching exchange rates history:", error);
      setErrorMessage(error);
      setHistoryLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [amount, fromCurrency, toCurrency]);

  return { fetchExchangeRates };
};
