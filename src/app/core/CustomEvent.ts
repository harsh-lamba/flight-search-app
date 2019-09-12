import Logger from "./Logger";

export interface ICustomEvent {
  subscribe(observer: Function): void;
  unSubscribe(observer: Function): void;
}

export default class CustomEvent implements ICustomEvent {
  private _observers: Map<any, any>;
  constructor() {
    this._observers = new Map();
  }

  public subscribe(observer: Function): void {
    if (!observer || typeof observer !== "function")
      Logger.error("observer should be a function");

    this._observers.set(observer, observer);
  }

  public raise(data: any, context: any) {
    this._observers.forEach(observer => observer(data, context));
  }

  public unSubscribe(observer: Function) {
    this._observers.delete(observer);
  }
}
