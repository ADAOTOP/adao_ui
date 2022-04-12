import React, { useState, useCallback } from 'react';
import { Button, Flex } from '@my/ui';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { StyledTokenInput, StyledInput, MaxButton, FarmStyled } from './style/DappstakeStyle';
import StakeTableReceive from './components/StakeTableReceive';
import DappstakePage from './components/DappstakePage';
import PageLayout from 'components/Layout/Page';
import UnbindList from './components/UnbindList';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate, IDappPoolDataInterface } from './hooks/getPoolUpdate';
import useStakeWrap from './hooks/useStakeWrap';
import { getReceiveNum } from './hooks/getReceiveNum';
import { UseStakeDApp } from './hooks/useStakeDApp';
// import { GetUserList } from './hooks/getUserList';
// import { IWithdrawRecordItem } from 'utils/types';
import { chainKey } from 'config';
const Unbind = () => {
  const contract = useDAppStackingContract();
  const pool: IDappPoolDataInterface = GetPoolUpdate(contract);
  const {
    isBalanceZero,
    decimals,
    fullBalance,
    account,
  }: {
    isBalanceZero: boolean;
    decimals: number;
    fullBalance: string;
    pid: number;
    account: string;
  } = useStakeWrap();
  // const list: IWithdrawRecordItem[] = GetUserList(contract, pool.recordsIndex, account);
  const { toastSuccess, toastError } = useToast();
  const [val, setVal] = useState('');
  const [pendingTx, setPendingTx] = useState(false);
  const lpTokensToStake = new BigNumber(val);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <PageLayout style={{ paddingTop: '80px' }}>
      <Flex justifyContent="center" alignContent="center" flexWrap="wrap">
        <DappstakePage
          contract={contract}
          pool={pool}
          balance={new BigNumber(0)}
          decimals={decimals}
          symbol="ibASTR"
          isBalanceZero={isBalanceZero}
        >
          <FarmStyled>
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
              disabled={pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0)}
              onClick={async () => {
                setPendingTx(true);
                try {
                  // await UseUnbindDApp(contract, account, val);
                  toastSuccess('Unstaked!', 'Your earnings have also been harvested to your wallet');
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
          </FarmStyled>
          <StakeTableReceive receiveText={`You will receive: ~${getReceiveNum(pool.ratio, val, 'ASTR')} ASTR`} />
        </DappstakePage>
        <UnbindList
          withdraw_symbol={chainKey}
          // list={list}
          list={[
            {
              address: '',
              amount: 1222,
              era: 99999,
              unbonding: 99999,
              status: 0, // 0: Withdrawed 1: Withdraw  2: count down
            },
            {
              address: '',
              amount: 12,
              era: 99999,
              unbonding: 9999999,
              status: 1, // 0: Withdrawed 1: Withdraw  2: count down
            },
            {
              address: '',
              amount: 1222.33,
              era: 999, //1642241278349
              unbonding: 9999,
              status: 1, // 0: Withdrawed 1: Withdraw  2: count down
            },
          ]}
          withdraw={async () => {
            await UseStakeDApp(contract, account);
            toastSuccess('Staked!', 'Your funds have been staked in the App');
          }}
        />
      </Flex>
    </PageLayout>
  );
};

export default Unbind;
