import Event, { IEvent } from "./Event";

export interface IField<T> {
  title: string;
  value: T;
  possibleValues: T[];
  valueChanged: IEvent;
}

export default class Field<T> implements IField<T> {
  private _value: T;
  private _possibleValues: T[];
  private _valueChanged: Event;
  constructor(title: string, initialValue: T) {
    this.title = title;
    this._value = initialValue;
    this._possibleValues = [];
    this._valueChanged = new Event();
  }

  public readonly title: string;

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
    this._valueChanged.raise(null, this);
  }

  public get possibleValues(): T[] {
    return this._possibleValues;
  }

  public set possibleValues(data: T[]) {
    this._possibleValues = data.map(item => item);
  }

  public get valueChanged(): IEvent {
    return this._valueChanged;
  }
}
