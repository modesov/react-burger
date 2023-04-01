import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import resetPasswordStyle from './reset-password.module.css';
import { requestResetPassword } from '../../services/api';
import { useForm } from '../../hooks/use-form';
import Loader from '../loader/Loader';
import { ResetPasswordType } from '../../utils/types';

const ResetPassword: FC = () => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange } = useForm<ResetPasswordType>({
    password: '',
    token: ''
  });

  const resetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    requestResetPassword(values)
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isError) {
      setError(false);
    }

    handleChange(event);
  }

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <form onSubmit={resetPassword}>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          name={'password'}
          extraClass="mb-6"
          value={values.password}
          onChange={onChange}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'token'}
          extraClass="mb-6"
          value={values.token}
          onChange={onChange}
          error={isError}
          errorText={'Ошибка сброса пароля. Попробуйте еще раз'}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </form>
      <p className="mb-4 text text_type_main-default">
        Вспомнили пароль?
        <Link to="/login" className={`${resetPasswordStyle.link} ml-2`}>Войти</Link>
      </p>
    </>
  );
}

export default ResetPassword;
