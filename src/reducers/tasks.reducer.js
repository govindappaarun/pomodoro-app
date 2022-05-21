const tasks = [
  {
    title: 'test',
    id: 1234,
    description: 'test sdasd',
    status: false,
    pomodro: 1,
  },
  {
    title: 'test 1344',
    id: 1235,
    description: 'test sdasd',
    status: false,
    pomodro: 1,
  },
  {
    title: 'test 125',
    id: 126,
    description: 'test sdasd',
    status: false,
    pomodro: 1,
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

    case 'DELETE_TASK': {
      const { task } = payload;
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== task.id),
      };
    }

    case 'MARK_DONE': {
      const { task, status = true } = payload;
      return {
        ...state,
        tasks: state.tasks.map(item =>
          item.id === task.id ? { ...item, done: status } : item
        ),
      };
    }

    default:
      throw new Error(`Invalid action type ${type}`);
  }
};
