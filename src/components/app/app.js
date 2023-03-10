import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../../hoc/protected-route';
import ProfileForm from '../profile-form/profile-form';
import ProfileOrders from '../profile-orders/profile-orders';
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/auth';
import { selectorDetailsIngredient } from '../../services/selectors';
import { cleanDetailsIngredient } from '../../services/actions/details-ingredient';
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, []);

  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;
    const detailsIngredient = useSelector(selectorDetailsIngredient);

    const handleModalClose = () => {
      dispatch(cleanDetailsIngredient());
      navigate(-1);
    };

    return (
      <div className={appStyle.app}>
        <AppHeader />
        <main className='pr-5 pl-5'>
          <div className={`container ${appStyle.mainContainer}`}>
            <Routes location={background || location}>
              <Route path='/' element={<MainPage />} />
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
              </Route>
              <Route path='/ingredients/:idIngredient' element={<IngredientDetailsPage />} />
              <Route path='*' element={<NotFound404 />} />
            </Routes>
            {background && detailsIngredient && (
              <Routes>
                <Route
                  path='/ingredients/:idIngredient'
                  element={
                    <Modal onClose={handleModalClose} title='Детали ингредиента'>
                      <IngredientDetails detailsIngredient={detailsIngredient} />
                    </Modal>
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
