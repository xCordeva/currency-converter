import { create } from "zustand";

interface Currency {
  code: string;
  country: string;
  flag: string;
}

interface FromToStore {
  fromCurrency: Currency | null;
  toCurrency: Currency | null;
  amount: number;
  convertedAmount: number;
  exchangeRate: number;
  isLoading: boolean;
  setFromCurrency: (currency: Currency) => void;
  setToCurrency: (currency: Currency) => void;
  setAmount: (amount: number) => void;
  setConvertedAmount: (convertedAmount: number) => void;
  setExchangeRate: (exchangeRate: number) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useFromToStore = create<FromToStore>((set) => ({
  // simulating setting the initial value to be the user's location
  fromCurrency: {
    code: "USD",
    country: "United States",
    flag: "https://flagcdn.com/w40/us.png",
  },
  toCurrency: {
    code: "EGP",
    country: "Egypt",
    flag: "https://flagcdn.com/w40/eg.png",
  },
  amount: 1,
  convertedAmount: 0.0,
  exchangeRate: 0.0,
  isLoading: true,
  setFromCurrency: (currency: Currency) => set({ fromCurrency: currency }),
  setToCurrency: (currency: Currency) => set({ toCurrency: currency }),
  setAmount: (amount: number) => set({ amount }),
  setConvertedAmount: (convertedAmount: number) => set({ convertedAmount }),
  setExchangeRate: (exchangeRate: number) => set({ exchangeRate }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export default useFromToStore;
