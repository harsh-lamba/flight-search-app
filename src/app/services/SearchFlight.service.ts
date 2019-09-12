import { flightsJson } from "../../mock/mock";

import CustomEvent, { ICustomEvent } from "../core/CustomEvent";
import { IFlight, FlightModel } from "../models";

export interface ISearchCriteria {
  originCity: string;
  destinationCity: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

export interface ISearchFlight {
  fetchFlight(searchCriteria: ISearchCriteria): Promise<IFlight[]>;
  readyState: ICustomEvent;
  flights: IFlight[];
}

export default class SearchFlightService implements ISearchFlight {
  private _readyState: CustomEvent;
  private _isReady: boolean;
  private _flights: IFlight[];

  constructor() {
    this._readyState = new CustomEvent();
    this._isReady = true;
    this._flights = [];
  }

  public readonly readyState: ICustomEvent;

  public get isReady(): boolean {
    return this._isReady;
  }

  public get flights(): IFlight[] {
    return this._flights;
  }

  public fetchFlight(searchCriteria: ISearchCriteria): Promise<IFlight[]> {
    return new Promise((resolve, reject) => {
      this._isReady = false;
      //Async operation
      const flights = flightsJson.map(flight => new FlightModel(flight));
      this._flights = this.getSearchedFlights(flights, searchCriteria);
      this._isReady = true;
      this._readyState.raise(null, this);

      resolve();
    });
  }

  private getSearchedFlights(
    flights: IFlight[],
    searchCriteria: ISearchCriteria
  ): IFlight[] {
    return flights.filter(flight => {
      return (
        (this.isDepartureFlightMatch || this.isReturnFlightMatch) &&
        flight.availableSeats <= searchCriteria.passengers
      );
    });
  }

  private isDepartureFlightMatch(
    searchCriteria: ISearchCriteria,
    flight: IFlight
  ): boolean {
    return (
      searchCriteria.departureDate &&
      flight.departureDate === searchCriteria.departureDate &&
      flight.originCity === searchCriteria.originCity &&
      flight.destinationCity === searchCriteria.destinationCity
    );
  }

  private isReturnFlightMatch(
    searchCriteria: ISearchCriteria,
    flight: IFlight
  ): boolean {
    return (
      searchCriteria.returnDate &&
      flight.departureDate === searchCriteria.returnDate &&
      flight.originCity === searchCriteria.destinationCity &&
      flight.destinationCity === searchCriteria.originCity
    );
  }
}
