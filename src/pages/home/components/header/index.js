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

      <Box flexGrow={'1'} />

      <NavLink to="/">
        <Button leftIcon={<FaHome />} variant="outline">
          Home
        </Button>
      </NavLink>

      <NavLink to="settings">
        <Button leftIcon={<MdOutlineSettings />} size="lg" variant="outline">
          Settings
        </Button>
      </NavLink>
      {!isLoggedIn && (
        <>
          <Button
            leftIcon={<FaUserCircle />}
            mr={1}
            size="lg"
            onClick={onLogin}
            variant="outline"
          >
            Login
          </Button>
        </>
      )}

      {isLoggedIn && (
        <>
          <NavLink to="/tasks">
            <Button leftIcon={<FaTasks />} variant="outline">
              Manage Tasks
            </Button>
          </NavLink>

          <NavLink to="report">
            <Button leftIcon={<BsBarChart />} size="lg" variant="outline">
              Report
            </Button>
          </NavLink>

          <Button
            leftIcon={<FaUserCircle />}
            mr={1}
            size="lg"
            onClick={onLogout}
            variant="outline"
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
