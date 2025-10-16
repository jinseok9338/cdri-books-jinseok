import React from "react";

interface Body1Props {
  children: React.ReactNode;
  className?: string;
}

const Body1 = ({ children, className = "" }: Body1Props) => {
  return (
    <p className={`font-medium text-xl leading-none ${className}`}>
      {children}
    </p>
  );
};

export default Body1;
