import { FC, useEffect } from "react";
import Spinner from "../spinner";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Carousel from "../carousel";
import { dateUpdated } from "../../store/ui";
import { SpinnerContainer } from "./components";

const Forecasts: FC = () => {
  const forecasts = useAppSelector((state) => state.entities.forecasts.items);
  const progress = useAppSelector((state) => state.ui.progress);
  const error = useAppSelector((state) => state.ui.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (forecasts && forecasts.length > 0) {
      dispatch(dateUpdated(forecasts[0].date));
    }
  }, [forecasts, dispatch]);

  if (progress) {
    return (
      <SpinnerContainer>
        <Spinner text="Fetching forecasts" />
      </SpinnerContainer>
    );
  } else if (forecasts) {
    return <Carousel items={forecasts} />;
  } else if (error) {
    return <>{error}</>;
  } else {
    return null;
  }
};

export default Forecasts;
