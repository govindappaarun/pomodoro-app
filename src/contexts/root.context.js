import { AuthProvider } from './auth.context';
import { TasksProvider } from './tasks.context';
import { TimerProvider } from './timer.context';

const Provider = ({ children }) => {
  return (
    <AuthProvider>
      <TimerProvider>
        <TasksProvider>{children}</TasksProvider>
      </TimerProvider>
    </AuthProvider>
  );
};

export { Provider };
