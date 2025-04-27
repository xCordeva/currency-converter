"use client";
import "@/css/Displayer.css";
import useFromToStore from "@/stores/useFromToStore";

export default function Displayer() {
  const fromCurrency = useFromToStore((state) => state.fromCurrency);
  const toCurrency = useFromToStore((state) => state.toCurrency);
  const amount = useFromToStore((state) => state.amount);
  const convertedAmount = useFromToStore((state) => state.convertedAmount);
  const exchangeRate = useFromToStore((state) => state.exchangeRate);
  const isLoading = useFromToStore((state) => state.isLoading);
  const errorMessage = useFromToStore((state) => state.errorMessage);

  if (isLoading) {
    return (
      <div className="displayer-loading">
        <img
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
          alt="loading-gif"
        />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="displayer-error">
        <h2>
          Error making the conversion, please wait a few seconds and try again.
        </h2>
      </div>
    );
  }

  return (
    <div className="displayer">
      <div className="user-amount">
        <h1>
          {amount} {fromCurrency.code} to {toCurrency.code} equals
        </h1>
      </div>
      <h1 className="converted-amount">{convertedAmount.toFixed(2)}</h1>
      <p className="exchange-rate">
        1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
      </p>
    </div>
  );
}
