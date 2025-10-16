import React from "react";

interface Body2BoldProps {
  children: React.ReactNode;
  className?: string;
}

const Body2Bold = ({ children, className = "" }: Body2BoldProps) => {
  return (
    <p className={`font-bold text-sm leading-none ${className}`}>{children}</p>
  );
};

export default Body2Bold;
