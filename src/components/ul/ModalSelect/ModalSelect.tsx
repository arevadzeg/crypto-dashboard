import { useState } from 'react';
import { Modal } from 'antd';
import styles from './ModalSelect.module.scss';
import { CaretDownOutlined } from '@ant-design/icons';
import { Coin } from '../../../api/services/coin/coinType';


interface ModalSelectProps {
    options: Coin[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string
}

// TODO MAKE MODE DYNAMIC

const ModalSelect = ({ options, value, onChange, ...props }: ModalSelectProps) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Coin | undefined>(
        () => options.find(opt => opt.symbol === value)
    );

    const handleOptionSelect = (option: Coin) => {
        setSelectedOption(option);
        onChange?.(option.symbol);
        setIsModalOpen(false);
    };


    if (!selectedOption) {
        // TODO NEED TO MAKE LOADER
        return <div>LOADING...</div>
    }

    return (
        <div className={styles.modalSelectContainer}>
            <div
                onClick={() => setIsModalOpen(true)}
                className={styles.selectedOption}>
                <img className={styles.coinLogo} src='https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/bitcoin/assets/btcs/logo.png' />
                {value}
                <CaretDownOutlined className={styles.caretIcon} />
            </div>

            <Modal
                title={props.placeholder}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                className={styles.selectionModal}
            >
                <ul className={styles.optionsList}>
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className={styles.optionItem}
                            onClick={() => handleOptionSelect(option)}
                        >
                            <img className={styles.coinLogo} src='https://raw.githubusercontent.com/trustwallet/assets/refs/heads/master/blockchains/bitcoin/assets/btcs/logo.png' />
                            <div className={styles.optionDetails}>
                                <span className={styles.optionLabel}>{option.symbol}</span>
                                <span className={styles.optionValue}>{option.id}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default ModalSelect;