import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = "",
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
        isDark
          ? "bg-[#181310] text-[#E5BE58] border-[#C89D43]/50 hover:bg-[#251D17] hover:border-[#D6AC4B] shadow-[0_0_12px_rgba(200,157,67,0.2)]"
          : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50 hover:text-stone-900"
      } ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#E5BE58] animate-spin-slow" />
      ) : (
        <Moon className="w-4 h-4 text-stone-600" />
      )}
      {showLabel && (
        <span className="text-[11px] font-medium tracking-wide">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};
