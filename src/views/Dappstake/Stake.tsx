import React, { useState, useCallback } from 'react';
import { Button, Flex, useMatchBreakpoints, useWalletModal } from '@my/ui';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { StyledTokenInput, StyledInput, MaxButton, FarmStyled } from './style/DappstakeStyle';
import StakeTableReceive from './components/StakeTableReceive';
import DappstakePage from './components/DappstakePage';
import PageLayout from 'components/Layout/Page';
import { useDAppStackingContract } from 'hooks/useContract';
// import { GetPoolUpdate, IDappPoolDataInterface } from './hooks/getPoolUpdate';
import { getReceiveNum } from './hooks/getReceiveNum';
import { escapeRegExp } from 'utils';
import { UseStakeDApp } from './hooks/useStakeDApp';
import { LoadingIconStyle } from 'components/svg/Loading';
import { GetPoolUpdate, useStakeBalance, useStakingState } from 'state/staking/hooks';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useAuth from 'hooks/useAuth';
const Stake = () => {
  const { account } = useActiveWeb3React();
  const staking = useStakingState();
  const {
    mainTokenSymbol,
    ibASTRTokenSymbol,
    mainTokenBalance: balance = 0,
    mainTokenIsBalanceZero: isBalanceZero,
    mainTokenDecimals: decimals,
    mainTokenFullBalance: fullBalance,
    totalSupply = '0',
    ratio = 1,
    recordsIndex = 1,
  } = staking;
  useStakeBalance(account);
  // 获取合约
  const contract = useDAppStackingContract();
  GetPoolUpdate(contract);

  const pool = {
    totalSupply,
    ratio,
    recordsIndex,
  };

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
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isXl || isLg);
  return (
    <PageLayout style={{ paddingTop: isMobile ? '20px' : '80px' }}>
      <Flex justifyContent="center" alignContent="center">
        <DappstakePage
          contract={contract}
          pool={pool}
          balance={new BigNumber(balance)}
          decimals={decimals}
          isBalanceZero={isBalanceZero}
          symbol={mainTokenSymbol}
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
              disabled={
                !account
                  ? false
                  : pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)
              }
              onClick={async () => {
                if (!account) {
                  onPresentConnectModal();
                  return;
                }
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
            receiveText={`You will receive: ~${getReceiveNum(pool.ratio, val, ibASTRTokenSymbol)} ${ibASTRTokenSymbol}`}
          />
        </DappstakePage>
      </Flex>
    </PageLayout>
  );
};

export default Stake;
