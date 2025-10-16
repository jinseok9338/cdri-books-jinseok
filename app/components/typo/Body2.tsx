import React from "react";

interface Body2Props {
  children: React.ReactNode;
  className?: string;
}

const Body2 = ({ children, className = "" }: Body2Props) => {
  return (
    <p className={`font-medium text-sm leading-none ${className}`}>
      {children}
    </p>
  );
};

export default Body2;
