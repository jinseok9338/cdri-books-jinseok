import React from "react";

interface SmallProps {
  children: React.ReactNode;
  className?: string;
}

const Small = ({ children, className = "" }: SmallProps) => {
  return (
    <span className={`font-medium text-[10px] leading-none ${className}`}>
      {children}
    </span>
  );
};

export default Small;
