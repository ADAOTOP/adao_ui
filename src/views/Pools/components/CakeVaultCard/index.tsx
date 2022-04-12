import React from 'react';
import styled from 'styled-components';
import { Box, CardBody, Flex, Text } from '@my/ui';
import { useTranslation } from 'contexts/Localization';
import { useWeb3React } from '@web3-react/core';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { chainId, Coinversation } from 'config/constants/tokens';
import { useCakeVault } from 'state/pools/hooks';
import { Pool } from 'state/types';
import AprRow from '../PoolCard/AprRow';
import { StyledCard } from '../PoolCard/StyledCard';
import CardFooter from '../PoolCard/CardFooter';
import StyledCardHeader from '../PoolCard/StyledCardHeader';
import VaultCardActions from './VaultCardActions';
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow';
import RecentCakeProfitRow from './RecentCakeProfitRow';

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`;

interface CakeVaultProps {
  pool: Pool;
  showStakedOnly: boolean;
}

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
  } = useCakeVault();

  const accountHasSharesStaked = userShares && userShares.gt(0);
  const isLoading = !pool.userData || isVaultUserDataLoading;
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100;

  if (showStakedOnly && !accountHasSharesStaked) {
    return null;
  }

  return (
    <StyledCard isActive>
      <StyledCardHeader
        isStaking={accountHasSharesStaked}
        isAutoVault
        earningToken={Coinversation[chainId]}
        stakingToken={Coinversation[chainId]}
      />
      <StyledCardBody isLoading={isLoading}>
        <AprRow pool={pool} performanceFee={performanceFeeAsDecimal} />
        <Box mt="24px">
          <RecentCakeProfitRow />
        </Box>
        <Box mt="8px">
          <UnstakingFeeCountdownRow />
        </Box>
        <Flex mt="32px" flexDirection="column">
          {account ? (
            <VaultCardActions pool={pool} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </StyledCardBody>
      <CardFooter pool={pool} account={account} />
    </StyledCard>
  );
};

export default CakeVaultCard;
