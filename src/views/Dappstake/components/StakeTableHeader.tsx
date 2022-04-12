import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex } from '@my/ui';
import { GetDAppApr } from '../hooks/getApr';
import { IDappStakingInterface } from 'utils/types';
import { IDappPoolDataInterface } from '../hooks/getPoolUpdate';
export const Header = styled(Flex)`
  flex-wrap: wrap;
  background: linear-gradient(90deg, #303fff, #c947d9);
  justify-content: space-between;
  padding: 20px 20px 0;
  border-radius: 20px;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px 40px;
  }
`;
export const HeaderLi = styled.div`
  padding-bottom: 20px;
  &:last-child {
    padding-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 0;
  }
`;
export const HeaderTitleH3 = styled.h3`
  font-weight: bold;
  font-size: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
  }
`;
export const HeaderTitleH6 = styled.h6`
  padding-bottom: 6px;
  font-size: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 14px;
    padding-bottom: 8px;
  }
`;
interface Iprops {
  contract: IDappStakingInterface;
  pool: IDappPoolDataInterface;
}
const StakeTableHeader: FC<Iprops> = ({ contract, pool }) => {
  const _apr = GetDAppApr(contract);
  return (
    <Header>
      <HeaderLi>
        <HeaderTitleH6>APR</HeaderTitleH6>
        <HeaderTitleH3>{_apr}%</HeaderTitleH3>
      </HeaderLi>
      <HeaderLi>
        <HeaderTitleH6>Total Supply</HeaderTitleH6>
        <HeaderTitleH3>{pool.totalSupply} ASTR</HeaderTitleH3>
      </HeaderLi>
      <HeaderLi>
        <HeaderTitleH6>Net value</HeaderTitleH6>
        <HeaderTitleH3>1 ibASTR= {pool.ratio} ASTR</HeaderTitleH3>
      </HeaderLi>
    </Header>
  );
};
export default StakeTableHeader;
