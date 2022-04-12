import React from "react";
import Svg from "../Svg";
import { useTheme } from "styled-components";
import { SvgProps } from "../types";

const MinusBtnIcon: React.FC<SvgProps> = (props) => {
  const theme = useTheme();
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect fill={theme.colors.primary} width="32" height="32" rx="12" />
        <path
          d="M16,8 C17.1045695,8 18,8.8954305 18,10 L18,10 L18,14 L22,14 C23.1045695,14 24,14.8954305 24,16 C24,17.1045695 23.1045695,18 22,18 L18,18 L18,22 C18,23.0543618 17.1841222,23.9181651 16.1492623,23.9945143 L16,24 C14.8954305,24 14,23.1045695 14,22 L14,22 L13.999,18 L10,18 C8.8954305,18 8,17.1045695 8,16 C8,14.8954305 8.8954305,14 10,14 L14,14 L14,10 C14,8.9456382 14.8158778,8.08183488 15.8507377,8.00548574 Z"
          fill="#030222"
        />
      </g>
    </Svg>
  );
};

export default MinusBtnIcon;
