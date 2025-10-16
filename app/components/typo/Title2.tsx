import React from "react";

interface Title2Props {
  children: React.ReactNode;
  className?: string;
}

const Title2 = ({ children, className = "" }: Title2Props) => {
  return (
    <h2 className={`font-bold text-[22px] leading-[1.09] ${className}`}>
      {children}
    </h2>
  );
};

export default Title2;
