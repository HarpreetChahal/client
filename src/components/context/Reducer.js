const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        token: null,
        error: false
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        token: action.token,
        error: false
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        token: null,
        isFetching: false,
        error: true
      };
    case "LOGOUT": {
      return {
        user: null,
        token: null,
        isFetching: false,
        error: false
      };
    }
    case "UPDATE_USER":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        token: state.token
      };
    default:
      return state;
  }
};

export default Reducer;
