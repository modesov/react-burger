import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import registerStyle from './register.module.css';
import { authorization, resetAuth } from '../../services/actions/auth';
import { selectorAuth } from '../../services/selectors';
import Loader from '../loader/Loader';

function Register() {
  const dispatch = useDispatch();
  const { isLoading, hasError, user } = useSelector(selectorAuth);
  const [fields, setFields] = useState({
    email: '',
    password: '',
    name: ''
  });

  const onChange = (e) => {
    if (hasError) {
      dispatch(resetAuth());
    }
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  const register = () => {
    dispatch(authorization(fields, 'register'));
  }

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <Input
        type={'text'}
        placeholder={'Имя'}
        name={'name'}
        value={fields.name}
        extraClass="mb-6"
        onChange={onChange}
      />
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
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={register}
      >
        Зарегистрироваться
      </Button>
      <p className="mb-4 text text_type_main-default">
        Уже зарегистрированы?
        <Link to="/login" className={`${registerStyle.link} ml-2`}>Войти</Link>
      </p>
    </>
  );
}

export default Register;
