"use client";
import "@/css/Converter.css";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import useFromToStore from "@/stores/useFromTo";

export default function Converter() {
  // zustand states
  const fromCurrency = useFromToStore((state) => state.fromCurrency);
  const setFromCurrency = useFromToStore((state) => state.setFromCurrency);
  const toCurrency = useFromToStore((state) => state.toCurrency);
  const setToCurrency = useFromToStore((state) => state.setToCurrency);
  const [amount, setAmount] = useState(1);

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
