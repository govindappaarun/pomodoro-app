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
  Checkbox,
} from '@chakra-ui/react';

import { RiDeleteBin6Line, RiEditBoxLine } from 'react-icons/ri';
import clsx from 'clsx';
import styled from '@emotion/styled';

const StyledRow = styled(Tr)`
  cursor: pointer;
  &.task-active {
    background-color: lightgreen;
    color: white;
  }

  &.task-done {
    text-decoration: line-through;
  }
`;

function TaskList({ onEdit, showEdit = false, ...props }) {
  const { tasksState, tasksDispatch } = useTasks();

  const deleteTask = (e, task) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete ?')) {
      tasksDispatch({ type: 'DELETE_TASK', payload: { task } });
    }
  };

  const editTask = (e, task) => {
    e.stopPropagation();
    if (onEdit) onEdit(task);
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
      <TableContainer overflowX={'auto'}>
        <Table variant="simple" colorScheme="teal" size={'md'}>
          <TableCaption>
            List of planned tasks and their Pomodro estimate
          </TableCaption>
          <Thead>
            <Tr>
              <Th> Select </Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th isNumeric>multiply by * 1 Pomodoro Time</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasksState.tasks?.map((task, index) => (
              <StyledRow
                className={clsx({
                  'task-done': task.status,
                  'task-active': tasksState.activeTask?.id === task.id,
                })}
                key={index}
                onClick={() => (!task.status ? setCurrentTask(task) : () => {})}
              >
                <Td>
                  <Checkbox
                    onChange={() => toggleTask(task)}
                    isChecked={task.status}
                  />
                </Td>
                <Td>{task.title}</Td>
                <Td>{task.description}</Td>
                <Td>{task.pomodoro}</Td>
                <Td>{task.status ? 'Done' : 'ToDo'}</Td>
                <Td>
                  {showEdit && (
                    <Button
                      leftIcon={<RiEditBoxLine />}
                      onClick={e => editTask(e, task)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    leftIcon={<RiDeleteBin6Line />}
                    onClick={e => deleteTask(e, task)}
                  >
                    Delete
                  </Button>
                </Td>
              </StyledRow>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TaskList;
