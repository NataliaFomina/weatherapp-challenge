import styled from "styled-components";

export const CarouselContent = styled.div`
  max-width: 300px;
  height: 180px;

  @media screen and (min-width: 576px) {
    max-width: 550px;
  }

  @media screen and (min-width: 800px) {
    max-width: 800px;
  }
`;

export const CarouselWithControl = styled.div`
  position: relative;
  padding: 0 50px;
`;

export const CarouselWrapper = styled.div`
  overflow: hidden;
`;

type CarouselItemsProps = {
  style: {};
};

export const CarouselItems = styled.div<CarouselItemsProps>`
  display: flex;
  transition: transform ease-out 0.3s;
`;

type CarouselItemWrapperProps = {
  width: number;
};

export const CarouselItemWrapper = styled.div<CarouselItemWrapperProps>`
  position: relative;
  height: 180px;
  flex: 0 0 ${(props) => props.width}%;
  max-width: ${(props) => props.width}%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

export const Control = styled.div`
  position: absolute;
  top: calc(50% - 30px);
  cursor: pointer;
`;

export const ControlLeft = styled(Control)`
  left: 0;
`;
export const ControlRight = styled(Control)`
  right: 0;
`;
