import React, { useState, useCallback } from 'react';
import { Button, Flex, useMatchBreakpoints, useWalletModal } from '@my/ui';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { StyledTokenInput, StyledInput, MaxButton, FarmStyled } from './style/DappstakeStyle';
import StakeTableReceive from './components/StakeTableReceive';
import DappstakePage from './components/DappstakePage';
import PageLayout from 'components/Layout/Page';
import UnbindList from './components/UnbindList';
import { useDAppStackingContract, useDAppStackingMainContract } from 'hooks/useContract';
import { getReceiveNum } from './hooks/getReceiveNum';
import { UseStakeDApp } from './hooks/useStakeDApp';
import { UseUnbindDApp } from './hooks/useUnbindDApp';
import { LoadingIconStyle } from 'components/svg/Loading';
import { GetStakingContractData } from './hooks/getStakingContractData';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import {
  GetPoolUpdate,
  GetUserList,
  IDappPoolDataInterface,
  useStakeBalance,
  useStakingState,
} from 'state/staking/hooks';
import useAuth from 'hooks/useAuth';

const Unbind = () => {
  const { account } = useActiveWeb3React();
  const staking = useStakingState();
  useStakeBalance();
  const {
    mainTokenSymbol,
    ibASTRTokenSymbol,
    ibASTRTokenIsBalanceZero: isBalanceZero,
    ibASTRTokenDecimals: decimals,
    ibASTRTokenBalance: balance = 0,
    ibASTRTokenFullBalance: fullBalance,
    totalSupply,
    ratio = 1,
    recordsIndex = 1,
    data: list = [],
  } = staking;

  const contract = useDAppStackingContract();
  const contractMain = useDAppStackingMainContract();
  GetPoolUpdate(contract);
  const pool: IDappPoolDataInterface = {
    totalSupply,
    ratio,
    recordsIndex,
  };
  const { current_era } = GetStakingContractData(contractMain);
  const { toastSuccess, toastError, toastWarning } = useToast();
  const [val, setVal] = useState('');
  const [pendingTx, setPendingTx] = useState(false);
  const [pendingTxWithdraw, setPendingTxWithdraw] = useState('false');
  const lpTokensToStake = new BigNumber(val);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  GetUserList(contract, pendingTx);
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isXl || isLg);
  return (
    <PageLayout style={{ paddingTop: isMobile ? '20px' : '80px' }}>
      <Flex justifyContent="center" alignContent="center" flexWrap="wrap">
        <DappstakePage
          contract={contract}
          pool={pool}
          balance={new BigNumber(balance)}
          decimals={decimals}
          symbol={ibASTRTokenSymbol}
          isBalanceZero={isBalanceZero}
          mainTokenSymbol={mainTokenSymbol}
          ibASTRTokenSymbol={ibASTRTokenSymbol}
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
              variant={!account ? 'tertiary' : 'primary'}
              disabled={!account ? false : pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0)}
              onClick={async () => {
                if (!account) {
                  onPresentConnectModal();
                  return;
                }
                const _val = getReceiveNum(pool.ratio, val, ibASTRTokenSymbol);
                if (!val || Number(_val) < 1) {
                  toastWarning('Warning', 'Unbind amount must >= 1');
                  return;
                }
                setPendingTx(true);
                try {
                  await UseUnbindDApp(contract, val);
                  toastSuccess('Unbind!', 'Unbind Successful!');
                } catch (e) {
                  toastError(
                    'Error',
                    'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                  );
                  console.error(e);
                } finally {
                  setVal('');
                  setPendingTx(false);
                }
              }}
            >
              {!account ? 'Connect Wallet' : pendingTx ? 'Confirming' : 'Confirm'}
              {pendingTx ? <LoadingIconStyle /> : null}
            </Button>
          </FarmStyled>
          <StakeTableReceive
            receiveText={`You will receive: ~${getReceiveNum(pool.ratio, val, ibASTRTokenSymbol)} ${mainTokenSymbol}`}
          />
        </DappstakePage>
        <UnbindList
          withdraw_symbol={mainTokenSymbol}
          list={account && list && list[account] ? list[account] : []}
          mainTokenSymbol={mainTokenSymbol}
          current_era={current_era}
          pendingTxWithdraw={pendingTxWithdraw}
          withdraw={async (index: number) => {
            setPendingTxWithdraw(`true${index}`);
            try {
              await UseStakeDApp(contract, account);
              toastSuccess('Withdraw!', 'Your earnings have also been harvested to your wallet');
            } catch (e) {
              toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
              console.error(e);
            } finally {
              setPendingTxWithdraw(`false${index}`);
            }
          }}
        />
      </Flex>
    </PageLayout>
  );
};
// list={[
//   {
//     address: '',
//     amount: 432.12,
//     era: 99999,
//     unbonding: 99999,
//     status: 0, // 0: Withdrawed 1: Withdraw  2: count down
//   },
//   {
//     address: '',
//     amount: 9.3,
//     era: 99999,
//     unbonding: 9999999,
//     status: 1, // 0: Withdrawed 1: Withdraw  2: count down
//   },
//   {
//     address: '',
//     amount: 2323.33,
//     era: 999, //1642241278349
//     unbonding: 9999,
//     status: 1, // 0: Withdrawed 1: Withdraw  2: count down
//   },
// ]}
export default Unbind;
