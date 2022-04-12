import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Text from "../Text/Text";
import bunnyHeadMain from "./svg/bunnyhead-main.svg";
import bunnyHeadMax from "./svg/bunnyhead-max.svg";
import bunnyButt from "./svg/bunnybutt.svg";

interface SliderLabelProps {
  progress: string;
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean;
}

interface DisabledProp {
  disabled?: boolean;
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? "not-allowed" : "cursor";
};

const getBaseThumbStyles = ({ isMax, disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: ${getCursorStyle};
  filter: ${disabled ? "grayscale(100%)" : "none"};
  transition: 200ms transform;

  &:hover {
    transform: ${disabled ? "scale(1) translate(0px, 0px)" : "scale(1.1) translate(-1px, -1px)"};
  }
`;

export const SliderLabelContainer = styled.div`
  bottom: 0;
  position: absolute;
  left: 14px;
  width: calc(100% - 30px);
`;

export const SliderLabel = styled(Text)<SliderLabelProps>`
  bottom: 0;
  font-size: 12px;
  left: ${({ progress }) => progress};
  position: absolute;
  text-align: center;
  min-width: 24px; // Slider thumb size
`;

export const BunnyButt = styled.div<DisabledProp>`
  background: url(${bunnyButt}) no-repeat;
  height: 32px;
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  position: absolute;
  width: 15px;
`;

export const BunnySlider = styled.div`
  position: absolute;
  width: 100%;
  left: 1px;
`;

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;

  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }

  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }

  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`;

export const BarBackground = styled.div<DisabledProp>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textDisabled : "linear-gradient(0deg, #0D0D11, #3A3A4C)"};
  height: 10px;
  border-radius: 5px;
  position: absolute;
  top: 11px;
  left: 2px;
  right: 1px;
`;

export const BarProgress = styled.div<DisabledProp>`
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  height: 10px;
  position: absolute;
  top: 11px;
  left: 1px;
  background: linear-gradient(90deg, #7ad4d5, ${({ theme }) => theme.colors.primary});
  border-radius: 5px;
`;
