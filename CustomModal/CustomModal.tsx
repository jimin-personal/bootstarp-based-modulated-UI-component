import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useCustomModalContext } from '@/contexts/CustomModalContext';

const CustomModal: React.FC = () => {
    const { isOpen, closeModal, modalData } = useCustomModalContext();
    const {
        modalBody,
        modalTitle,
        onSubmit,
        submitLabel,
        onCancel,
        cancelLabel,
        modalSize,
        backdrop,
        showCloseButton = true,
    } = modalData;
    const isDisplayButtonArea = (onSubmit && submitLabel) || (onCancel && cancelLabel);
    const handleClickCancelButton = () => {
        closeModal();
        onCancel?.();
    };

    const handleClickConfirmButton = () => {
        closeModal();
        onSubmit?.();
    };

    return (
        <BootstrapModal
            className="wallet-modal px-0"
            show={isOpen}
            onHide={() => {
                closeModal();
                onCancel?.();
            }}
            centered
            size={modalSize}
            backdrop={backdrop}
            keyboard={showCloseButton}
        >
            <BootstrapModal.Header closeButton={showCloseButton}>
                <BootstrapModal.Title as="h4">{modalTitle}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {modalBody}
                {isDisplayButtonArea && (
                    <div className="mt-3">
                        {onSubmit && submitLabel && (
                            <button
                                className={`default-btn text-center ${onCancel && 'mr2'}`}
                                onClick={handleClickConfirmButton}
                                type="button"
                                style={{ lineHeight: '40px' }}
                            >
                                {submitLabel}
                            </button>
                        )}
                        {onCancel && cancelLabel && (
                            <button
                                className="default-btn text-center"
                                onClick={handleClickCancelButton}
                                type="button"
                                style={{ lineHeight: '40px' }}
                            >
                                {cancelLabel}
                            </button>
                        )}
                    </div>
                )}
            </BootstrapModal.Body>
        </BootstrapModal>
    );
};

export default CustomModal;
