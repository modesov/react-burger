import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import resetPasswordStyle from './reset-password.module.css';
import { API_BASE_URL, checkResponse } from '../../services/api'
import { selectorUser } from '../../services/selectors';

function ResetPassword() {
  const [fields, setFields] = useState({
    password: '',
    token: ''
  });
  const [isError, setIsError] = useState(false);
  const user = useSelector(selectorUser);
  const navigate = useNavigate();
  const location = useLocation();

  const resetPassword = () => {
    fetch(`${API_BASE_URL}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(fields)
    })
      .then(checkResponse)
      .then(data => {
        if (data.success) {
          navigate('/login', { replace: true });
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
  }

  const onChange = (e) => {
    if (isError) {
      setIsError(false);
    }

    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  if (user || location.state?.from?.pathname !== '/forgot-password') {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return (
    <>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <PasswordInput
        placeholder={'Введите новый пароль'}
        name={'password'}
        extraClass="mb-6"
        value={fields.password}
        onChange={onChange}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        name={'token'}
        extraClass="mb-6"
        value={fields.token}
        onChange={onChange}
        error={isError}
        errorText={'Ошибка сброса пароля. Попробуйте еще раз'}
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={resetPassword}
      >
        Сохранить
      </Button>
      <p className="mb-4 text text_type_main-default">
        Вспомнили пароль?
        <Link to="/login" className={`${resetPasswordStyle.link} ml-2`}>Войти</Link>
      </p>
    </>
  );
}

export default ResetPassword;
