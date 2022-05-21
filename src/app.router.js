import { useRoutes } from 'react-router-dom';
import Home from './pages/home';
import TimerSettings from './pages/settings';
import Login from './pages/login';
import PomodoroPage from './pages/pomodoro';
import Report from './pages/report';
import SignUp from './pages/signup';
import Tasks from './pages/tasks';

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <PomodoroPage />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'settings',
        element: <TimerSettings />,
      },
      {
        path: 'report',
        element: <Report />,
      },
    ],
  },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/login', element: <Login /> },
];

export default () => useRoutes([...publicRoutes]);
