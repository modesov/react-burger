import { Outlet } from 'react-router-dom';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import profilePageStyle from './profile-page.module.css';

export const ProfilePage = () => {
  return (
    <div className={profilePageStyle.content}>
      <ProfileNavigation />
      <Outlet />
    </div>
  );
}
