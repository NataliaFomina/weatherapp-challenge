import reducer, { createInitialState, dailyForecastUpdated } from "../forecasts";
import dailyForecastJson from "./data/api/dailyForecast.json";
import expectedState from "./data/state/dailyForecastUpdated.json";

it("creates forecasts entities correctly", () => {
  const previousState = createInitialState();
  expect(reducer(previousState, dailyForecastUpdated(dailyForecastJson))).toEqual(expectedState);
});
