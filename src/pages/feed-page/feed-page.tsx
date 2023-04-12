import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { selectorWSOrders } from '../../services/selectors';
import { wsOrdersConnectionClosed, wsOrdersConnectionStart } from '../../services/actions/ws-orders';
import Notification from '../../components/notification/notification';
import Loader from '../../components/loader/Loader';

export const FeedPage: FC = () => {
  const { wsConnected, data, error } = useSelector(selectorWSOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsOrdersConnectionStart());

    return function closed() {
      dispatch(wsOrdersConnectionClosed())
    };
  }, []);

  return (
    <>
      {error && <Notification type='error' onClose={() => dispatch(wsOrdersConnectionClosed())}>Ошибка соединения!</Notification>}
      {wsConnected && data
        ?
        <Outlet />
        :
        !wsConnected && !error && <Loader />
      }
    </>

  );
}
