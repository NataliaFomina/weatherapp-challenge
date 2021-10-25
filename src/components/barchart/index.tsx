import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "../../store/hook";

const Barchart = () => {
  const [data, setData] = useState<any>();
  const forecasts = useAppSelector((state) => state.entities.forecasts.items);
  const date = useAppSelector((state) => state.ui.date);
  const unitType = useAppSelector((state) => state.ui.unitType);

  const getUnitName = (unitType: string) => {
    if (unitType === "metric") {
      return "Celsius";
    } else if (unitType === "imperial") {
      return "Fahrenheit";
    }
    return null;
  };

  useEffect(() => {
    if (forecasts && date) {
      const dateForecast = forecasts.find((e) => e.date === date);
      if (dateForecast) {
        setData({
          labels: dateForecast.segments.map((e) =>
            new Date(e.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          ),
          datasets: [
            {
              label: `Temperature in ${getUnitName(unitType)}`,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
              data: dateForecast.segments.map((e) => e.temp),
            },
          ],
        });
      }
    }
  }, [forecasts, date, unitType]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default Barchart;
