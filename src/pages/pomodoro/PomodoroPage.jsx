import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Button,
  IconButton,
  Progress,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';

import {
  Center,
  Heading,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import { AuthService } from '../../services';
import { fetchToken, onMessageListener } from '../../firebase/config';
import TimerSettings from '../home/components/settings';
import { useTimer } from '../../contexts';
import { settings } from 'firebase/analytics';
import useCountDown from 'react-countdown-hook';

function PomodoroPage() {
  const [isTokenFound, setIsTokenFound] = useState(false);

  fetchToken(setIsTokenFound);
  onMessageListener()
    .then(payload => {
      console.log({ payload });
    })
    .catch(err => console.log('failed..', err));

  const {
    timeLeft,
    startTimer,
    stopTimer,
    pauseTimer,
    running,
    updateSettings,
  } = useTimer();

  const [left, { start }] = useCountDown(60 * 1000);
  const mm = Math.floor(timeLeft / 60);
  const ss = timeLeft % 60;

  const onSwitch = active => {
    updateSettings({ active });
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="81vh" p={3}>
        <Progress colorScheme="green" size="sm" value={10} />
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
                  variant="outline"
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
                {left}
              </Heading>
              {!running && <Button onClick={start}>Start</Button>}
              {running && <Button onClick={pauseTimer}>Pause</Button>}
              {running && <Button onClick={stopTimer}>Stop</Button>}
            </Stack>
          </Box>
        </Center>
      </Grid>
    </ChakraProvider>
  );
}

export default PomodoroPage;
