import { Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTimer } from 'src/contexts';
import { useAuth } from 'src/contexts';
import { AuthService } from 'src/services';
import Footer from './components/footer';
import Header from './components/header';

const HomePage = () => {
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
    <Box>
      <Header
        onLogin={handleLoginWithGoogle}
        onLogout={handleLogout}
        isLoggedIn={authState.isLoggedIn}
      />
      <Box minHeight={'calc(100vh - 140px)'}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
