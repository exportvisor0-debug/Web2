import React from "react";

interface SectionShareButtonProps {
  path?: string;
  sectionName?: string;
  variant?: "badge" | "icon" | "minimal";
  className?: string;
}

export const SectionShareButton: React.FC<SectionShareButtonProps> = () => {
  // Share section has been removed per user specification
  return null;
};

