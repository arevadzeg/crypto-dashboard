import { Coin } from "../../../api/services/coin/coinType";
import { useGetCoins } from "../../../api/services/coin/useGetCoins";
import { MAX_TRADE_AMMOUNT_IN_USD, MIN_TRADE_AMMOUNT_IN_USD } from "../../../constants/constants";
import formatNumber from "../../../utils/formatNumber";
import InvisibleInput from "../../ul/InvisibleInput/InvisibleInput";
import ModalSelect from "../../ul/ModalSelect/ModalSelect";
import styles from './ConverionCard.module.scss';

interface ConverionCardProps {
    direction: 'From' | "To";
    sourceCoinId: string;
    setSourceCoinId: React.Dispatch<React.SetStateAction<string>>;
    setAmount: (value: React.SetStateAction<string>) => void;
    amount: string;
    readOnly?: boolean;
}


const ConverionCard = ({ direction, sourceCoinId, setSourceCoinId, setAmount, amount, readOnly = false }: ConverionCardProps) => {
    const { data: coinsData } = useGetCoins();
    const coins = coinsData || [];
    const targetCoin = coins.find(c => c.symbol === sourceCoinId) as Coin;

    const max = MAX_TRADE_AMMOUNT_IN_USD / Number(targetCoin?.priceUsd || 1);
    const min = MIN_TRADE_AMMOUNT_IN_USD / Number(targetCoin?.priceUsd || 1);


    const formattedMin = formatNumber(min);
    const formattedMax = formatNumber(max);


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
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="0"
                    suffix={<span></span>}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default ConverionCard;
