import { create } from "zustand";

interface ConversionState {
  ratesHistory: any;
  historyLoading: boolean;
  setRatesHistory: (rates: any) => void;
  setHistoryLoading: (state: boolean) => void;
}

const useRatesHistoryStore = create<ConversionState>((set) => ({
  ratesHistory: null,
  historyLoading: true,
  setRatesHistory: (rates) => set({ ratesHistory: rates }),
  setHistoryLoading: (state) => set({ historyLoading: state }),
}));

export default useRatesHistoryStore;
