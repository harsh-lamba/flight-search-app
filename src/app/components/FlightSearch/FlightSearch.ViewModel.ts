import Field, { IField } from "../../core/Field";
import ServiceFactory from "../../services/ServiceFactory";
import {
  ISearchFlightService,
  ISearchCriteria
} from "../../services/SearchFlight.service";

export interface IFlightSearchViewModel {
  isFlightFetching: boolean;
  isFormValid: boolean;
  originCity: IField<string>;
  destinationCity: IField<string>;
  departureDate: IField<string>;
  returnDate: IField<string>;
  passengers: IField<string>;
  searchFlights(): void;
  dispose(): void;
}

export default class FlightSearchViewModel implements IFlightSearchViewModel {
  private _isFlightFetching: boolean;
  private _originCity: IField<string>;
  private _destinationCity: IField<string>;
  private _departureDate: IField<string>;
  private _returnDate: IField<string>;
  private _passengers: IField<string>;
  private _searchFlightService: ISearchFlightService;
  constructor() {
    this._isFlightFetching = false;
    this._originCity = new Field("Enter Origin City", "PNQ");
    this._destinationCity = new Field("Enter Destination City", "DEL");
    this._departureDate = new Field("Departure Date", "16th Sep 2019");
    this._returnDate = new Field("Return Date", "16th Sep 2019");
    this._passengers = new Field("Passengers", "1");

    this.fillDepartureDate();
    this.fillReturnDate();
    this.fillPassengers();

    this._searchFlightService = ServiceFactory.getSearchFlightInstance();
  }

  public get isFlightFetching(): boolean {
    return this._isFlightFetching;
  }

  public get isFormValid(): boolean {
    return (
      this._originCity.value &&
      this._destinationCity.value &&
      this._departureDate.value &&
      this._returnDate.value &&
      this._passengers.value !== "0"
    );
  }

  public get originCity(): IField<string> {
    return this._originCity;
  }

  public get destinationCity(): IField<string> {
    return this._destinationCity;
  }

  public get departureDate(): IField<string> {
    return this._departureDate;
  }

  public get returnDate(): IField<string> {
    return this._returnDate;
  }

  public get passengers(): IField<string> {
    return this._passengers;
  }

  public searchFlights(): void {
    this._isFlightFetching = true;
    this._searchFlightService
      .fetchFlight(<ISearchCriteria>{
        originCity: this._originCity.value,
        destinationCity: this._destinationCity.value,
        departureDate: this._departureDate.value,
        returnDate: this._returnDate.value,
        passengers: +this.passengers.value
      })
      .then(() => {
        this._isFlightFetching = false;
      });
  }

  private fillDepartureDate() {
    this._departureDate.possibleValues = ["16th Sep 2019"];
  }

  private fillReturnDate() {
    this._returnDate.possibleValues = ["16th Sep 2019"];
  }

  private fillPassengers() {
    this._passengers.possibleValues = ["1", "2", "3", "4", "5"];
  }

  public dispose(): void {}
}
