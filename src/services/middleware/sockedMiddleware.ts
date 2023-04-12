import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootStateType, TApplicationActions, TWSStoreActions, WSOrdersResponseType } from "../../utils/types";


export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions, authorizationNeeded: boolean = false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootStateType>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
      if (type === wsInit) {
        if (authorizationNeeded && accessToken) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else if (!authorizationNeeded) {
          socket = new WebSocket(wsUrl);
        }        
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: WSOrdersResponseType = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }      
      next(action);
    };
  }) as Middleware;
};