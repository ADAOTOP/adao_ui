import React from 'react';
import styled from 'styled-components';
import { Flex, Heading } from '@my/ui';
import { Token } from 'config/constants/types';
import { TokenPairImage } from 'components/TokenImage';

export interface ExpandableSectionProps {
  lpLabel?: string;
  multiplier?: string;
  isCommunityFarm?: boolean;
  token: Token;
  quoteToken: Token;
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`;

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <TokenPairImage variant="inverted" primaryToken={quoteToken} secondaryToken={token} width={40} height={40} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        {/* <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex> */}
      </Flex>
    </Wrapper>
  );
};

export default CardHeading;
