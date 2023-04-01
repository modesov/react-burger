import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import profileFormStyle from './profile-form.module.css';
import { selectorUser } from '../../services/selectors';
import { updateUser } from '../../services/actions/auth';
import { useForm } from '../../hooks/use-form';
import { UserType } from '../../utils/types';

const ProfileForm: FC = () => {
  const dispatch = useDispatch<any>();
  const user = useSelector(selectorUser);
  const initialState = {
    name: user.name,
    email: user.email,
    password: '',
  }
  const { values, handleChange, setValues } = useForm<UserType>(initialState);
  const [showButton, setShowButton] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setShowButton(true);
  }

  const onSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser(values));
  }

  const onCancel = () => {
    setValues({ ...initialState });
    setShowButton(false);
  }

  return (
    <div className={profileFormStyle.box}>
      <form onSubmit={onSave}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={values.name}
          extraClass="mb-6"
          icon="EditIcon"
          onChange={onChange}
        />
        <EmailInput
          placeholder="Логин"
          name={'email'}
          value={values.email}
          isIcon={true}
          extraClass="mb-6"
          onChange={onChange}
        />
        <PasswordInput
          name={'password'}
          value={values.password}
          icon="EditIcon"
          onChange={onChange}
        />
        {showButton &&
          (<div className={profileFormStyle.buttons}>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              extraClass="mb-20"
              onClick={onCancel}
            >
              Отменить
            </Button>
          </div>)}
      </form>
    </div>
  );
}

export default ProfileForm;
