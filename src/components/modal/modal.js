import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyle from './modal.module.css';

const modalRoot = document.getElementById('modals');

function Modal({ children, onClose, title = '' }) {
    const onCloseEsc = ({ key }) => {
        if (key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', onCloseEsc);

        return () => document.removeEventListener('keyup', onCloseEsc);
    }, []);

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
