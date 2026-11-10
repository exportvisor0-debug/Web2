import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  showLabel = false,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center gap-2 p-2 rounded-lg transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? "bg-[#1C1612] text-[#F5D275] border border-[#C89D43]/40 hover:border-[#F5D275] shadow-[0_0_12px_rgba(200,157,67,0.25)] hover:shadow-[0_0_18px_rgba(245,210,117,0.4)]"
          : "bg-white text-stone-700 border border-stone-200 hover:border-[#C89D43]/60 shadow-2xs hover:shadow-xs hover:text-[#7A5A17]"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#F5D275] transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-[#7A5A17] transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold whitespace-nowrap">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};
