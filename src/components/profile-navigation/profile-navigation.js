import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import profileNavigationStyle from './profile-navigation.module.css';
import { logout } from '../../services/actions/auth';

const setActive = ({ isActive }) => `${profileNavigationStyle.link} ${isActive && profileNavigationStyle.active}`;

function ProfileNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate('/login', {replace: true});
  }

  return (
    <div className={profileNavigationStyle.box}>
      <ul className={profileNavigationStyle.list}>
        <li className="text text_type_main-medium">
          <NavLink
            to=""
            className={setActive}
          >
            Профиль
          </NavLink>
        </li>
        <li className="text text_type_main-medium">
          <NavLink
            to="orders"
            className={setActive}
          >
            История заказов
          </NavLink>
        </li>
        <li className="text text_type_main-medium">
          <button className={`text text_type_main-medium ${profileNavigationStyle.btnLogout}`}
            onClick={onLogout}
          >
            Выход
          </button>
        </li>
      </ul>
      <div className={profileNavigationStyle.info}>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  );
}

export default ProfileNavigation;
