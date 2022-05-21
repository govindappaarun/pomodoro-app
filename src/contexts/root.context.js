import { AuthProvider } from './auth.context';
import { TimerProvider } from './timer.context';

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <TimerProvider>{children}</TimerProvider>
    </AuthProvider>
  );
};

export { Provider };
