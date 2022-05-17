import { useMemo } from 'react';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useGetBnbBalance } from 'hooks/useTokenBalance';
import { chainId, DEFAULT_Token } from 'config/constants/tokens';
import styled from 'styled-components';
import { chainKey } from 'components/SideMenu/config';
const StyledPageStyle = styled.div``;
const StyledPage = ({ children, ...props }) => {
  return <StyledPageStyle {...props}>{children}</StyledPageStyle>;
};
const StakeWrap = ({ children }) => {
  const { balance } = useGetBnbBalance();
  const decimals = DEFAULT_Token[chainId].decimals;
  const pid = 0;
  const max = balance.toString();
  const isBalanceZero = max === '0' || !max;
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(balance);
  }, [balance]);
  return useMemo(() => {
    return (
      <StyledPage
        balance={balance}
        decimals={decimals}
        max={max}
        isBalanceZero={isBalanceZero}
        fullBalance={fullBalance}
        pid={pid}
      >
        {children}
      </StyledPage>
    );
  }, [balance, decimals, max, isBalanceZero, fullBalance, pid]);
};
export default StakeWrap;
