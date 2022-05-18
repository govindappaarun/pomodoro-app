import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTimer } from 'src/contexts';
import { useAuth } from 'src/contexts';
import { AuthService } from 'src/services';
import Footer from './components/footer';
import Header, { Simple } from './components/header';
import TimerSettings from './components/settings';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateSettings, time } = useTimer();
  const { authState, authDispatch } = useAuth();
  const handleLoginWithGoogle = async () => {
    const result = await AuthService.authWithGoogle().catch(e => {
      console.log(e.toString());
    });
    if (result && result.user) {
      authDispatch({ type: 'DO_SOCIAL_LOGIN', payload: result.user });
    }
  };

  const handleLogout = async () => {
    await AuthService.logOut();
    authDispatch({ type: 'DO_LOGOUT' });
  };

  return (
    <div>
      <Simple />
      <Header
        onLogin={handleLoginWithGoogle}
        onLogout={handleLogout}
        onSettings={onOpen}
        isLoggedIn={authState.isLoggedIn}
      />
      <Outlet />
      <TimerSettings
        isOpen={isOpen}
        onClose={onClose}
        updateSettings={updateSettings}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
