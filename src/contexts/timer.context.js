import { useContext, useState, createContext } from 'react';
import useCountDown from 'react-countdown-hook';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [currentItem, setCurrentItem] = useState({});
  const [initialTime, setInitialTime] = useState(0);
  const [settings, setSettings] = useState({
    pomodoro: 20,
    longbreak: 10,
    shortbreak: 5,
    active: '',
  });

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    1000
  );

  const stopTimer = () => {
    setRunning(false);
  };

  const pauseTimer = () => {
    setRunning(false);
    pause();
  };

  const startTimer = time => {
    setInitialTime(10 * 60 * 60 * 1000);
    start();
    setRunning(true);
  };

  const updateSettings = newSettings => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <TimerContext.Provider
      value={{
        startTimer,
        stopTimer,
        pauseTimer,
        running,
        currentItem,
        timeLeft,
        settings,
        updateSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => useContext(TimerContext);

export { TimerProvider, useTimer };
