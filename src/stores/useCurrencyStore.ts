import { create } from "zustand";

interface Currency {
  code: string;
  country: string;
  flag: string;
}

interface CurrencyStore {
  currencies: Currency[];
  isLoading: boolean;
  setCurrencies: (currencies: Currency[]) => void;
  setIsLoading: (loading: boolean) => void;
  fetchCurrencies: () => Promise<void>;
}

const useCurrencyStore = create<CurrencyStore>((set) => ({
  currencies: [],
  isLoading: true,
  setCurrencies: (currencies) => set({ currencies }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  fetchCurrencies: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/ibrahimhajjaj/a0e39e7330aebf0feb49912f1bf9062f/raw/d160e7d3b0e11ea3912e97a1b3b25b359746c86a/currencies-with-flags.json"
      );
      const data: Currency[] = await res.json();
      // console.log(data);
      set({ currencies: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching currencies:", error);
      set({ isLoading: false });
    }
  },
}));

export default useCurrencyStore;
