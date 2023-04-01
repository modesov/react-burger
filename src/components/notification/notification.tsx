import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import notificationStyle from './notification.module.css';
import { useKeyPress } from '../../hooks/use-key-press';

const boxNotification = document.getElementById('notification');

interface NotificationProps {
  children: ReactNode;
  type: string;
  onClose: () => void;
  lifetime?: number;
}

const Notification: FC<NotificationProps> = ({ children, type, onClose, lifetime = 5000 }) => {
  useKeyPress('Escape', onClose);

  useEffect(() => {
    const timerId = setTimeout(onClose, lifetime);

    return () => clearTimeout(timerId);
  }, [lifetime, onClose]);

  return boxNotification
    ? ReactDOM.createPortal(
      (
        <div className={notificationStyle.boxNotification}>
          <button onClick={onClose} className={notificationStyle.btnClose}><CloseIcon type="primary" /></button>
          <div className={`${notificationStyle.content} p-5 pr-8 ${notificationStyle[type]}`}>
            {children}
          </div>
        </div>
      ),
      boxNotification
    )
    : null;
}

export default Notification;
