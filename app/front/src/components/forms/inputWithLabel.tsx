import React from "react";

type Props = {
  textLabel: string;
  inputName: string;
  children: React.ReactNode; 
};

export const InputWithLabel = ({ textLabel, inputName, children }: Props) => {
  return (
    <div className="input-with-label">
        <label htmlFor={inputName}>{textLabel}</label>
        {children}
    </div>
  );
};
