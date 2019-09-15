import * as React from "react";

export interface IInputProps {
  type: string;
  value: string;
  placeholder: string;
  onChange(): void;
}

export const InputField: React.FC<IInputProps> = props => {
  return <input {...props} />;
};
