import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { ButtonMenu, ButtonMenuItem, Flex } from '@my/ui';
import Balance from './StakeTableBalance';
import BigNumber from 'bignumber.js';

const StyledNav = styled(Flex)`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;
  }
`;

const getActiveIndex = (pathname: string): number => {
  if (pathname.includes('/stake')) {
    return 0;
  }
  return 1;
};
interface IProps {
  balance: BigNumber;
  decimals: number;
  isBalanceZero: boolean;
  symbol: string;
  isMobile: boolean;
}
const DappstakeSubNav: FC<IProps> = ({ balance, decimals, isBalanceZero, symbol, isMobile }) => {
  const location = useLocation();
  const activeIndex = getActiveIndex(location.pathname);
  return useMemo(() => {
    return (
      <StyledNav>
        <ButtonMenu
          py="6px"
          marginLeft={isMobile ? '18px' : '0'}
          marginRight={isMobile ? '18px' : '0'}
          activeIndex={activeIndex}
          scale="sm"
          variant="subtle"
          marginBottom="10px"
        >
          <ButtonMenuItem isActive={activeIndex === 0} id="Stake-nav-link" href="/dappstake/stake" as="a">
            Stake
          </ButtonMenuItem>
          {/* <ButtonMenuItem
          style={activeIndex === 1 ? { color: '#ffffff', background: 'linear-gradient(0deg, #0D0D11, #3A3A4C)' } : { color: "#4C4C5 " }}
          height="44px"
          width="112px"
          id="Unstake-nav-link"
          href="/dappstake/unstake"
          as="a"
        >
          Unstake
        </ButtonMenuItem> */}
          <ButtonMenuItem isActive={activeIndex === 1} id="Unstake-nav-link" href="/dappstake/unbind" as="a">
            Unbind
          </ButtonMenuItem>
        </ButtonMenu>
        <Balance balance={balance} decimals={decimals} symbol={symbol} isBalanceZero={isBalanceZero} />
      </StyledNav>
    );
  }, [activeIndex, balance, decimals, isBalanceZero, isMobile, symbol]);
};

export default DappstakeSubNav;
