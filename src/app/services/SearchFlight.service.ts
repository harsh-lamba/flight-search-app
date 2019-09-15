import { flightsJson } from "../../mock/mock";

import Event, { IEvent } from "../core/Event";
import { IFlight, FlightModel } from "../models";

export interface ISearchCriteria {
  originCity: string;
  destinationCity: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

export interface ISearchFlightService {
  serachStarted: IEvent;
  searchCompleted: IEvent;
  flights: IFlight[];
  searchCriteria: ISearchCriteria;
  fetchFlight(searchCriteria: ISearchCriteria): Promise<IFlight[]>;
}

export default class SearchFlightService implements ISearchFlightService {
  private _searchStarted: Event;
  private _searchCompleted: Event;
  private _flights: IFlight[];
  private _searchCriteria: ISearchCriteria;

  constructor() {
    this._searchStarted = new Event();
    this._searchCompleted = new Event();
    this._flights = [];
  }

  public readonly readyState: IEvent;
  public readonly serachStarted: IEvent;
  public readonly searchCompleted: IEvent;

  public get flights(): IFlight[] {
    return this._flights;
  }

  public get searchCriteria(): ISearchCriteria {
    return this._searchCriteria;
  }

  public fetchFlight(searchCriteria: ISearchCriteria): Promise<IFlight[]> {
    return new Promise((resolve, reject) => {
      this._searchCriteria = searchCriteria;
      this._searchStarted.raise(null, this);
      //Async operation-started
      const flights = flightsJson.map(flight => new FlightModel(flight));
      this._flights = this.getSearchedFlights(flights, searchCriteria);
      //Async operation-finished
      this._searchCompleted.raise(null, this);

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
