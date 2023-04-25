import { WSOrdersType } from '../../utils/types';
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE
} from '../constants';

export interface IWSOrdersConnectionStartAction {
  readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IWSOrdersConnectionSuccessAction {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IWSOrdersConnectionErrorAction {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}

export interface IWSOrdersConnectionClosedAction {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IWSOrdersGetMessageAction {
  readonly type: typeof WS_ORDERS_GET_MESSAGE;
  readonly payload: WSOrdersType;
}

export type TWSOrdersActions =
  | IWSOrdersConnectionStartAction
  | IWSOrdersConnectionSuccessAction
  | IWSOrdersConnectionErrorAction
  | IWSOrdersConnectionClosedAction
  | IWSOrdersGetMessageAction;

export const wsOrdersConnectionStart = (): IWSOrdersConnectionStartAction => ({
  type: WS_ORDERS_CONNECTION_START,
});

export const wsOrdersConnectionClosed = (): IWSOrdersConnectionClosedAction => ({
  type: WS_ORDERS_CONNECTION_CLOSED,
});