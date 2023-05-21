import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStd } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, largePhoto }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <>
      <Overlay onClick={handleBackdropClick}>
        <ModalStd>
          <img src={largePhoto} alt="" />
        </ModalStd>
      </Overlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largePhoto: PropTypes.string.isRequired,
};

export default Modal;
