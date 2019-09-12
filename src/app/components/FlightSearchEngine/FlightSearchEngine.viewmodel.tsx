import { IFlight } from "../../models";

export interface IFlightSearchEngineViewModel {
  title: string;
  departureDate: string;
  returnDate: string;
  results: IFlightResultItem[];
}

export interface IFlightResultItem {
  price: number;
  departingFlight: IFlight;
  returnFlight: IFlight;
}
