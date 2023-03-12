import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import forgotPasswordStyle from './forgot-password.module.css';
import { requestForgotPassword } from '../../services/api'
import { useForm } from '../../hooks/use-form';
import Loader from '../loader/Loader';

function ForgotPassword() {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useForm({ email: '' });

  const sendEmail = (event) => {
    event.preventDefault();
    setLoading(true);
    requestForgotPassword(values.email)
      .then(() => {
        navigate('/reset-password', { replace: true, state: { from: location } });
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  const onChange = (event) => {
    if (isError) {
      setError(false);
    }

    handleChange(event);
  }

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <form onSubmit={sendEmail}>
        <EmailInput
          placeholder={'Укажите e-mail'}
          name={'email'}
          extraClass="mb-6"
          value={values.email}
          onChange={onChange}
          error={isError}
          errorText="Ошибка восстановления пароля. Попробуйте еще раз"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </form>
      <p className="mb-4 text text_type_main-default">
        Вспомнили пароль?
        <Link to="/login" className={`${forgotPasswordStyle.link} ml-2`}>Войти</Link>
      </p>
    </>
  );
}

export default ForgotPassword;
