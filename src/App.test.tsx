import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "./test-utils";
import App from "./App";
import dailyForecastJson from "./store/__test__/data/api/dailyForecast.json";
import hourlyForecastJson from "./store/__test__/data/api/hourlyForecast.json";
import { API } from "./api";

export const handlers = [
  rest.get(`${API.API_URL}/data/2.5/onecall`, (req, res, ctx) => {
    return res(ctx.json(dailyForecastJson), ctx.delay(150));
  }),
  rest.get(`${API.API_URL}/data/2.5/forecast`, (req, res, ctx) => {
    return res(ctx.json(hourlyForecastJson), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
}));

it("renders forecast cards correctly", async () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success, error) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 50.1074,
            longitude: 8.6648,
          },
        })
      )
    ),
  };
  //@ts-ignore
  global.navigator.geolocation = mockGeolocation;
  render(<App />);
  await waitFor(() => {
    expect(screen.getAllByText(/3°c/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/fog/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/monday, oct 25, 2021/i)[0]).toBeInTheDocument();

    expect(screen.getAllByText(/13°c/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/light rain/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/tuesday, oct 26, 2021/i)[0]).toBeInTheDocument();

    expect(screen.getAllByText(/13°c/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/broken clouds/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/wednesday, oct 27, 2021/i)[0]).toBeInTheDocument();

    expect(screen.getAllByText(/12°c/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/broken clouds/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/thursday, oct 28, 2021/i)[0]).toBeInTheDocument();

    expect(screen.getAllByText(/11°c/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/light rain/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/friday, oct 29, 2021/i)[0]).toBeInTheDocument();
  });
});
