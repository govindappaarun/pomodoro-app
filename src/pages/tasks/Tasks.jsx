import {
  Box,
  FormControl,
  Heading,
  Input,
  FormLabel,
  FormErrorMessage,
  Button,
  Textarea,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from 'src/contexts/tasks.context';
import TaskList from './components/TaskList';

const Tasks = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { tasksState, tasksDispatch } = useTasks();

  const onSubmit = values => {
    tasksDispatch({ type: 'ADD_TASK', payload: { task: values } });
  };

  return (
    <VStack alignItems={'center'} mx={'1rem'} minHeight={'calc(100vh - 150px)'}>
      <Box
        p={10}
        shadow="md"
        minWidth={'40rem'}
        borderWidth="1px"
        mb={'2rem'}
        mt="2rem"
      >
        <Heading fontSize="xl" my={'1rem'}>
          Add and get it done
        </Heading>
        <form px={'1rem'} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.title} my={'1rem'}>
            <FormLabel htmlFor="title">Task Title</FormLabel>
            <Input
              size={'lg'}
              id="title"
              placeholder="Enter task title here"
              {...register('title', {
                required: 'Title is required',
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description} my={'1rem'}>
            <FormLabel htmlFor="task">Task description</FormLabel>
            <Textarea
              size={'lg'}
              id="description"
              placeholder="Enter task description here"
              {...register('description', {
                required: 'Description is required',
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.pomodoro} my={'1rem'}>
            <FormLabel htmlFor="pomodoro">Pomodoro estimate</FormLabel>
            <NumberInput
              size={'lg'}
              id="pomodoro"
              placeholder="Enter number of  pomodoro required"
              {...register('pomodoro', {
                required: 'pomodoro is required',
              })}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errors.pomodoro && errors.pomodoro.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Add Task
          </Button>
        </form>
      </Box>
      <TaskList />
    </VStack>
  );
};

export default Tasks;
