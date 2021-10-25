import reducer, { createInitialState, hourlyForecastUpdated, dailyForecastUpdated } from "../forecasts";
import dailyForecastJson from "./data/api/dailyForecast.json";
import hourlyForecastJson from "./data/api/hourlyForecast.json";
import expectedState from "./data/state/hourlyForecastUpdated.json";

it("creates segments array correctly", () => {
  const previousState = reducer(createInitialState(), dailyForecastUpdated(dailyForecastJson));
  expect(reducer(previousState, hourlyForecastUpdated(hourlyForecastJson))).toEqual(expectedState);
});
