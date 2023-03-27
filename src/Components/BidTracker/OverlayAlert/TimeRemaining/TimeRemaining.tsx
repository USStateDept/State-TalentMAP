import { useEffect, useState } from 'react';
import { differenceInMinutes, distanceInWords, isAfter } from 'date-fns'; // TODO - use v2 and figure out how alias'd typings work
import { upperFirst } from 'lodash';

interface Props {
  time: Date,
}

const TimeRemaining: React.FC<Props> = props => {
  // TODO - don't include these, for demoing
  const { time } = props;

  const getTimeInWords = () => {
    const now = Date.now();
    let time$ = 'no time';
    if (isAfter(time, now)) {
      time$ = distanceInWords(time, now);
      if (Math.abs(differenceInMinutes(now, time)) < 60) {
        time$ = 'less than an hour';
      }
    }
    time$ = upperFirst(time$);
    return time$;
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeInWords());

  const setTimeInWords = () => {
    const timeInWords = getTimeInWords();
    setTimeRemaining(timeInWords);
  };

  useEffect(() => {
    setTimeInWords();

    const interval = setInterval(() => {
      setTimeInWords();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>{timeRemaining} remaining to accept the handshake</div>
  );
};

export default TimeRemaining;
