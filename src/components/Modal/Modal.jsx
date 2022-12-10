import { useEffect } from 'react';
import { Backdrop, Modal } from './Modal.styled.js';

export default function ModalWindow({ image, onClose }) {
  useEffect(() => {
    const handleWindowKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleWindowKeydown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeydown);
    };
  }, [onClose]);

  const closeBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Backdrop onClick={closeBackdrop}>
      <Modal>
        <img src={image} alt="" />
      </Modal>
    </Backdrop>
  );
}
