import { SvgProps } from 'components/svg/types';
import useTheme from 'hooks/useTheme';
import React from 'react';
import styled from 'styled-components';

const LoadingIcon: React.FC<SvgProps> = (props) => {
  const { theme } = useTheme();
  return (
    <svg width="48px" height="60px" viewBox="0 0 24 30" xmlSpace="preserve" {...props}>
      <rect x="0" y="7.6416" width="4" height="14.7168" fill={theme.colors.primary} opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="8" y="5.1416" width="4" height="19.7168" fill={theme.colors.primary} opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="16" y="7.3584" width="4" height="15.2832" fill={theme.colors.primary} opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </svg>
  );
};
export const LoadingIconStyle = styled(LoadingIcon)`
  width: 10px;
  margin-left: 10px;
  height: 48px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 32px;
  }
`;
export default LoadingIcon;
