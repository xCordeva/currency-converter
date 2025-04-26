"use client";
import "@/css/Converter.css";
import DropdownMenu from "./DropdownMenu";
import { useState, useEffect } from "react";

type Currency = {
  code: string;
  country: string;
  flag: string;
};

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [amount, setAmount] = useState(1);

  // simulating setting the default value to be the user's location
  useEffect(() => {
    setFromCurrency({
      code: "EGP",
      country: "Egypt",
      flag: "https://flagcdn.com/w40/eg.png",
    });
    setToCurrency({
      code: "USD",
      country: "United States",
      flag: "https://flagcdn.com/w40/us.png",
    });
  }, []);

  const handleConvert = () => {
    console.log(amount);
    console.log(fromCurrency.code);
    console.log(toCurrency.code);
  };

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
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <button className="convert-button" onClick={handleConvert}>
        Convert
      </button>
    </div>
  );
}
