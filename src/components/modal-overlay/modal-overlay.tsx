import { FC } from 'react';

import modalOverlayStyle from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => (<div onClick={onClose} className={modalOverlayStyle.overlay}></div>);

export default ModalOverlay;
