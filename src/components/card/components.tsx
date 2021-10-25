import styled from "styled-components";
import { Paper } from "@mui/material";

export const Container = styled(Paper)`
  display: grid;
  grid-template:
    "icon temperature"
    "description description"
    "date date";
  grid-template-rows: 1fr 70px auto $row-height $row-height $row-height;
  grid-template-columns: auto;
  padding: 10px;
  min-width: 200px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.img`
  grid-area: icon;
  justify-self: end;
  align-self: center;
  width: 75px;
`;

export const Temperature = styled.div`
  grid-area: temperature;
  justify-self: start;
  align-self: center;
  font-size: 31px;
`;

export const Description = styled.div`
  grid-area: description;
  align-self: center;
  line-height: 25px;
`;

export const DateLabel = styled.div`
  grid-area: date;
  align-self: center;
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
