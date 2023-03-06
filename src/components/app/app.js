import { BrowserRouter, Routes, Route } from 'react-router-dom';
import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import {
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from '../../pages';
import ProfileForm from '../profile-form/profile-form';
import ProfileOrders from '../profile-orders/profile-orders';

function App() {
  return (
    <div className={appStyle.app}>
      <BrowserRouter>
        <AppHeader />
        <main className='pr-5 pl-5'>
          <div className={`container ${appStyle.mainContainer}`}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/reset-password' element={<ResetPasswordPage />} />
              <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} />}>
                <Route path='' element={<ProfileForm />} />
                <Route path='orders' element={<ProfileOrders />} />
              </Route>
              <Route path='/ingredients/:id' element={<MainPage />} />
              <Route path='*' element={<NotFound404 />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
