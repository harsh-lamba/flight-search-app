import * as React from "react";
import FlightSearchViewModel, {
  IFlightSearchViewModel
} from "./FlightSearch.ViewModel";
import { InputField } from "../../shared/components/field/InputField";
import { SelectField } from "../../shared/components/field/SelectField";

export interface IFlightSearchProps {}

export interface IFlightSearchState {
  model: IFlightSearchViewModel;
}

export default class FlightSearch extends React.Component<
  IFlightSearchProps,
  IFlightSearchState
> {
  private _model: IFlightSearchViewModel;
  constructor(props: IFlightSearchProps) {
    super(props);

    this.state = {
      model: new FlightSearchViewModel()
    };
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <InputField
          id="originCity"
          type="text"
          className="form-control margin-top-1x margin-bottom-1x"
          placeholder="Enter Origin City - PNQ,DEL,MUB,BENG"
          value={this.state.model.originCity.value}
          onChange={this.onFieldChangeCallback.bind(this)}
          title='Please Use "PNQ,DEL,MUB,BENG,"'
        />
        <InputField
          id="destinationCity"
          type="text"
          className="form-control margin-bottom-1x"
          placeholder="Enter Destination City - PNQ,DEL,MUB,BENG"
          value={this.state.model.destinationCity.value}
          onChange={this.onFieldChangeCallback.bind(this)}
          title='Please Use "PNQ,DEL,MUB,BENG,"'
        />
        <SelectField
          id="departureDate"
          className="form-control margin-bottom-1x"
          placeholder="Departure date"
          value={this.state.model.departureDate.value}
          possibleValues={this.state.model.departureDate.possibleValues}
          onChange={this.onFieldChangeCallback.bind(this)}
        />
        <SelectField
          id="returnDate"
          className="form-control margin-bottom-1x"
          placeholder="Return date"
          value={this.state.model.returnDate.value}
          possibleValues={this.state.model.returnDate.possibleValues}
          onChange={this.onFieldChangeCallback.bind(this)}
        />
        <SelectField
          id="passengers"
          className="form-control margin-bottom-1x"
          placeholder="Passengers"
          value={this.state.model.passengers.value}
          possibleValues={this.state.model.passengers.possibleValues}
          onChange={this.onFieldChangeCallback.bind(this)}
        />
        <input
          type="button"
          value="Search"
          className={`form-button ${
            this.state.model.isFormValid ? "" : "form-button--disabled"
          }`}
          disabled={
            this.state.model.isFormValid || this.state.model.isFlightFetching
              ? false
              : true
          }
          onClick={this.onFormSubmit.bind(this)}
        />
      </React.Fragment>
    );
  }

  //TODO: No any
  private onFieldChangeCallback(event: any) {
    const value = event.target.value;
    const id = event.target.id;

    switch (id) {
      case "originCity":
      case "destinationCity":
      case "departureDate":
      case "returnDate":
      case "passengers":
        this.setModelState(id, value);
        break;
      default:
        break;
    }
  }

  private onFormSubmit(event: MouseEvent) {
    event.preventDefault();

    this.state.model.searchFlights();
  }

  private setModelState(id: string, value: string) {
    this.setState((state: IFlightSearchState) => {
      const model: any = state.model; //TODO: No any

      model[id].value = value;

      return {
        model: state.model
      };
    });
  }
}
