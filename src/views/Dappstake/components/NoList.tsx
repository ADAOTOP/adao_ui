import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { Text } from '@my/ui';

const NoList: FC<{ className?: string }> = ({ className }) => {
  return useMemo(() => {
    return (
      <div className={className}>
        <img width="100px" src="/images/nohave.svg" alt="" />
        <Text
          fontSize="12px"
          color="textSubtle"
          mb={{ xs: '16px', md: '20px' }}
          mt={{ xs: '10px', md: '15px' }}
          textAlign="center"
        >
          There's nothing here.
        </Text>
      </div>
    );
  }, [className]);
};

export default styled(NoList)`
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
