import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useKeyPress } from '../../hooks/use-key-press';

const modalRoot = document.getElementById('modals');

function Modal({ children, onClose, title = '' }) {
  useKeyPress('Escape', onClose);

  return ReactDOM.createPortal(
    (
      <>
        <div className={modalStyle.container}>
          <div className={`${modalStyle.modalBox} pt-10 pr-10 pb-15 pl-10`}>
            <button onClick={onClose} className={modalStyle.btnClose}><CloseIcon type="primary" /></button>
            <div className={`${modalStyle.header} text text_type_main-large mr-15`}>
              {title}
            </div>
            {children}
          </div>
        </div>

        <ModalOverlay onClose={onClose} />
      </>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Modal;
