import { useEffect, useMemo } from "react";
import { Coin } from "../../../api/services/coin/coinType";
import { useGetCoins } from "../../../api/services/coin/useGetCoins";
import { MAX_TRADE_AMOUNT_IN_USD, MIN_TRADE_AMOUNT_IN_USD } from "../../../constants/constants";
import formatMinMaxValue from "../../../utils/formatMinMaxValue";
import InvisibleInput from "../../ul/InvisibleInput/InvisibleInput";
import ModalSelect from "../../ul/ModalSelect/ModalSelect";
import styles from './converionCard.module.scss';

interface ConverionCardProps {
    direction: 'From' | "To";
    sourceCoinId: string;
    setSourceCoinId: React.Dispatch<React.SetStateAction<string>>;
    handleChange?: (value: string) => void;
    amount: string;
    readOnly?: boolean;
    validationError?: string | boolean
    setValidationError?: React.Dispatch<React.SetStateAction<string | boolean>>
}


const ConverionCard = ({ direction, sourceCoinId, setSourceCoinId, validationError, setValidationError, handleChange = () => { }, amount, readOnly = false }: ConverionCardProps) => {
    const { data: coinsData } = useGetCoins();
    const coins = coinsData || [];
    const targetCoin = coins.find(c => c.symbol === sourceCoinId) as Coin;

    useEffect(() => {
        if (!setValidationError) return
        if (Number(amount) > max) {
            setValidationError("Amount is too large maximum " + formattedMax)
        }
        else if (Number(amount) < min && Number(amount) !== 0) {
            setValidationError("Amount is too small minimum " + formattedMin)
        } else {
            setValidationError("")
        }
    }, [amount])



    const max = useMemo(() => MAX_TRADE_AMOUNT_IN_USD / Number(targetCoin?.priceUsd || 1), [targetCoin?.priceUsd]);
    const min = MIN_TRADE_AMOUNT_IN_USD / Number(targetCoin?.priceUsd || 1);


    const formattedMin = formatMinMaxValue(min);
    const formattedMax = formatMinMaxValue(max);


    return (
        <div className={styles.coinInputWrapper}>
            <div className={styles.coinInputHeader}>
                <span className={styles.direction}>{direction}</span>
                <span className={styles.balance}>Available Balance -- {sourceCoinId}</span>
            </div>
            <div className={styles.inputGroup}>
                <ModalSelect
                    symbol={targetCoin.symbol}
                    options={coins}
                    value={sourceCoinId}
                    onChange={setSourceCoinId}
                    placeholder="Select cryptocurrency"
                />
                <InvisibleInput
                    placeholder={`${formattedMin} - ${formattedMax}`}
                    className={styles.amountInput}
                    value={amount}
                    onChange={(e) => handleChange(e.target.value)}
                    type="number"
                    min="0"
                    suffix={<span></span>}
                    readOnly={readOnly}
                />

            </div>
            <div className={styles.error}>
                {
                    validationError && <span>{validationError}</span>
                }
            </div>
        </div>
    );
};

export default ConverionCard;
