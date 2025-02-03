import { useState } from 'react';
import { Modal } from 'antd';
import styles from './ModalSelect.module.scss';
import { CaretDownOutlined } from '@ant-design/icons';
import { Coin } from '../../../api/services/coin/coinType';
import CurrencyLogo from '../../shared/CurrencyLogo/CurrencyLogo';


interface ModalSelectProps {
    options: Coin[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string
    symbol: string
}

// TODO MAKE MODE DYNAMIC
// UNFORTUNATELY, I DIDN'T HAVE ENOUGH TIME. THIS COMPONENT IS CURRENTLY A NOT RE USABLE (NOT GENERAL).
const ModalSelect = ({ options, value, onChange, symbol, ...props }: ModalSelectProps) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [, setSelectedOption] = useState<Coin | undefined>(
    //     () => options.find(opt => opt.symbol === value)
    // );

    const handleOptionSelect = (option: Coin) => {
        // setSelectedOption(option);
        onChange?.(option.symbol);
        setIsModalOpen(false);
    };


    return (
        <div className={styles.modalSelectContainer}>
            <div
                onClick={() => setIsModalOpen(true)}
                className={styles.selectedOption}>
                <CurrencyLogo className={styles.coinLogo} id={symbol} alt={symbol} />
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
                            <CurrencyLogo className={styles.coinLogo} id={option.symbol} alt={option.symbol} />
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