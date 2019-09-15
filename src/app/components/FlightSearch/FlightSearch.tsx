import * as React from "react";
import FlightSearchViewModel, {
  IFlightSearchViewModel
} from "./FlightSearch.ViewModel";
import { states } from "../../../mock/mock";

export interface IFlightSearchProps {}

export default class FlightSearch extends React.Component<IFlightSearchProps> {
  private _model: IFlightSearchViewModel;
  constructor(props: IFlightSearchProps) {
    super(props);

    this.state = {
      model: new FlightSearchViewModel()
    };
  }
}
