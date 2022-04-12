import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { LinkExternal, Text } from '@my/ui';
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard';
import { getAddress } from 'utils/addressHelpers';
import { getBscScanLink } from 'utils';
// import { CommunityTag, CoreTag, DualTag } from 'components/Tags';

import HarvestAction from './HarvestAction';
import StakedAction from './StakedAction';
import Apr, { AprProps } from '../Apr';
import Multiplier, { MultiplierProps } from '../Multiplier';
import Liquidity, { LiquidityProps } from '../Liquidity';

export interface ActionPanelProps {
  apr: AprProps;
  multiplier: MultiplierProps;
  liquidity: LiquidityProps;
  details: FarmWithStakedValue;
  userDataReady: boolean;
  expanded: boolean;
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`;

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  /* background: ${({ theme }) => theme.colors.background}; */
  display: flex;
  flex-direction: column-reverse;
  padding: 24px;
  margin: 0 20px;
  background-color: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 29px 39px;
    border-radius: 12px;
    margin: 0 40px;
  }
`;

const StyledLinkExternal = styled(LinkExternal)`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 600;
  font-size: 12px;
  svg {
    width: 14px;
  }
`;

// const TagsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-top: 25px;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     margin-top: 16px;
//   }

//   > div {
//     height: 24px;
//     padding: 0 6px;
//     font-size: 14px;
//     margin-right: 4px;

//     svg {
//       width: 14px;
//     }
//   }
// `;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`;

const InfoContainer = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`;

const TextStyle = styled(Text)`
  font-weight: 600;
  font-size: 12px;
`;

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  expanded,
}) => {
  const farm = details;

  const { t } = useTranslation();
  const lpAddress = getAddress(farm.lpAddresses);
  const bsc = getBscScanLink(lpAddress, 'address');
  // const info = `https://pancakeswap.info/pool/${lpAddress}`;
  return (
    <Container expanded={expanded}>
      <InfoContainer>
        <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
        {/* <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal> */}
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <TextStyle>{t('APR')}</TextStyle>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <TextStyle>{t('Multiplier')}</TextStyle>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <TextStyle>{t('Liquidity')}</TextStyle>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer style={{ justifyContent: 'space-between' }}>
        <HarvestAction {...farm} userDataReady={userDataReady} />
        <StakedAction {...farm} userDataReady={userDataReady} />
      </ActionContainer>
    </Container>
  );
};

export default ActionPanel;
