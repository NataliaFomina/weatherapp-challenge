import axios from "axios";
import { Coordinates, UnitType } from "../lib/model";
import { HourlyForecast, DailyForecast } from "./types";

class API {
  public static API_URL = "https://api.openweathermap.org";
  public static URL = "http://openweathermap.org";
  private appID: string;

  constructor(appID: string) {
    this.appID = appID;
  }

  async getDailyForecast(coord: Coordinates, unit: UnitType) {
    const response = await axios.get<DailyForecast>(`${API.API_URL}/data/2.5/onecall`, {
      params: {
        lat: coord.latitude,
        lon: coord.longitude,
        appId: this.appID,
        units: unit,
        exclude: "minutely,hourly,alerts",
      },
    });
    return response.data;
  }

  async getHourlyForecast(coord: Coordinates, unit: UnitType) {
    const response = await axios.get<HourlyForecast>(`${API.API_URL}/data/2.5/forecast`, {
      params: {
        lat: coord.latitude,
        lon: coord.longitude,
        appId: this.appID,
        units: unit,
      },
    });
    return response.data;
  }

  static getIconURL(id: string): string {
    return `${API.URL}/img/w/${id}.png`;
  }
}

export type { DailyForecast, HourlyForecast };
export { API };
