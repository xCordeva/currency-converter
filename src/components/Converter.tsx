"use client";
import "@/css/Converter.css";
import DropdownMenu from "./DropdownMenu";
import { useState, useEffect } from "react";

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);

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
    </div>
  );
}
