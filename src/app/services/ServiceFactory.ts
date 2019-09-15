import SearchFlightService, {
  ISearchFlightService
} from "./SearchFlight.service";

export default class ServiceFactory {
  private static _searchFlightServiceInstance: ISearchFlightService;
  public static getSearchFlightInstance(): ISearchFlightService {
    if (!this._searchFlightServiceInstance)
      this._searchFlightServiceInstance = new SearchFlightService();

    return this._searchFlightServiceInstance;
  }
}
