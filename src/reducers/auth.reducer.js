export const initialState = {
  user: null,
  isLoggedIn: false,
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'DO_LOGIN': {
      const { firstName, lastName, email, username, _id } = payload;
      return {
        ...state,
        isLoggedIn: true,
        user: { firstName, lastName, email, username, _id },
      };
    }
    case 'DO_SOCIAL_LOGIN': {
      const { displayName, email, uid, photoURL } = payload;
      const name = displayName.split(' ');
      return {
        ...state,
        isLoggedIn: true,
        user: {
          firstName: name[0],
          lastName: name[1],
          email,
          _id: uid,
          photoURL,
        },
      };
    }
    case 'DO_LOGOUT':
      return initialState;

    default:
      throw new Error(`Invalid action type ${type}`);
  }
};
