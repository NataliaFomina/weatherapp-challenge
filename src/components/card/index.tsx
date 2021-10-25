import { FC } from "react";
import { Forecast } from "../../lib/model";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { dateUpdated } from "../../store/ui";
import { Container, Description, Icon, Temperature, DateLabel } from "./components";

interface Props {
  forecast: Forecast;
}

const Card: FC<Props> = ({ forecast }) => {
  const unitType = useAppSelector((state) => state.ui.unitType);
  const dispatch = useAppDispatch();

  const getUnitSymbol = () => {
    if (unitType === "metric") {
      return "°C";
    } else if (unitType === "imperial") {
      return "°";
    }
    return "";
  };

  const getFormattedDate = (date: string): string => {
    const locale = navigator.language;
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(locale, dateOptions);
  };

  const handleClick = () => {
    dispatch(dateUpdated(forecast.date));
  };

  return (
    <Container onClick={handleClick}>
      <Icon src={forecast.iconURL} alt="Weather Image" />
      <Temperature>{`${forecast.temp}${getUnitSymbol()}`}</Temperature>
      <Description>{forecast.description}</Description>
      <DateLabel>{getFormattedDate(forecast.date)}</DateLabel>
    </Container>
  );
};

export default Card;
