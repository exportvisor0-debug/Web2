import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "dark",
  size = "md",
}) => {
  const heightClass =
    size === "sm" ? "h-7" : size === "lg" ? "h-11 sm:h-12" : "h-9 sm:h-10";

  const isLight = variant === "light";
  const logoSrc = isLight ? "/assets/branding/logo-white.png" : "/Logo3_4.png";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="ExportVisor - Go Global With ExportVisor"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-102`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/Logo3_4.png";
        }}
      />
    </div>
  );
};

