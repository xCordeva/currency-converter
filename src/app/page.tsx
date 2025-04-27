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
      <Chart />
    </main>
  );
}
