import { ConstHandle } from "./../../node_modules/@emnapi/runtime/dist/emnapi.iife.d";
import { create } from "zustand";

interface Currency {
  code: string;
  country: string;
  flag: string;
}

interface FromToStore {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  setFromCurrency: (currency: Currency) => void;
  setToCurrency: (currency: Currency) => void;
}

const useFromToStore = create<FromToStore>((set) => ({
  // simulating setting the initial value to be the user's location
  fromCurrency: {
    code: "EGP",
    country: "Egypt",
    flag: "https://flagcdn.com/w40/eg.png",
  },
  toCurrency: {
    code: "USD",
    country: "United States",
    flag: "https://flagcdn.com/w40/us.png",
  },
  setFromCurrency: (currency) => set({ fromCurrency: currency }),
  setToCurrency: (currency) => set({ toCurrency: currency }),
}));

export default useFromToStore;
