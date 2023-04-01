import { ChangeEvent, FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import registerStyle from './register.module.css';
import { authorization, resetAuth } from '../../services/actions/auth';
import { selectorAuth } from '../../services/selectors';
import Loader from '../loader/Loader';
import { useForm } from '../../hooks/use-form';
import { UserType } from '../../utils/types';

const Register: FC = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, hasError } = useSelector(selectorAuth);
  const { values, handleChange } = useForm<UserType>({
    name: '',
    email: '',
    password: ''
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (hasError) {
      dispatch(resetAuth());
    }
    handleChange(event);
  }

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authorization(values, 'register'));
  }

  return (
    <>
      {isLoading && <Loader />}
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <form onSubmit={register}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={values.name}
          extraClass="mb-6"
          onChange={onChange}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="mb-4 text text_type_main-default">
        Уже зарегистрированы?
        <Link to="/login" className={`${registerStyle.link} ml-2`}>Войти</Link>
      </p>
    </>
  );
}

export default Register;
