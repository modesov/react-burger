import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../../hoc/protected-route';
import ProfileForm from '../profile-form/profile-form';
import ProfileOrders from '../profile-orders/profile-orders';
import { getIngredients } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/auth';
import {
  ForgotPasswordPage,
  IngredientDetailsPage,
  LoginPage,
  MainPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from '../../pages';
import { ModalDetailsIngredient } from '../modal-details-ingregient/modal-details-ingredient';
import { useDispatch } from '../../services/hooks';
import { FeedPage } from '../../pages/feed-page/feed-page';
import { Feed } from '../feed/feed';
import { FeedDetails } from '../feed-details/feed-details';
import ProfileOrderDetails from '../profile-order-details/profile-order-details';
import { ModalOrderDetails } from '../modal-order-details/modal-order-details';
import { selectorWSOrders, selectorWSProfileOrders } from '../../services/selectors';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, []);

  const ModalSwitch = () => {
    const location = useLocation();
    const background = location.state?.background;

    return (
      <div className={appStyle.app}>
        <AppHeader />
        <main className='pr-5 pl-5'>
          <div className={`container ${appStyle.mainContainer}`}>
            <Routes location={background ?? location}>
              <Route path='/' element={<MainPage />} />
              <Route path='/feed' element={<FeedPage />}>
                <Route path='' element={<Feed />} />
                <Route path=':id' element={<FeedDetails />} />
              </Route>
              <Route path='/login' element={
                <ProtectedRoute anonymous={true}>
                  <LoginPage />
                </ProtectedRoute>} />
              <Route path='/register' element={
                <ProtectedRoute anonymous={true}>
                  <RegisterPage />
                </ProtectedRoute>} />
              <Route path='/forgot-password' element={
                <ProtectedRoute anonymous={true}>
                  <ForgotPasswordPage />
                </ProtectedRoute>} />
              <Route path='/reset-password' element={
                <ProtectedRoute anonymous={true} onlyWith='/forgot-password'>
                  <ResetPasswordPage />
                </ProtectedRoute>} />
              <Route path='/profile' element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }>
                <Route path='' element={<ProfileForm />} />
                <Route path='orders' element={<ProfileOrders />} />
                <Route path='orders/:id' element={<ProfileOrderDetails />} />
              </Route>
              <Route path='/ingredients/:idIngredient' element={<IngredientDetailsPage />} />
              <Route path='*' element={<NotFound404 />} />
            </Routes>
            {background && (
              <Routes>
                <Route
                  path='/ingredients/:idIngredient'
                  element={
                    <ModalDetailsIngredient />
                  }
                />
                <Route
                  path='/feed/:id'
                  element={
                    <ModalOrderDetails selector={selectorWSOrders} />
                  }
                />
                <Route
                  path='/profile/orders/:id'
                  element={
                    <ProtectedRoute>
                      <ModalOrderDetails selector={selectorWSProfileOrders} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

export default App;
