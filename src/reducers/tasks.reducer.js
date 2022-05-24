const tasks = [
  {
    title: 'Implement Custom hook',
    id: 1234,
    description: 'Implement custom hook for infinite scroll',
    status: false,
    pomodoro: 1,
  },
  {
    title: 'Perform Unit tests',
    id: 1235,
    description: 'Add Unit Tests for React Components',
    status: false,
    pomodoro: 5,
  },
  {
    title: 'Integrate Redux Toolkit',
    id: 126,
    description: 'Add Redux tool integration for Pomodoro App',
    status: false,
    pomodoro: 3,
  },
];

export const initialState = {
  tasks: tasks,
  activeTask: null,
};

export const tasksReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CURRENT_TASK': {
      const { task } = payload;
      return {
        ...state,
        activeTask: task,
      };
    }

    case 'ADD_TASK': {
      const { task } = payload;
      const id = +new Date();
      return { ...state, tasks: [...state.tasks, { ...task, id }] };
    }

    case 'EDIT_TASK': {
      const { task, id } = payload;
      const tasks = state.tasks.map(item => {
        return item.id === id ? { ...item, ...task } : item;
      });
      return {
        ...state,
        tasks,
      };
    }

    case 'DELETE_TASK': {
      const { task } = payload;
      return {
        ...state,
        activeTask: null,
        tasks: state.tasks.filter(({ id }) => id !== task.id),
      };
    }

    case 'MARK_DONE': {
      const { task, status = true } = payload;
      return {
        ...state,
        activeTask: null,
        tasks: state.tasks.map(item =>
          item.id === task.id ? { ...item, status } : item
        ),
      };
    }
    default:
      throw new Error(`Invalid action type ${type}`);
  }
};
