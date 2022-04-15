import { useMemo } from 'react';
import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance';
import { useGetBnbBalance } from 'hooks/useTokenBalance';
import { chainId, DEFAULT_Token, ibASTR } from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrencyBalance } from 'state/wallet/hooks';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';

const useStakeWrap = () => {
  const { balance } = useGetBnbBalance();
  const decimals = DEFAULT_Token[chainId].decimals;
  const pid = 0;
  const max = balance.toString();
  const isBalanceZero = max === '0' || !max;
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(balance);
  }, [balance]);
  const { account } = useActiveWeb3React();
  const ibASTRbalance = useCurrencyBalance(account, ibASTR[chainId]);
  const fullIbASTRbalance = useMemo(() => {
    if (ibASTRbalance) {
      return new BigNumber(ibASTRbalance.toSignificant(18)).toFixed(8, BigNumber.ROUND_DOWN);
    }
  }, [ibASTRbalance]);
  return {
    balance,
    decimals,
    max,
    isBalanceZero,
    fullBalance,
    pid,
    account,
    ibASTRDecimals: ibASTR[chainId].decimals,
    ibASTRbalance: ibASTRbalance ? getDecimalAmount(new BigNumber(ibASTRbalance.toExact())) : BIG_ZERO,
    fullIbASTRbalance: fullIbASTRbalance,
  };
};
export default useStakeWrap;
