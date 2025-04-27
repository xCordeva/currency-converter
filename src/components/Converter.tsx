"use client";
import "@/css/Converter.css";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import useFromToStore from "@/stores/useFromToStore";
import { ArrowRightLeft } from "lucide-react";

export default function Converter() {
  const fromCurrency = useFromToStore((state) => state.fromCurrency);
  const setFromCurrency = useFromToStore((state) => state.setFromCurrency);
  const toCurrency = useFromToStore((state) => state.toCurrency);
  const setToCurrency = useFromToStore((state) => state.setToCurrency);
  const amount = useFromToStore((state) => state.amount);
  const setAmount = useFromToStore((state) => state.setAmount);

  const [inputAmount, setInputAmount] = useState<number>(amount || 0);

  const handleConvert = () => {
    // preventing updating the amount on the displayer on every input change
    setAmount(inputAmount);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter-container">
      <div className="currencies">
        <div className="menu-label-container">
          <label htmlFor="from">From</label>
          <DropdownMenu
            selectedCurrency={fromCurrency}
            onSelect={setFromCurrency}
            excludeCurrency={toCurrency}
          />
        </div>

        <ArrowRightLeft className="swap-button" onClick={handleSwap} />

        <div className="menu-label-container">
          <label htmlFor="to">To</label>
          <DropdownMenu
            selectedCurrency={toCurrency}
            onSelect={setToCurrency}
            excludeCurrency={fromCurrency}
          />
        </div>
      </div>

      <div className="input-container">
        <label htmlFor="amount">Enter Amount</label>
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
