import { useContext, useState, createContext } from 'react';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    pomodoro: 20,
    longbreak: 10,
    shortbreak: 5,
    active: 'pomodoro',
  });

  const updateSettings = newSettings => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <TimerContext.Provider
      value={{
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
