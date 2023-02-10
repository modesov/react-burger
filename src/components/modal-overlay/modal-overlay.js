import PropTypes from 'prop-types';

import modalOverlayStyle from './modal-overlay.module.css';

const ModalOverlay = ({onClose}) => (<div onClick={onClose} className={modalOverlayStyle.overlay}></div>);

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}


export default ModalOverlay;
