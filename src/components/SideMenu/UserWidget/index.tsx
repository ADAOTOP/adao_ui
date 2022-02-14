import React from 'react';
import styled from 'styled-components';
import { Flex } from '@kaco/adao_ui';
import WalletAccountInfo from './WalletAccount';
const UserWidget = () => {
  return (
    <User>
      <WalletAccountInfo />
    </User>
  );
};
const User = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding-right: 60px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: 0;
  }
`;

export default UserWidget;
