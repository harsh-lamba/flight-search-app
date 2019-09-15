import * as React from "react";

import FlightResultViewModel, {
  IFlightResultViewModel
} from "./FlightResult.ViewModel";

export interface IFlightResultProps {}

export interface IFlightResultState {
  model: IFlightResultViewModel;
}

export default class FlightResult extends React.Component<
  IFlightResultProps,
  IFlightResultState
> {
  constructor(props: IFlightResultProps) {
    super(props);

    this.state = {
      model: new FlightResultViewModel()
    };

    this.state.model.updateView.subscribe(this.updateView.bind(this));
  }

  public render() {
    console.log("in");
    return (
      <div className="flight-result">
        {this.state.model.emptyResult && (
          <h1 className="flight-result__no-data">No data to display</h1>
        )}
        {!this.state.model.emptyResult && (
          <React.Fragment>
            <div className="flight-result__header">
              <h3 className="flight-result__breadcrumb">
                {this.state.model.breadcrumb}
              </h3>
              <div className="flight-result__date">
                <label>Depart: {this.state.model.departureDate}</label>
                <label>Return: {this.state.model.returnDate}</label>
              </div>
            </div>
            {this.state.model.resultItems.map(item => {
              return (
                <div className="flight-result__item margin-bottom-1x">
                  <div className="flight-result__item-info">
                    <h4 className="flight-result__item-price">
                      Rs. {item.price}
                    </h4>
                    <div className="flight-result__item-flights">
                      <div className="flight-result__item-oneway">
                        <h5 className="flight-result__flightName">
                          {item.oneWayFlight.id}
                        </h5>
                        <h4 className="flight-result__item-breadcrumb">
                          {item.oneWayFlight.originCity}>
                          {item.oneWayFlight.destinationCity}
                        </h4>
                        <h4>Depart: {item.oneWayFlight.departureTime}</h4>
                        <h4>Arrive: {item.oneWayFlight.arrivalTime}</h4>
                      </div>
                      <div className="flight-result__item-return">
                        <h5 className="flight-result__flightName">
                          {item.oneWayFlight.id}
                        </h5>
                        <h4 className="flight-result__item-breadcrumb">
                          {item.oneWayFlight.originCity}>
                          {item.oneWayFlight.destinationCity}
                        </h4>
                        <h4>Depart: {item.oneWayFlight.departureTime}</h4>
                        <h4>Arrive: {item.oneWayFlight.arrivalTime}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="flight-result__action-container"></div>
                </div>
              );
            })}
          </React.Fragment>
        )}
      </div>
    );
  }

  private updateView() {
    console.log("in");
    this.setState(state => {
      return { model: state.model };
    });
  }

  public componentWillUnmount() {
    this.state.model.updateView.unSubscribe(this.updateView.bind(this));
    this.state.model.dispose();
  }
}
