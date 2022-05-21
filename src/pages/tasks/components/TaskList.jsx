import React from 'react';
import { useTasks } from 'src/contexts/tasks.context';

import {
  TableContainer,
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Heading,
  Button,
  Box,
} from '@chakra-ui/react';

function TaskList() {
  const { tasksState, tasksDispatch } = useTasks();

  const deleteTask = task => {
    tasksDispatch({ type: 'DELETE_TASK', payload: { task } });
  };

  const toggleTask = task => {
    tasksDispatch({
      type: 'MARK_DONE',
      payload: { task, status: !task.status },
    });
  };

  const setCurrentTask = task => {
    tasksDispatch({ type: 'SET_CURRENT_TASK', payload: { task } });
  };

  return (
    <Box>
      <Heading>List of Tasks</Heading>
      <TableContainer>
        <Table variant="simple" colorScheme="teal" size={'md'}>
          <TableCaption>
            List of planned tasks and their Pomodro estimate
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th isNumeric>multiply by * 1 Pomodoro Time</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasksState.tasks?.map((task, index) => (
              <Tr key={index} onClick={() => toggleTask(task)}>
                <Td>{task.title}</Td>
                <Td>{task.description}</Td>
                <Td>{task.pomodoro}</Td>
                <Td>{task?.status ? 'Done' : 'ToDo'}</Td>
                <Td>
                  <Button onClick={() => deleteTask(task)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TaskList;
