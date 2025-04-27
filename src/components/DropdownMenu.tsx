"use client";
import "@/css/DropdownMenu.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCurrencyStore from "@/stores/useCurrencyStore";

export default function DropdownMenu({
  selectedCurrency,
  onSelect,
  excludeCurrency,
}: {
  selectedCurrency: any;
  onSelect: (currency: any) => void;
  excludeCurrency: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // zustand states
  const currencies = useCurrencyStore((state) => state.currencies);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const fetchCurrencies = useCurrencyStore((state) => state.fetchCurrencies);

  useEffect(() => {
    if (currencies.length === 0) {
      fetchCurrencies();
    }
  }, [currencies]);

  // closing the dropdown menu if a click happens outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="dropdown-loading">
        <img
          src="https://cdn.pixabay.com/animation/2023/11/09/03/05/03-05-45-320_512.gif"
          alt="countries-loading-gif"
        />
      </div>
    );
  }

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <motion.div
        className="select"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.97 }}
      >
        <img
          height={25}
          src={
            selectedCurrency.flag
              ? selectedCurrency.flag
              : `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Euro_symbol.svg/500px-Euro_symbol.svg.png`
          }
          alt={selectedCurrency?.country + " flag"}
        />
        {selectedCurrency?.code}
        <motion.span
          className="arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currencies
              .filter((currency) => currency.code !== excludeCurrency?.code)
              .map((currency) => (
                <motion.li
                  key={currency.code}
                  className="dropdown-item"
                  onClick={() => {
                    onSelect(currency);
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    height={25}
                    width={28}
                    //   force coding the european flag since it doesnt exist in the json file we are fetching
                    src={
                      currency.flag
                        ? currency.flag
                        : `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Euro_symbol.svg/500px-Euro_symbol.svg.png`
                    }
                    alt={currency.country + " flag"}
                  />
                  {currency.code}
                </motion.li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
