import BigNumber from 'bignumber.js';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { Text } from '@my/ui';
import styled from 'styled-components';
import { useMemo } from 'react';
const TextStyle = styled(Text)`
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 10px;
  color: #91919e;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: end;
  }
  i {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    font-weight: bold;
  }
  p {
    font-size: 12px;
    font-weight: 500;
    color: #91919e;
    line-height: 14px;
  }
`;
const Balance = (props) => {
  const {
    balance = new BigNumber(0),
    decimals,
    symbol,
  }: {
    balance: BigNumber;
    decimals: number;
    isBalanceZero: boolean;
    symbol: string;
  } = props;
  return useMemo(() => {
    return (
      <TextStyle>
        <i>
          {Number(getFullDisplayBalance(balance, decimals, 10)).toLocaleString('en-US', {
            maximumFractionDigits: 8,
          })}
        </i>
        <p>{symbol} in Wallet</p>
      </TextStyle>
    );
  }, [balance, decimals, symbol]);
};
export default Balance;
