import { AuthUserType } from '../../utils/types';
import { TAuthActions } from '../actions/auth';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  RESET_AUTH
} from '../constants';

type TAuthState = {
  isLoading: Boolean;
  hasError: Boolean;
  user: AuthUserType | null;
}

const initialState: TAuthState = {
  isLoading: false,
  hasError: false,
  user: null
}

const auth = (state = initialState, action: TAuthActions): TAuthState => {
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
