import * as React from "react";

import { Header } from "./shared/components/header/Header";
import FlightSearchEngine from "./components/flightSearchEngine/FlightSearchEngine";

export default class App extends React.Component<{}> {
  public render() {
    return (
      <div className="container">
        <Header />
        <FlightSearchEngine />
      </div>
    );
  }
}
