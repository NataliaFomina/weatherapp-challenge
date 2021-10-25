export type UnitType = "metric" | "imperial";

export type Forecast = {
  temp: number;
  iconURL: string;
  description: string;
  date: string;
  segments: Segment[];
};

export type Segment = {
  temp: number;
  date: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};
