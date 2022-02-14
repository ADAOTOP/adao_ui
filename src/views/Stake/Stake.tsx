import React, { useState, useCallback } from 'react';
import { Button, Flex } from '@kaco/adao_ui';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { StyledTokenInput, StyledInput, MaxButton } from './style/DappstakeStyle';
import Balance from './components/StakeTableBalance';
import StakeTableReceive from './components/StakeTableReceive';
import DappstakePage from './components/DappstakePage';
import PageLayout from 'components/Layout/Page';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate } from './hooks/getPoolUpdate';
import { getReceiveNum } from './hooks/getReceiveNum';
import { escapeRegExp } from 'utils';
import useStakeWrap from './hooks/useStakeWrap';
import { UseStakeDApp } from './hooks/useStakeDApp';
const Stake = () => {
  const {
    balance,
    isBalanceZero,
    decimals,
    fullBalance,
    account,
  }: {
    balance: BigNumber;
    isBalanceZero: boolean;
    decimals: number;
    fullBalance: string;
    pid: number;
    account: string;
  } = useStakeWrap();
  // 获取合约
  const contract = useDAppStackingContract();
  const pool = GetPoolUpdate(contract);

  const { toastSuccess, toastError } = useToast();
  const [val, setVal] = useState('');
  const [pendingTx, setPendingTx] = useState(false);
  const lpTokensToStake = new BigNumber(val);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        const nextUserInput = e.currentTarget.value.replace(/,/g, '.');
        if (nextUserInput === '' || RegExp(`^\\d*(?:\\\\[.])?\\d*$`).test(escapeRegExp(nextUserInput))) {
          setVal(nextUserInput);
        }
      }
    },
    [setVal],
  );
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  return (
    <PageLayout style={{ paddingTop: '80px' }}>
      <Flex justifyContent="center" alignContent="center">
        <DappstakePage contract={contract} pool={pool}>
          <Balance balance={balance} decimals={decimals} symbol="SDN" isBalanceZero={isBalanceZero} />
          <StyledTokenInput isWarning={isBalanceZero}>
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode="decimal"
              step="any"
              min="0"
              onChange={handleChange}
              placeholder="0"
              value={val}
            />
            <MaxButton variant="text" onClick={handleSelectMax}>
              Max
            </MaxButton>
          </StyledTokenInput>
          <Button
            width="100%"
            disabled={pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)}
            onClick={async () => {
              setPendingTx(true);
              try {
                await UseStakeDApp(contract, account, val);
                toastSuccess('Staked!', 'Your funds have been staked in the App');
              } catch (e) {
                toastError(
                  'Error',
                  'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                );
                console.error(e);
              } finally {
                setPendingTx(false);
              }
            }}
          >
            {pendingTx ? 'Confirming' : 'Confirm'}
          </Button>
          <StakeTableReceive receiveText={`You will receive: ~${getReceiveNum(pool.ratio, val, 'KSDN')} KSDN`} />
        </DappstakePage>
      </Flex>
    </PageLayout>
  );
};

export default Stake;
