import { useRoutes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/login', element: <Login /> },
];

export default () => useRoutes([...publicRoutes]);
