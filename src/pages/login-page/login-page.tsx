import { FC } from 'react';
import Login from '../../components/login/login';
import CenterBox from '../../components/UI/center-box/center-box';

export const LoginPage: FC = () => {
  return (
    <CenterBox>
      <Login />
    </CenterBox>
  );
}
