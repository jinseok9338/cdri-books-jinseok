import React from "react";

interface Title1Props {
  children: React.ReactNode;
  className?: string;
}

const Title1 = ({ children, className = "" }: Title1Props) => {
  return (
    <h1 className={`font-bold text-24px leading-1em ${className}`}>
      {children}
    </h1>
  );
};

export default Title1;
