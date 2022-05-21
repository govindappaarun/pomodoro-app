import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { BsBarChart } from 'react-icons/bs';
import { MdOutlineSettings } from 'react-icons/md';
import { FaUserCircle, FaHome, FaTasks } from 'react-icons/fa';
import { ColorModeSwitcher } from 'src/ColorModeSwitcher';
import { NavLink } from 'react-router-dom';

function Header({ onSettings, onLogin, onLogout, isLoggedIn, ...rest }) {
  return (
    <HStack mx={5} align={'center'} mt={5}>
      <CheckCircleIcon boxSize={'40px'} color={'green.500'} ml={1} />
      <Heading>Pomofocus</Heading>
      <NavLink to="/">
        <Button leftIcon={<FaHome />}>Home</Button>
      </NavLink>
      <Button leftIcon={<MdOutlineSettings />} size="lg" onClick={onSettings}>
        Settings
      </Button>

      {!isLoggedIn && (
        <>
          <Button
            leftIcon={<FaUserCircle />}
            mr={1}
            size="lg"
            onClick={onLogin}
          >
            Login
          </Button>
          <NavLink to="/tasks">
            <Button leftIcon={<FaTasks />}>Manage Tasks</Button>
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <Button leftIcon={<BsBarChart />} size="lg">
            Report
          </Button>
          <Button
            leftIcon={<FaUserCircle />}
            mr={1}
            size="lg"
            onClick={onLogout}
          >
            Logout
          </Button>
        </>
      )}

      <ColorModeSwitcher justifySelf="flex-end" />
    </HStack>
  );
}

export default Header;
