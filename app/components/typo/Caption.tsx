import React from "react";

interface CaptionProps {
  children: React.ReactNode;
  className?: string;
}

const Caption = ({ children, className = "" }: CaptionProps) => {
  return (
    <span className={`font-medium text-base leading-none ${className}`}>
      {children}
    </span>
  );
};

export default Caption;
