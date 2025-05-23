import "@/css/Navbar.css";
import ThemeToggler from "./ThemeToggler";

const Navbar: React.FC = () => {
  return (
    <nav>
      <h1 className="logo">Currency Converter</h1>
      <ThemeToggler />
    </nav>
  );
};

export default Navbar;
