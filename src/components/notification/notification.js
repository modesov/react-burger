import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import notificationStyle from './notification.module.css';
import { useKeyPress } from '../../hooks/use-key-press';

const boxNotification = document.getElementById('notification');

function Notification({ children, type, onClose, lifetime = 5000 }) {
  useKeyPress('Escape', onClose);

  useEffect(() => {
    const timerId = setTimeout(onClose, lifetime);

    return () => clearTimeout(timerId);
  }, [onClose]);

  return ReactDOM.createPortal(
    (
      <div className={notificationStyle.boxNotification}>
        <button onClick={onClose} className={notificationStyle.btnClose}><CloseIcon type="primary" /></button>
        <div className={`${notificationStyle.content} p-5 pr-8 ${notificationStyle[type]}`}>
          {children}
        </div>
      </div>
    ),
    boxNotification
  );
}

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  lifetime: PropTypes.number
}

export default Notification;
