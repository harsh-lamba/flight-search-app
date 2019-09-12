import { getTimeIn12HourFormat } from "../shared/helper/DateHelper";

export interface IFlightContract {
  id: string;
  originCity: string;
  destinationCity: string;
  departureTimeStamp: number;
  arrivalTimeStamp: number;
  farePerPerson: number;
  availableSeats: number;
}

export interface IFlight {
  id: string;
  farePerPerson: number;
  originCity: string;
  destinationCity: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  availableSeats: number;
}

export class FlightModel implements IFlight {
  private _departureTimeStamp: number;
  private _arrivalTimeStamp: number;

  constructor(data: IFlightContract) {
    this.id = data.id;
    this.farePerPerson = data.farePerPerson;
    this.originCity = data.originCity;
    this.destinationCity = data.destinationCity;
    this.availableSeats = data.availableSeats;
    this._departureTimeStamp = data.departureTimeStamp;
    this._arrivalTimeStamp = data.arrivalTimeStamp;
  }

  public readonly id: string;
  public readonly farePerPerson: number;
  public readonly originCity: string;
  public readonly destinationCity: string;
  public readonly availableSeats: number;

  public get departureDate(): string {
    return null;
  }

  public get departureTime(): string {
    return getTimeIn12HourFormat(this._departureTimeStamp);
  }

  public get arrivalDate(): string {
    return null;
  }

  public get arrivalTime(): string {
    return getTimeIn12HourFormat(this._arrivalTimeStamp);
  }
}
