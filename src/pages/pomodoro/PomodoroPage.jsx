import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Button,
  Progress,
  HStack,
  VStack,
  Divider,
  useToast,
} from '@chakra-ui/react';

import {
  Center,
  Heading,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import { useTimer } from '../../contexts';
import TaskList from '../tasks/components/TaskList';
import { useCountdown } from 'usehooks-ts';
import { useTasks } from 'src/contexts/tasks.context';

let intervalId = null;

function PomodoroPage() {
  const { updateSettings, settings, running } = useTimer();
  const [time, setTime] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const toast = useToast({ position: 'bottom-right', size: 'lg' });
  const [active, setActive] = useState('pomodoro');
  const { tasksState } = useTasks();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(0);
    updateTime(settings[active] * 60);
  }, [active]);

  // interval timer for 1 sec count down
  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => stopInterval();
  }, [isRunning, timeLeft]);

  // calculate display time and progress based on timeLeft
  useEffect(() => {
    const initialTime = settings[active] * 60;
    updateTime(isRunning ? timeLeft : initialTime);
    if (timeLeft === 0 && isRunning) {
      presentToast();
      onStop();
    }
  }, [timeLeft, isRunning]);

  const updateTime = _time => {
    let ss = _time;
    let mm = Math.floor(ss / 60);
    let progress = timeLeft ? (timeLeft / (settings[active] * 60)) * 100 : 0;
    ss = Math.floor(ss % 60);
    ss = ss.toString().padStart(2, 0);
    mm = mm.toString().padStart(2, 0);
    progress = progress.toFixed(0);
    setTime({ mm, ss, progress });
  };

  // clear the timer
  const stopInterval = () => {
    clearInterval(intervalId);
  };

  // on category switch
  const onSwitch = active => {
    setActive(active);
    updateSettings({ active });
    setIsRunning(false);
  };

  const onStart = () => {
    setTimeLeft(settings[active] * 60);
    setIsRunning(true);
  };

  const onStop = () => {
    stopInterval();
  };

  const onReset = () => {
    setIsRunning(false);
    stopInterval();
    setTimeLeft(settings[active] * 60);
  };

  const presentToast = () => {
    switch (settings.active) {
      case 'pomodoro':
        toast({
          title: 'Good Job.',
          description: 'Its time for a short break.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 'shortbreak':
        toast({
          title: 'Time to focus.',
          description: 'Its time to focus on your task.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        break;
      case 'longbreak':
        toast({
          title: 'Hope you had good refreshment.',
          description: 'Its time to focus on your task again.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        break;
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="81vh" p={3}>
        <Progress colorScheme="green" size="sm" value={100 - time.progress} />
        <Center py={6}>
          <VStack>
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
                {settings.active}
                <Heading
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={'2xl'}
                  fontFamily={'body'}
                >
                  <Text align="center" fontSize={'9xl'}>
                    {`${time.mm}:${time.ss}`}
                  </Text>
                </Heading>
                <Button
                  mt={'4'}
                  size={'lg'}
                  onClick={onStart}
                  disabled={!tasksState?.activeTask}
                >
                  Start
                </Button>
                {isRunning && (
                  <Button
                    onClick={() => {
                      onStop();
                      toast({
                        title: 'Timer stopped on demand',
                        duration: 3000,
                      });
                    }}
                  >
                    Stop
                  </Button>
                )}
                {isRunning && <Button onClick={onReset}>Reset</Button>}
              </Stack>
              <Box mt={'2rem'}>
                {tasksState?.activeTask ? (
                  <Heading mb={'2rem'}>
                    Current : {tasksState.activeTask.title}
                  </Heading>
                ) : (
                  <p>Choose a task below </p>
                )}
              </Box>
            </Box>
            <Divider />
            <TaskList />
          </VStack>
        </Center>
      </Grid>
    </ChakraProvider>
  );
}

export default PomodoroPage;
