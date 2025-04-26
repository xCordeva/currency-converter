"use client";
import "@/css/Converter.css";
import DropdownMenu from "./DropdownMenu";
import { useEffect, useState } from "react";
import useFromToStore from "@/stores/useFromTo";

const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_HOST_API_KEY;

export default function Converter() {
  // zustand states
  const fromCurrency = useFromToStore((state) => state.fromCurrency);
  const setFromCurrency = useFromToStore((state) => state.setFromCurrency);
  const toCurrency = useFromToStore((state) => state.toCurrency);
  const setToCurrency = useFromToStore((state) => state.setToCurrency);
  const amount = useFromToStore((state) => state.amount);
  const setAmount = useFromToStore((state) => state.setAmount);
  const setConvertedAmount = useFromToStore(
    (state) => state.setConvertedAmount
  );
  const setExchangeRate = useFromToStore((state) => state.setExchangeRate);

  const setIsLoading = useFromToStore((state) => state.setIsLoading);

  const [inputAmount, setInputAmount] = useState<number>(amount || 0);

  const fetchCurrencyConversion = async () => {
    setIsLoading(true);
    const url = `https://api.exchangerate.host/convert?from=${fromCurrency.code}&to=${toCurrency.code}&amount=${amount}&access_key=${apiKey}&format=1`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }

      const data = await response.json();

      setConvertedAmount(data.result);
      setExchangeRate(data.info.quote);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching currency conversion:", error);

      return null;
    }
  };

  const handleConvert = () => {
    // preventing updating the amount on the displayer on every input change
    setAmount(inputAmount);
  };

  useEffect(() => {
    if (amount === 0) return;
    fetchCurrencyConversion();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="converter-container">
      <div className="currencies">
        {" "}
        <div className="menu-label-container">
          <label htmlFor="from">From</label>
          <DropdownMenu
            selectedCurrency={fromCurrency}
            onSelect={setFromCurrency}
          />
        </div>
        <div className="menu-label-container">
          <label htmlFor="to">To</label>
          <DropdownMenu
            selectedCurrency={toCurrency}
            onSelect={setToCurrency}
          />
        </div>
      </div>

      <div className="input-container">
        <label htmlFor="amount">Enter Amount to Convert </label>
        <input
          type="number"
          id="amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(Number(e.target.value))}
        />
      </div>

      <button className="convert-button" onClick={handleConvert}>
        Convert
      </button>
    </div>
  );
}
