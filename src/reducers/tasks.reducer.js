export const initialState = {
  tasks: [],
  activeTask: null,
};

export const tasksReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CURRENT_TASK': {
      const { task } = payload;
      return {
        ...state,
        currentTask: task,
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
