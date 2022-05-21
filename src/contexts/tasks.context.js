import React, { createContext, useContext, useReducer } from 'react';
import { tasksReducer, initialState } from 'src/reducers/tasks.reducer';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasksState, tasksDispatch] = useReducer(tasksReducer, initialState);
  return (
    <TasksContext.Provider value={{ tasksState, tasksDispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
const useTasks = () => useContext(TasksContext);

export { TasksProvider, useTasks };
