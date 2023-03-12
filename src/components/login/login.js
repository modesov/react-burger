import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import loginStyle from './login.module.css';
import { authorization, resetAuth } from '../../services/actions/auth';
import { selectorAuth } from '../../services/selectors';
import Loader from '../loader/Loader';
import { useForm } from '../../hooks/use-form';

function Login() {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector(selectorAuth);
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const onChange = (event) => {
    if (hasError) {
      dispatch(resetAuth());
    }
    handleChange(event);
  }

  const login = (event) => {
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
          error={hasError}
          errorText='Неверный логин или пароль'
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
