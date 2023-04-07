import { useEffect, useState } from 'react';
import { differenceInMinutes, distanceInWords, isAfter } from 'date-fns'; // TODO - use v2 and figure out how alias'd typings work
import { upperFirst } from 'lodash';

interface Props {
  time: Date,
}

const TimeRemaining: React.FC<Props> = props => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const { time } = props;
    const setTimeInWords = () => {
      const now = Date.now();
      let time$ = 'no time';
      if (isAfter(props.time, now)) {
        time$ = distanceInWords(time, now);
        if (Math.abs(differenceInMinutes(now, time)) < 60) {
          time$ = 'less than an hour';
        }
      }
      time$ = upperFirst(time$);
      setTimeRemaining(time$);
    };

    const interval = setInterval(() => {
      setTimeInWords();
    }, 1000);

    return () => clearInterval(interval);
  }, [props]);

  return (
    <div>{timeRemaining} remaining to accept the handshake</div>
  );
};

export default TimeRemaining;
