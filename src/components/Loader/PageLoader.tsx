import Flex from 'components/Layout/Flex';
import Spinner from 'components/TransactionConfirmationModal/Spinner';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    height: 160px;
  }
`;

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default PageLoader;
