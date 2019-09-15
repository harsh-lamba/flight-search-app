import * as React from "react";

import { Header } from "./shared/Components/Header";
import FlightSearchEngine from "./components/FlightSearchEngine/FlightSearchEngine";

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
