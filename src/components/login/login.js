import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import loginStyle from './login.module.css';
import { authorization, resetAuth } from '../../services/actions/auth';
import { selectorAuth } from '../../services/selectors';
import Loader from '../loader/Loader';

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, hasError, user } = useSelector(selectorAuth);
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const fromPage = location.state?.from?.pathname || '/';

  const onChange = (e) => {
    if (hasError) {
      dispatch(resetAuth());
    }
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  const login = () => {
    dispatch(authorization(fields));
  }

  if (user) {
    return (
      <Navigate
        to={fromPage}
        replace
      />
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <EmailInput
        name={'email'}
        value={fields.email}
        extraClass="mb-6"
        onChange={onChange}
      />
      <PasswordInput
        name={'password'}
        value={fields.password}
        extraClass="mb-6"
        onChange={onChange}
        error={hasError}
        errorText='Неверный логин или пароль'
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={login}
      >
        Войти
      </Button>
      <p className="mb-4 text text_type_main-default">
        Вы — новый пользователь?
        <Link to="/register" className={`${loginStyle.link} ml-2`}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль?
        <Link to="/forgot-password" className={`${loginStyle.link} ml-2`}>Восстановить пароль</Link>
      </p>
    </>
  );
}

export default Login;
