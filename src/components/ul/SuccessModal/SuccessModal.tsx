import { Button, Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import styles from './SuccessModal.module.scss';
import { ReactNode } from 'react';
import CompletedSVG from '../../svg/CompletedSVG/CompletedSVG';

interface SuccessModalProps extends ModalProps {
    title: string;
    content: ReactNode;
}

const SuccessModal = ({ title, content, open, onCancel, ...props }: SuccessModalProps) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            footer={props.footer || [
                <Button
                    type='primary'
                    key="close"
                    onClick={onCancel}
                    className={styles.modalButton}
                >
                    Close
                </Button>
            ]}
            className={styles.successModal}
            centered
        >
            <CompletedSVG />
            <div className={styles.modalContent}>
                {content}
            </div>
        </Modal>
    );
};

export default SuccessModal;