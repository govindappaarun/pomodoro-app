import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { BsBarChart } from 'react-icons/bs';
import { MdOutlineSettings } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { ColorModeSwitcher } from 'src/ColorModeSwitcher';
import {
  Flex,
  Avatar,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box display={'flex'} gap="1rem" alignItems={'center'}>
            <CheckCircleIcon boxSize={'40px'} color={'green.500'} ml={1} />
            <Heading>Pomofocus</Heading>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(link => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button variant={'solid'} color={'teal'}>
            Login
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(link => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

function Header({ onSettings, onLogin, onLogout, isLoggedIn, ...rest }) {
  return (
    <HStack mx={5} align={'center'} mt={5}>
      <CheckCircleIcon boxSize={'40px'} color={'green.500'} ml={1} />
      <Heading>Pomofocus</Heading>
      <Button leftIcon={<MdOutlineSettings />} size="lg" onClick={onSettings}>
        Settings
      </Button>

      {!isLoggedIn && (
        <Button leftIcon={<FaUserCircle />} mr={1} size="lg" onClick={onLogin}>
          Login
        </Button>
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
