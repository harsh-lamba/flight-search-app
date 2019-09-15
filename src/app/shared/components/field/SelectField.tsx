import * as React from "react";

export interface ISelectFieldProps<T> {
  id: string;
  value: T;
  className?: string;
  placeholder?: string;
  onChange(): void;
  possibleValues: T[];
}

export const SelectField: React.FC<ISelectFieldProps<string>> = props => {
  return (
    <select
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
    >
      <option value="">{props.placeholder}</option>
      {props.possibleValues.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
