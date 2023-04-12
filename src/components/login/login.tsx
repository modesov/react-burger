import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import loginStyle from './login.module.css';
import { authorization, getResetAuthAction } from '../../services/actions/auth';
import { selectorAuth } from '../../services/selectors';
import Loader from '../loader/Loader';
import { useForm } from '../../hooks/use-form';
import { UserLoginType } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/hooks';

const Login: FC = () => {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector(selectorAuth);
  const { values, handleChange } = useForm<UserLoginType>({
    email: '',
    password: ''
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) {
      dispatch(getResetAuthAction());
    }
    handleChange(event);
  }

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authorization(values));
  }

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <form onSubmit={login}>
        <EmailInput
          name={'email'}
          value={values.email}
          extraClass="mb-6"
          onChange={onChange}
        />
        <PasswordInput
          name={'password'}
          value={values.password}
          extraClass="mb-6"
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      {hasError && <div>Неверный логин или пароль</div>}
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
