import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "./components";

type Props = {
  text: string;
};

const Spinner: FC<Props> = ({ text }) => {
  return (
    <Container>
      <CircularProgress />
      <span>{text}</span>
    </Container>
  );
};

export default Spinner;
