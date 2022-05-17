import React, { useMemo } from 'react';
import getTimePeriods from 'utils/getTimePeriods';
import Timer from './Timer';
import useNextEventCountdown from './useNextEventCountdown';

interface CountdownProps {
  nextEventTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ nextEventTime }) => {
  // 15000000000 s
  const secondsRemaining = useNextEventCountdown(nextEventTime);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);
  return useMemo(() => {
    return (
      <>
        {secondsRemaining ? (
          <Timer
            minutes={minutes + 1} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
            seconds={seconds}
          />
        ) : (
          <Timer
            minutes={0} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={0}
            days={0}
            seconds={0}
          />
        )}
      </>
    );
  }, [days, hours, minutes, seconds, secondsRemaining]);
};

export default Countdown;
