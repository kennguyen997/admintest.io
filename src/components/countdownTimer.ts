import { useCallback, useEffect, useState } from 'react';

const useTimer = (startTime: number) => {
  const [time, setTime] = useState<number>(startTime);
  const [intervalID, setIntervalID] = useState<any>(null);
  const hasTimerEnded = time <= 0;
  const isTimerRunning = intervalID != null;

  const update = useCallback(() => {
    setTime((time) => time - 1);
  }, []);

  const logTime = () => {
    const minutes = parseInt((time / 60).toString(), 10);
    const seconds = parseInt((time % 60).toString(), 10);
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const strSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${strMinutes}:${strSeconds}`;
  };

  const startTimer = () => {
    setTime(startTime);
    if (!isTimerRunning) {
      const date = new Date();
      localStorage.setItem('remainingSeconds', (date.getTime() + startTime * 1000).toString());
      setIntervalID(setInterval(update, 1000));
    }
  };
  const stopTimer = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  };
  useEffect(() => {
    const timeLocal = localStorage.getItem('remainingSeconds');
    const date = new Date();
    const timeRemain = timeLocal ? parseInt(timeLocal, 10) - date.getTime() : 0;
    if (timeLocal && timeRemain > 0) {
      setTime(timeRemain / 1000);
      setIntervalID(setInterval(update, 1000));
    }
  }, [update, startTime]);
  // clear interval when the timer ends
  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  }, [hasTimerEnded, intervalID]);
  // clear interval when component unmounts
  useEffect(
    () => () => {
      clearInterval(intervalID);
    },
    [intervalID],
  );
  return {
    time: logTime(),
    isTimerRunning: !!intervalID,
    startTimer,
    stopTimer,
  };
};

export default useTimer;
