import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 36 36" {...props}>
      <g fill="none" fillRule="evenodd">
        <path fill="#FFF" d="M18 0A18 18 0 1 0 18 36A18 18 0 1 0 18 0Z" />
        <path
          d="M22.375,5.75 C23.4105339,5.75 24.25,6.58946609 24.25,7.625 L24.25,22.5 C24.25,23.6045695 23.3545695,24.5 22.25,24.5 L20.5,24.5 L20.5,24.499 L14.875,24.5 C13.8394661,24.5 13,23.6605339 13,22.625 C13,21.5894661 13.8394661,20.75 14.875,20.75 L20.5,20.749 L20.5,7.625 C20.5,6.58946609 21.3394661,5.75 22.375,5.75 Z"
          fill="#31DAB1"
          transform="rotate(45 18.625 15.125)"
        />
      </g>
    </Svg>
  );
};

export default Icon;
