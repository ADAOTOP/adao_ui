import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex } from '@my/ui';
// import { GetDAppApr } from '../hooks/getApr';
import { IDappStakingInterface } from 'utils/types';
import { IDappPoolDataInterface } from 'state/staking/hooks';
export const Header = styled(Flex)`
  background: linear-gradient(90deg, #303fff, #c947d9);
  justify-content: space-between;
  padding: 20px 20px 0;
  border-radius: 20px;
  flex-wrap: wrap;
  min-width: 84%;
  max-width: 100%;
  margin: 0 auto 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 100%;
    padding: 20px 40px;
  }
`;
export const HeaderLi = styled.div`
  padding-right: 10px;
  padding-bottom: 20px;
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
  mainTokenSymbol: string;
  ibASTRTokenSymbol: string;
}
const StakeTableHeader: FC<Iprops> = ({ contract, pool, mainTokenSymbol, ibASTRTokenSymbol }) => {
  // const _apr = GetDAppApr(contract);
  return (
    <Header>
      <HeaderLi>
        <HeaderTitleH6>APY</HeaderTitleH6>
        <HeaderTitleH3>{pool.stakerApy ? pool.stakerApy.toFixed(2) : '-'}%</HeaderTitleH3>
      </HeaderLi>
      <HeaderLi>
        <HeaderTitleH6>Total Staked</HeaderTitleH6>
        <HeaderTitleH3>
          {pool.totalSupply === '0'
            ? '-'
            : Number(Number(pool.totalSupply) * (pool?.ratio ?? 1)).toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
          {mainTokenSymbol}
        </HeaderTitleH3>
      </HeaderLi>
      <HeaderLi>
        <HeaderTitleH6>Net value</HeaderTitleH6>
        <HeaderTitleH3>
          1{ibASTRTokenSymbol}=
          {(pool?.ratio ?? 0).toLocaleString('en-US', {
            maximumFractionDigits: 4,
          })}
          {mainTokenSymbol}
        </HeaderTitleH3>
      </HeaderLi>
    </Header>
  );
};
export default StakeTableHeader;
