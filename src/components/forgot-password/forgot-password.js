import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import forgotPasswordStyle from './forgot-password.module.css';
import { API_BASE_URL, checkResponse } from '../../services/api'
import { selectorUser } from '../../services/selectors';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const user = useSelector(selectorUser);
  const navigate = useNavigate();
  const location = useLocation();

  const sendEmail = () => {
    fetch(`${API_BASE_URL}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email: email })
    })
      .then(checkResponse)
      .then(data => {
        if (data.success) {
          navigate('/reset-password', { replace: true, state: {from: location} });
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

    setEmail(e.target.value);
  }

  if (user) {
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
      <EmailInput
        placeholder={'Укажите e-mail'}
        name={'email'}
        extraClass="mb-6"
        value={email}
        onChange={onChange}
        error={isError}
        errorText="Ошибка восстановления пароля. Попробуйте еще раз"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={sendEmail}
      >
        Восстановить
      </Button>
      <p className="mb-4 text text_type_main-default">
        Вспомнили пароль?
        <Link to="/login" className={`${forgotPasswordStyle.link} ml-2`}>Войти</Link>
      </p>
    </>
  );
}

export default ForgotPassword;
