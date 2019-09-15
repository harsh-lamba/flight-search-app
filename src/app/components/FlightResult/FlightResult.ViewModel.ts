import { IFlight } from "../../models";
import ServiceFactory from "../../services/ServiceFactory";
import {
  ISearchFlightService,
  ISearchCriteria
} from "../../services/SearchFlight.service";
import Event, { IEvent } from "../../core/Event";

export interface IFlightResultViewModel {
  isFetching: boolean;
  emptyResult: string | boolean;
  breadcrumb: string;
  departureDate: string;
  returnDate: string;
  resultItems: IFlightResultItem[];
  updateView: IEvent;
  bookFlight(): void;
  dispose(): void;
}

export interface IFlightResultItem {
  price: number;
  oneWayFlight: IFlight;
  returnFlight: IFlight;
}

export default class FlightResultViewModel implements IFlightResultViewModel {
  private _searchFlightService: ISearchFlightService;
  private _isFetching: boolean;
  private _breadcrumb: string;
  private _returnDate: string;
  private _departureDate: string;
  private _resultItems: IFlightResultItem[] = [];

  constructor() {
    this.updateView = new Event();
    this._searchFlightService = ServiceFactory.getSearchFlightInstance();
    this._searchFlightService.searchStarted.subscribe(
      this.searchStarted.bind(this)
    );
    this._searchFlightService.searchCompleted.subscribe(
      this.searchCompleted.bind(this)
    );
  }

  public readonly updateView: Event;

  public get isFetching(): boolean {
    return this._isFetching;
  }

  public get emptyResult(): string | boolean {
    return !this._resultItems.length && !this.isFetching
      ? "No data to display"
      : false;
  }

  public get breadcrumb(): string {
    return this._breadcrumb;
  }

  public get departureDate(): string {
    return this._departureDate;
  }

  public get returnDate(): string {
    return this._returnDate;
  }

  public get resultItems(): IFlightResultItem[] {
    return this._resultItems;
  }

  public bookFlight() {
    //Log
  }

  private searchStarted() {
    this._isFetching = true;
    this._resultItems = [];
    this.updateView.raise();
  }

  private searchCompleted() {
    this._isFetching = false;
    const searchCriteria = this._searchFlightService.searchCriteria;
    const hasReturnFlight = !searchCriteria.returnDate;
    const onewayBreadCrumb = `${searchCriteria.originCity} > ${searchCriteria.destinationCity}`;

    this._breadcrumb = hasReturnFlight
      ? `${onewayBreadCrumb} > ${searchCriteria.originCity}`
      : `${onewayBreadCrumb}`;
    this._departureDate = searchCriteria.departureDate;
    this._returnDate = searchCriteria.returnDate;

    this.buildResultItems(this._searchFlightService.flights, searchCriteria);

    this.updateView.raise();
  }

  private buildResultItems(
    flights: IFlight[],
    searchCriteria: ISearchCriteria
  ): void {
    const hasReturnFlight = !!searchCriteria.returnDate;
    this._resultItems = [];

    const onewayFlights = flights.filter(
      flight => flight.originCity === searchCriteria.originCity
    );
    let returnFlights: IFlight[] = [];
    let counter = onewayFlights.length;

    if (hasReturnFlight) {
      returnFlights = flights.filter(
        flight => flight.originCity === searchCriteria.destinationCity
      );

      counter =
        onewayFlights.length > returnFlights.length
          ? counter
          : returnFlights.length;
    }

    for (let i = 0; i < counter; i++) {
      const onewayFlight = onewayFlights[i] ? onewayFlights[i] : null;
      const returnFlight =
        hasReturnFlight && returnFlights[i] ? returnFlights[i] : null;

      if (hasReturnFlight && returnFlight && onewayFlight) {
        this._resultItems.push(<IFlightResultItem>{
          oneWayFlight: onewayFlight,
          returnFlight: returnFlight,
          price: onewayFlight.farePerPerson + returnFlight.farePerPerson
        });
      } else if (onewayFlight) {
        this._resultItems.push(<IFlightResultItem>{
          oneWayFlight: onewayFlight,
          returnFlight: null,
          price: onewayFlight.farePerPerson
        });
      }
    }
  }

  public dispose() {
    this._searchFlightService.searchStarted.unSubscribe(
      this.searchStarted.bind(this)
    );
    this._searchFlightService.searchCompleted.unSubscribe(
      this.searchCompleted.bind(this)
    );
  }
}
