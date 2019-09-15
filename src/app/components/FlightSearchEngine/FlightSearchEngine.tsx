import * as React from "react";

import FlightSearch from "../flightSearch/FlightSearch";

export default class FlightSearchEngine extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="grid-container">
        <div className="grid-1-of-3">
          <FlightSearch />
        </div>
        <div className="grid-2-of-3">Result View</div>
      </div>
    );
  }
}
