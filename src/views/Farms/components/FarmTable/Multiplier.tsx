import React from 'react';
import styled from 'styled-components';
import { HelpIcon, Skeleton, useTooltip, Text } from '@my/ui';
import { useTranslation } from 'contexts/Localization';

const ReferenceElement = styled.div`
  display: inline-block;
`;

export interface MultiplierProps {
  multiplier: string;
}

const MultiplierWrapper = styled.div`
  width: 36px;
  text-align: right;
  margin-right: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />;
  const { t } = useTranslation();
  const tooltipContent = (
    <Text color="textSubtle">
      {t('The multiplier represents the amount of KAC rewards each farm gets.')}
      <br />
      <br />
      {t('For example, if a 1x farm was getting 1 KAC per block, a 40x farm would be getting 40 KAC per block.')}
    </Text>
  );
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: 'bottom-end',
    hideArrow: true,
    tooltipOffset: [20, 10],
  });

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  );
};

export default Multiplier;
