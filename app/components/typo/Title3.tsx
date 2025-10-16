import React from "react";

interface Title3Props {
  children: React.ReactNode;
  className?: string;
}

const Title3 = ({ children, className = "" }: Title3Props) => {
  return (
    <h3 className={`font-bold text-lg leading-none ${className}`}>
      {children}
    </h3>
  );
};

export default Title3;
