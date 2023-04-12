import { FC, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import profilePageStyle from './profile-page.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { selectorWSProfileOrders } from '../../services/selectors';
import { wsProfileOrdersConnectionClosed, wsProfileOrdersConnectionStart } from '../../services/actions/ws-profile-orders';
import Notification from '../../components/notification/notification';
import Loader from '../../components/loader/Loader';

export const ProfilePage: FC = () => {
  const { wsConnected, data, error } = useSelector(selectorWSProfileOrders);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsProfileOrdersConnectionStart());

    return function closed() {
      dispatch(wsProfileOrdersConnectionClosed());
    };
  }, []);

  return (
    <>
      {error && <Notification type='error' onClose={() => dispatch(wsProfileOrdersConnectionClosed())}>Ошибка соединения!</Notification>}
      {!id
        ?
        (<div className={profilePageStyle.content}>
          <ProfileNavigation />
          <Outlet />
        </div>)
        :
        wsConnected && data
          ?
          <Outlet />
          :
          !wsConnected && !error && <Loader />
      }
    </>
  );
}
