import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API, DailyForecast } from "../api";
import { HourlyForecast } from "../api/types";
import { Forecast } from "../lib/model";

export interface ForecastsState {
  items: Forecast[];
}

export function createInitialState(): ForecastsState {
  return {
    items: [],
  };
}

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

const initialState = createInitialState();

const slice = createSlice({
  name: "forecasts",
  initialState,
  reducers: {
    dailyForecastUpdated: (state, action: PayloadAction<DailyForecast>) => {
      const toUpper = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      const forecasts: Forecast[] = [];
      const current = action.payload.current;
      forecasts.push({
        temp: Math.round(current.temp),
        date: new Date(current.dt * 1000).toISOString(),
        iconURL: API.getIconURL(current.weather[0].icon),
        description: toUpper(current.weather[0].description),
        segments: [],
      });
      for (let dailyItem of action.payload.daily) {
        const date = new Date(dailyItem.dt * 1000);
        if (isSameDay(new Date(), date)) {
          continue;
        }
        forecasts.push({
          temp: Math.round((dailyItem.temp.min + dailyItem.temp.max) / 2),
          date: date.toISOString(),
          iconURL: API.getIconURL(dailyItem.weather[0].icon),
          description: toUpper(dailyItem.weather[0].description),
          segments: [],
        });
      }
      state.items = forecasts.slice(0, 5);
    },
    hourlyForecastUpdated: (state, action: PayloadAction<HourlyForecast>) => {
      for (let stateItem of state.items) {
        for (let apiItem of action.payload.list) {
          if (isSameDay(new Date(stateItem.date), new Date(apiItem.dt * 1000))) {
            stateItem.segments.push({
              temp: Math.round(apiItem.main.temp),
              date: new Date(apiItem.dt * 1000).toISOString(),
            });
          }
        }
      }
    },
  },
});

export const { dailyForecastUpdated, hourlyForecastUpdated } = slice.actions;
export default slice.reducer;
