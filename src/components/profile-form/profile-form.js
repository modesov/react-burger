import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import profileFormStyle from './profile-form.module.css';
import { selectorUser } from '../../services/selectors';
import { updateUser } from '../../services/actions/auth';

function ProfileForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectorUser);
  const initialState = {
    name: user.name,
    email: user.email,
    password: '',
  }
  const [fields, setFields] = useState(initialState);
  const [showButton, setShowButton] = useState(false);

  const onChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });

    setShowButton(true);
  }

  const onSave = (e) => {
    dispatch(updateUser(fields));
  }

  const onCancel = (e) => {
    setFields(initialState);
    setShowButton(false);
  }

  return (
    <div className={profileFormStyle.box}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        name={'name'}
        value={fields.name}
        extraClass="mb-6"
        icon="EditIcon"
        onChange={onChange}
      />
      <EmailInput
        placeholder="Логин"
        name={'email'}
        value={fields.email}
        isIcon={true}
        extraClass="mb-6"
        onChange={onChange}
      />
      <PasswordInput
        name={'password'}
        value={fields.password}
        icon="EditIcon"
        onChange={onChange}
      />
      {showButton &&
        (<div className={profileFormStyle.buttons}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mb-20"
            onClick={onSave}
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

    </div>
  );
}

export default ProfileForm;
