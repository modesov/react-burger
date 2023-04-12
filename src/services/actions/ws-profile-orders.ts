import { WSOrdersType } from '../../utils/types';
import {
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_GET_MESSAGE
} from '../constants';

export interface IWSProfileOrdersConnectionStartAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_START;
}

export interface IWSProfileOrdersConnectionSuccessAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_SUCCESS;
}

export interface IWSProfileOrdersConnectionErrorAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSProfileOrdersConnectionClosedAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSED;
}

export interface IWSProfileOrdersGetMessageAction {
  readonly type: typeof WS_PROFILE_ORDERS_GET_MESSAGE;
  readonly payload: WSOrdersType;
}

export type TWSProfileOrdersActions =
  | IWSProfileOrdersConnectionStartAction
  | IWSProfileOrdersConnectionSuccessAction
  | IWSProfileOrdersConnectionErrorAction
  | IWSProfileOrdersConnectionClosedAction
  | IWSProfileOrdersGetMessageAction;

export const wsProfileOrdersConnectionStart = (): IWSProfileOrdersConnectionStartAction => ({
  type: WS_PROFILE_ORDERS_CONNECTION_START,
});

export const wsProfileOrdersConnectionClosed = (): IWSProfileOrdersConnectionClosedAction => ({
  type: WS_PROFILE_ORDERS_CONNECTION_CLOSED,
});