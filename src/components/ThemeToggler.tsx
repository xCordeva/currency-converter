"use client";
import { useTheme } from "@/customHooks/useTheme";
import { SunIcon, MoonIcon } from "lucide-react";
import "../css/ThemeToggler.css";

const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switch">
      <span className="label">Light</span>
      <button className={`toggle-button ${theme}`} onClick={toggleTheme}>
        <div className="slider"></div>
        <div className="icons">
          <SunIcon size={16} className="sun-icon" />
          <MoonIcon size={16} className="moon-icon" />
        </div>
      </button>

      <span className="label">Dark</span>
    </div>
  );
};

export default ThemeToggler;
