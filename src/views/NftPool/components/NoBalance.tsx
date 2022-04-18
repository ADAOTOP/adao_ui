import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@my/ui';

const NoBalance: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <img width="100px" src="/images/nohave.svg" alt="" />
      <Text fontSize="12px" mb={{ xs: '16px', md: '20px' }} mt={{ xs: '10px', md: '15px' }}>
        There's nothing here. Go look somewhere else
      </Text>
    </div>
  );
};

export default styled(NoBalance)`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .show {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 278px;
    img {
      height: 100%;
    }
  }
`;
