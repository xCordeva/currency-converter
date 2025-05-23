"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useExchangeRates } from "@/customHooks/useExchangeRates";
import useRatesHistoryStore from "@/stores/useRatesHistoryStore";
import useFromToStore from "@/stores/useFromToStore";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const Chart = () => {
  const ratesHistory = useRatesHistoryStore((state) => state.ratesHistory);
  const historyLoading = useRatesHistoryStore((state) => state.historyLoading);
  const fromCurrency = useFromToStore((state) => state.fromCurrency);
  const toCurrency = useFromToStore((state) => state.toCurrency);

  useExchangeRates();

  if (historyLoading) {
    return (
      <div className="chart-loading">
        Loading chart...
        <img
          src="https://cdn.pixabay.com/animation/2023/11/09/03/05/03-05-45-320_512.gif"
          alt="loading-gif"
          width={100}
        />
      </div>
    );
  }

  if (!ratesHistory || Object.keys(ratesHistory).length === 0) {
    return (
      <div className="chart-error">
        <h2>Can't find any data, please try to refresh the page.</h2>
      </div>
    );
  }

  const currencyPair = `${fromCurrency.code}${toCurrency.code}`;

  // Sort the dates and map the rates
  const dates = Object.keys(ratesHistory).sort();
  const rates = dates.map((date) => ratesHistory[date][currencyPair]);

  // Prepare chart data
  const data = {
    labels: dates,
    datasets: [
      {
        label: `${currencyPair} Exchange Rate`,
        data: rates,
        fill: false,
        backgroundColor: "$secondary-blue",
        borderColor: "#ff6b35",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Exchange Rate",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
