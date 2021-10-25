import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import styled from "styled-components";
import Forecasts from "./components/forecasts";
import { Coordinates } from "./lib/model";
import Spinner from "./components/spinner";
import UnitSwitcher from "./components/unit-switcher";
import { WEATHER_API_APP_ID } from "./lib/config";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { API } from "./api";
import { hourlyForecastUpdated, dailyForecastUpdated } from "./store/forecasts";
import "./App.css";
import { progressUpdated } from "./store/ui";
import Barchart from "./components/barchart";

const UIContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  justify-items: center;
  padding: 20px;
`;

const SpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [coord, setCoord] = useState<Coordinates>();
  const [error, setError] = useState<string>();
  const unitType = useAppSelector((state) => state.ui.unitType);
  const dispatch = useAppDispatch();

  const loadData = useCallback(() => {
    if (coord) {
      dispatch(progressUpdated(true));
      new API(WEATHER_API_APP_ID)
        .getDailyForecast(coord, unitType)
        .then((data) => {
          dispatch(dailyForecastUpdated(data));
          dispatch(progressUpdated(true));
          new API(WEATHER_API_APP_ID)
            .getHourlyForecast(coord, unitType)
            .then((data) => {
              dispatch(hourlyForecastUpdated(data));
            })
            .finally(() => {
              dispatch(progressUpdated(false));
            });
        })
        .catch(() => {
          dispatch(progressUpdated(false));
        });
    }
  }, [coord, unitType, dispatch]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoord({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      setError("Please allow location access to get the forecasts.");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [coord, unitType, loadData]);

  if (coord) {
    return (
      <>
        <UIContainer>
          <UnitSwitcher />
          <div>
            <Button variant="contained" endIcon={<RefreshIcon />} onClick={loadData}>
              Refresh
            </Button>
          </div>
          <Forecasts />
          <Barchart />
        </UIContainer>
      </>
    );
  } else if (error) {
    return <>{error}</>;
  } else {
    return (
      <SpinnerContainer>
        <Spinner text="Wating for location" />
      </SpinnerContainer>
    );
  }
}

export default App;
