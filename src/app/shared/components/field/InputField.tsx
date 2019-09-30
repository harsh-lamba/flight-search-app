import * as React from "react";

export interface IInputProps {
  id: string;
  type: string;
  value: string;
  placeholder?: string;
  title?: string;
  className?: string;
  onChange(): void;
}

export const InputField: React.FC<IInputProps> = props => {
  return (
    <div className="form-group">
      <label className="form-group__label">{props.title}</label>
      <input {...props} />;
    </div>
  );
};
