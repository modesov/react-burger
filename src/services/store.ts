import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { TWSStoreActions } from '../utils/types';
import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_GET_MESSAGE,
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_GET_MESSAGE
} from './constants';
import { socketMiddleware } from './middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsProfileUrl: string = 'wss://norma.nomoreparties.space/orders';

const wsOrdersActions: TWSStoreActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_GET_MESSAGE
};

const wsProfileOrdersActions: TWSStoreActions = {
  wsInit: WS_PROFILE_ORDERS_CONNECTION_START,
  onOpen: WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  onError: WS_PROFILE_ORDERS_CONNECTION_ERROR,
  onMessage: WS_PROFILE_ORDERS_GET_MESSAGE
};

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsOrdersActions),
    socketMiddleware(wsProfileUrl, wsProfileOrdersActions, true)
  )
));
