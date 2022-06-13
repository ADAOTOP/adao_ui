import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Flex, Heading } from '@my/ui';

export interface TimerProps {
  minutes?: number;
  hours?: number;
  days?: number;
  seconds?: number;
}

const StyledTimerText = styled(Heading)`
  // color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: bolder;
  margin: 0;
`;
const FlexStyled = styled(Flex)`
  justify-content: end;
  background: linear-gradient(90deg, #303fff 0%, #c947d9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Timer: React.FC<TimerProps> = ({ minutes, hours, days, seconds }) => {
  return useMemo(() => {
    return (
      <FlexStyled>
        <DaysComp days={days} />
        <HoursComp hours={hours} />
        <MinComp minutes={minutes} />
        <SecComp seconds={seconds} />
      </FlexStyled>
    );
  }, [minutes, hours, days, seconds]);
};
const DaysComp = ({ days }) => {
  return useMemo(() => {
    return (
      <StyledTimerText mb="-4px" scale="xl" mr="4px">
        {days >= 10 ? days : `0${days}`}:
      </StyledTimerText>
    );
  }, [days]);
};
const HoursComp = ({ hours }) => {
  return useMemo(() => {
    return (
      <StyledTimerText mb="-4px" scale="xl" mr="4px">
        {hours >= 10 ? hours : `0${hours}`}
      </StyledTimerText>
    );
  }, [hours]);
};
const MinComp = ({ minutes }) => {
  return useMemo(() => {
    return (
      <StyledTimerText mb="-4px" scale="xl" mr="4px">
        {minutes >= 10 ? minutes : `0${minutes}`}:
      </StyledTimerText>
    );
  }, [minutes]);
};
const SecComp = ({ seconds }) => {
  return useMemo(() => {
    return (
      <StyledTimerText mb="-4px" scale="xl" mr="4px">
        {seconds >= 10 ? seconds : `0${seconds}`}
      </StyledTimerText>
    );
  }, [seconds]);
};
export default Timer;
