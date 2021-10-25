import React, { useState, useReducer, useEffect } from "react";
import { Forecast } from "../../lib/model";
import Card from "../card";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton } from "@mui/material";
import {
  CarouselItemWrapper,
  CarouselContent,
  CarouselWithControl,
  CarouselWrapper,
  CarouselItems,
  ControlLeft,
  ControlRight,
} from "./components";

type CarouselProps = {
  items: Forecast[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [pageSize, setPageSize] = useState(getPazeSize());
  const [transform, setTransform] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    position: 0,
    counter: pageSize,
    items: items,
  });

  useEffect(() => {
    if (pageSize) {
      setTransform(100 / pageSize);
    }
  }, [pageSize]);

  useEffect(() => {
    let isMounted = true;
    const handleResize = () => {
      if (isMounted) {
        dispatch({ type: "RESET", pageSize });
        setPageSize(getPazeSize());
      }
    };
    window.addEventListener("resize", () => handleResize());
    return () => {
      window.removeEventListener("resize", () => handleResize());
      isMounted = false;
    };
  }, [pageSize]);

  return (
    <CarouselContent>
      <CarouselWithControl>
        <CarouselWrapper>
          <CarouselItems
            style={{
              transform: `translateX(${-state.position}%)`,
            }}
          >
            {state.items.map((i: Forecast, index: any) => {
              return <CarouselItem key={index} forecast={i} dispatch={dispatch} width={transform} />;
            })}
          </CarouselItems>
        </CarouselWrapper>
        <>
          {state.position > 0 && (
            <ControlLeft onClick={() => dispatch({ type: "PREV", transform })}>
              <IconButton aria-label="before" size="large">
                <NavigateBeforeIcon fontSize="inherit" />
              </IconButton>
            </ControlLeft>
          )}
          {state.counter < state.items.length && (
            <ControlRight onClick={() => dispatch({ type: "NEXT", transform })}>
              <IconButton aria-label="next" size="large">
                <NavigateNextIcon fontSize="inherit" />
              </IconButton>
            </ControlRight>
          )}
        </>
      </CarouselWithControl>
    </CarouselContent>
  );
};

function getPazeSize() {
  const width = window.innerWidth;

  if (width < 576) {
    return 1;
  } else if (width >= 576 && width < 800) {
    return 2;
  } else if (width >= 800) {
    return 3;
  }
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        position: state.position + action.transform,
        counter: state.counter + 1,
      };
    case "PREV":
      return {
        ...state,
        position: state.position - action.transform,
        counter: state.counter - 1,
      };
    case "RESET":
      return {
        ...state,
        position: 0,
        counter: action.pageSize,
      };
    default:
      return state;
  }
}

type CarouselItemProps = {
  forecast: Forecast;
  width: number;
  dispatch: any;
};

const CarouselItem: React.FC<CarouselItemProps> = ({ forecast, width }) => {
  return (
    <CarouselItemWrapper width={width}>
      <Card forecast={forecast} />
    </CarouselItemWrapper>
  );
};

export default Carousel;
