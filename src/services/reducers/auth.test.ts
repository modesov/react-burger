import { getAuthErrorAction, getAuthRequestAction, getAuthSuccessAction, getResetAuthAction } from "../actions/auth";
import auth, { initialState } from "./auth";
import { AuthUserType } from '../../utils/types'

const userData: AuthUserType = {
  email: 'ms@yandex.ru',
  name: 'Тест'
}

describe('order reducer', () => {
  test('should return the initial state auth', () => {
    expect(auth(undefined, null))
      .toEqual(initialState);
  });

  test('should work out AUTH_REQUEST correctly', () => {
    const action = getAuthRequestAction();

    expect(auth(initialState, action)).toEqual({ ...initialState, isLoading: true });
  });

  test('should work out AUTH_SUCCESS correctly', () => {
    const action = getAuthSuccessAction(userData);

    expect(auth(initialState, action)).toEqual({ ...initialState, user: userData });
  });

  test('should work out AUTH_ERROR correctly', () => {
    const action = getAuthErrorAction();

    expect(auth(initialState, action)).toEqual({ ...initialState, hasError: true });
  });

  test('should work out RESET_AUTH correctly', () => {
    const action = getResetAuthAction();

    expect(auth({...initialState, user: userData}, action)).toEqual(initialState);
  });
});