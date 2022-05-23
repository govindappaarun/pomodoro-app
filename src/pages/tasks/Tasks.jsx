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
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from 'src/contexts/tasks.context';
import TaskList from './components/TaskList';

const Tasks = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      pomodoro: 0,
    },
  });

  const { tasksDispatch } = useTasks();
  const toast = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState(null);

  const onSubmit = values => {
    if (isEdit) {
      tasksDispatch({
        type: 'EDIT_TASK',
        payload: { id: task.id, task: values },
      });
      toast({
        title: 'Task saved successfully',
        description: 'Its time to do more work in less time.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEdit(false);
      setTask(null);
    } else {
      tasksDispatch({ type: 'ADD_TASK', payload: { task: values } });
      toast({
        title: 'Task added successfully',
        description: 'Its time to do more work in less time.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onEdit = values => {
    setIsEdit(true);
    setTask(values);
    const fields = ['title', 'description', 'pomodoro'];
    fields.forEach(field => setValue(field, values[field]));
    window.scrollTo(10, 10);
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
          Add your tasks and get it done
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
            <NumberInput size={'lg'}>
              <NumberInputField
                id="pomodoro"
                name="pomodoro"
                placeholder="Enter number of  pomodoro required"
                {...register('pomodoro', {
                  required: 'pomodoro is required',
                })}
              />
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
            {isEdit ? 'Save' : 'Add'} Task
          </Button>
        </form>
      </Box>
      <TaskList onEdit={onEdit} />
    </VStack>
  );
};

export default Tasks;
