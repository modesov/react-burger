import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  RESET_AUTH
} from '../constants';

const initialState = {
  isLoading: false,
  hasError: false,
  user: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...initialState,
        user: action.user
      };
    }
    case AUTH_ERROR: {
      return {
        ...initialState,
        hasError: true
      };
    }
    case RESET_AUTH: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}

export default auth;
