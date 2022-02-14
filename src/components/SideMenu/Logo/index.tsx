import React, { FC } from 'react';
import styled from 'styled-components';
const Logo: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <LogoStyle>
      <img src={collapsed ? '/images/logo.webp' : '/images/logo.webp'} alt="logo png" />
    </LogoStyle>
  );
};
const LogoStyle = styled.div`
  height: 34px;
  margin-right: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
    margin-top: 0;
    margin-right: 48px;
  }
  img {
    display: block;
    height: 34px;
    max-width: none;
    padding-left: 8px;
    ${({ theme }) => theme.mediaQueries.md} {
      height: 43px;
      padding-left: 0;
    }
  }
`;
export default Logo;
