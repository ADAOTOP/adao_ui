import React, { FC } from 'react';
import styled from 'styled-components';
import DappstakeSubNav from './SubNav';
import StakeTableHeader from './StakeTableHeader';
import { IDappStakingInterface } from 'utils/types';
import BigNumber from 'bignumber.js';

const StyledPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0;
  min-height: calc(100vh-64px);
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 10px;
    min-height: calc(100vh-64px);
  }
`;
const StyledPage = ({ children, ...props }) => {
  return <StyledPageStyle {...props}>{children}</StyledPageStyle>;
};
const StakePageLayout = styled.div`
  min-height: 0px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 600px;
  }
  border-radius: 20px;
  padding: 0;
  // margin: 100px auto;
`;
const TableContent = styled.div`
  background: linear-gradient(0deg, #0d0d11, #3a3a4c);
  border-radius: 20px;
  padding: 30px 12px;
  min-width: 84%;
  width: 100%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 35px;
    max-width: 100%;
  }
`;
// slippageAdjustedAmounts
interface Iprops {
  children: React.HTMLAttributes<HTMLDivElement>;
  contract: IDappStakingInterface;
  pool: any;
  balance: BigNumber;
  decimals: number;
  isBalanceZero: boolean;
  symbol: string;
  mainTokenSymbol: string;
  ibASTRTokenSymbol: string;
  isMobile: boolean;
  addToMetamask: any;
}
const DappstakePage: FC<Iprops> = ({
  children,
  contract,
  pool,
  balance,
  decimals,
  isBalanceZero,
  symbol,
  mainTokenSymbol,
  ibASTRTokenSymbol,
  isMobile,
  addToMetamask,
  ...props
}) => {
  return (
    <StakePageLayout>
      <StakeTableHeader
        mainTokenSymbol={mainTokenSymbol}
        ibASTRTokenSymbol={ibASTRTokenSymbol}
        contract={contract}
        pool={pool}
        addToMetamask={addToMetamask}
      />
      <TableContent>
        <DappstakeSubNav
          isMobile={isMobile}
          balance={balance}
          decimals={decimals}
          isBalanceZero={isBalanceZero}
          symbol={symbol}
        />
        <StyledPage>{children}</StyledPage>
      </TableContent>
    </StakePageLayout>
  );
};
export default DappstakePage;
