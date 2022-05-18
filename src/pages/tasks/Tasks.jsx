import {
  Box,
  Checkbox,
  FormControl,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  FormLabel,
  FormErrorMessage,
  Button,
  Center,
  VStack,
  Divider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiAddLine } from 'react-icons/ri';

const Tasks = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [tasks, setTasks] = useState([
    { text: 'Arun here' },
    { text: 'Arun here' },
    { text: 'Arun here' },
  ]);

  const onSubmit = values => {
    setTasks(prev => [...prev, { text: values.task }]);
  };

  return (
    <VStack alignItems={'start'} mx={'1rem'}>
      <Box maxWidth={'350px'} mb={'2rem'} mt="1rem">
        <form px={'1rem'} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.task}>
            <FormLabel htmlFor="task">Task description</FormLabel>
            <Input
              id="task"
              placeholder="Enter task description here"
              {...register('task', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.task && errors.task.message}
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

      <Divider />

      <Heading>List of Tasks</Heading>
      <List>
        {tasks.map((item, index) => {
          return (
            <ListItem key={index} py={'0.5rem'}>
              <Checkbox size={'lg'}>{item.text}</Checkbox>
            </ListItem>
          );
        })}
      </List>

      {/* <IconButton
        isRound
        colorScheme="blue"
        fontSize={'3xl'}
        icon={<RiAddLine />}
      /> */}
    </VStack>
  );
};

export default Tasks;
