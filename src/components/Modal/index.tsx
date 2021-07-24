import React, { useCallback, useRef } from 'react';

import { Container, ModalBody, ModalTitle } from './styles';

interface ModalProps {
  show?: boolean;
  showTitle?: boolean;
  showFooter?: boolean;
  isLoading?: boolean;
  handleClose(): void;
  handleConfirm?(): void;
}

const Modal: React.FC<ModalProps> = ({
  show,
  showTitle,
  showFooter,
  isLoading,
  handleClose,
  handleConfirm,
  children,
}) => {
  const modalRef = useRef(null);
  const handleClick = useCallback(
    e => {
      if (e === modalRef.current) {
        handleClose();
      }
    },
    [handleClose],
  );
  return (
    <Container
      show={show}
      ref={modalRef}
      onClick={e => handleClick(e.target)}
      data-testid="delete-modal"
    >
      <ModalBody>
        {showTitle ? <ModalTitle>AVISO</ModalTitle> : null}
        {children}
        {showFooter ? (
          <footer>
            <button
              type="button"
              onClick={handleClose}
              data-testid="btn-close-modal"
            >
              NÃO
            </button>
            {handleConfirm ? (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                data-testid="btn-confirm-modal"
              >
                SIM
              </button>
            ) : null}
          </footer>
        ) : null}
      </ModalBody>
    </Container>
  );
};

export default Modal;
