import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Button,
  Progress,
  HStack,
} from '@chakra-ui/react';

import {
  Center,
  Heading,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import { useTimer } from '../../contexts';

function PomodoroPage() {
  const { timeLeft, actions, time, updateSettings, settings, running } =
    useTimer();

  const onSwitch = active => {
    actions.onReset();
    updateSettings({ active });
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="81vh" p={3}>
        <Progress colorScheme="green" size="sm" value={100 - time.progress} />
        <Center py={6}>
          <Box
            maxW={'445px'}
            height={'65vh'}
            w={'full'}
            bg={'red.100'}
            boxShadow={'xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
          >
            <Stack>
              <HStack>
                <Button
                  onClick={() => onSwitch('pomodoro')}
                  colorScheme="teal"
                  variant={'ghost'}
                  size="lg"
                  isActive={settings.active === 'pomodoro'}
                >
                  Pomodoro
                </Button>
                <Button
                  onClick={() => onSwitch('shortbreak')}
                  colorScheme="teal"
                  variant="ghost"
                  size="lg"
                  isActive={settings.active === 'shortbreak'}
                >
                  Short Break
                </Button>
                <Button
                  onClick={() => onSwitch('longbreak')}
                  colorScheme="teal"
                  variant="ghost"
                  size="lg"
                  isActive={settings.active === 'longbreak'}
                >
                  Long Break
                </Button>
              </HStack>

              <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'2xl'}
                fontFamily={'body'}
              >
                <Text align="center" fontSize={'9xl'}>
                  {timeLeft === 0
                    ? `${settings[settings.active]}:00`
                    : `${time.mm}:${time.ss}
                  `}
                </Text>
              </Heading>
              <Button mt={'4'} size={'lg'} onClick={actions.onStart}>
                Start
              </Button>
              {running && <Button onClick={actions.onStop}>Stop</Button>}
              {running && <Button onClick={actions.onReset}>Reset</Button>}
            </Stack>
          </Box>
        </Center>
      </Grid>
    </ChakraProvider>
  );
}

export default PomodoroPage;
