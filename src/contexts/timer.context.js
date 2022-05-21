import { useContext, useState, createContext, useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [initialTime, setInitialTime] = useState(0);
  const [running, setIsRunning] = useState(false);
  const [time, setTime] = useState({});

  const [settings, setSettings] = useState({
    pomodoro: 2,
    longbreak: 1,
    shortbreak: 0.5,
    active: 'pomodoro',
  });

  const [timeLeft, actions] = useCountdown({
    seconds: settings[settings.active] * 60,
    interval: 500,
    isIncrement: false,
  });

  useEffect(() => {
    setInitialTime(settings[settings.active]);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      actions.stop();
    }
  }, [timeLeft]);

  const updateSettings = newSettings => {
    actions.stop();
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  useEffect(() => {
    calcualteTimeProgress();
  }, [timeLeft]);

  const calcualteTimeProgress = () => {
    let ss = timeLeft || initialTime;
    let mm = Math.floor(ss / 60);
    let progress = timeLeft ? (timeLeft / (initialTime * 60)) * 100 : 100;
    ss = Math.floor(ss % 60);
    ss = ss.toString().padStart(2, 0);
    mm = mm.toString().padStart(2, 0);
    progress = progress.toFixed(0);
    setTime({ mm, ss, progress });
  };

  const onStart = () => {
    setIsRunning(true);
    actions.start();
  };

  const onStop = () => {
    setIsRunning(false);
    actions.stop();
  };

  const onReset = () => {
    setIsRunning(false);
    actions.reset();
  };

  return (
    <TimerContext.Provider
      value={{
        actions: { onStart, onStop, onReset },
        timeLeft,
        settings,
        updateSettings,
        time,
        running,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);

export { TimerProvider, useTimer };
