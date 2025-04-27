import Chart from "@/components/Chart";
import Converter from "@/components/Converter";
import Displayer from "@/components/Displayer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Displayer />
      <Converter />
      <div className="chart">
        <h1 className="chart-title">
          Exchange rate history for the last 7 days.
        </h1>
        <Chart />
      </div>
    </main>
  );
}
