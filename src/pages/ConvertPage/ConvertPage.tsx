
import { useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './ConvertPage.module.scss';
import { useGetCoins } from '../../api/services/coin/useGetCoins';
import { useParams } from 'react-router';
import ConverionCard from '../../components/features/ConverionCard/ConverionCard';
import SuccessModal from '../../components/ul/SuccessModal/SuccessModal';
import Loader from '../../components/features/Loader/Loader';
import formatCurrencyPrice from '../../utils/formatCurrencyPrice';

const CoinPage = () => {
    const { convertFromId, convertToId } = useParams();
    const { data: coinsData, isLoading } = useGetCoins();
    const [sourceCoinId, setSourceCoinId] = useState<string>(convertToId?.toUpperCase() ?? "");
    const [targetCoinId, setTargetCoinId] = useState<string>(convertFromId?.toUpperCase() ?? '');
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [conversionResult, setConversionResult] = useState<{
        from: string;
        to: string;
        amount: string;
        result: string;
    } | null>(null);
    const [validationError, setValidationError] = useState<boolean | string>(false)

    const coins = coinsData || [];


    useEffect(() => {
        calculateConversion();
    }, [coins]);

    const sourceCoin = coins.find(c => c.symbol === sourceCoinId);
    const targetCoin = coins.find(c => c.symbol === targetCoinId);

    const calculateConversion = (inputAmount?: string) => {
        if (!sourceCoinId || !targetCoinId) return;
        if (!sourceCoin || !targetCoin) return;
        const sourcePrice = parseFloat(sourceCoin.priceUsd);
        const targetPrice = parseFloat(targetCoin.priceUsd);

        const result = (parseFloat(inputAmount ?? amount) * sourcePrice) / targetPrice;
        setConvertedAmount(result.toFixed(6));
    };


    const handleSwap = () => {
        const tempId = sourceCoinId;
        const tempAmount = amount
        setSourceCoinId(targetCoinId);
        setTargetCoinId(tempId);
        setAmount(convertedAmount)
        setConvertedAmount(tempAmount);
    };

    const handleConvert = () => {
        if (!amount || !convertedAmount) return;

        setConversionResult({
            from: sourceCoinId,
            to: targetCoinId,
            amount: amount,
            result: convertedAmount
        });

        setIsModalVisible(true);
        resetForm();
    };

    const resetForm = () => {
        setSourceCoinId(convertToId?.toUpperCase() ?? "");
        setTargetCoinId(convertFromId?.toUpperCase() ?? '');
        setAmount("");
        setConvertedAmount("");
    };


    return (
        <Loader isLoading={isLoading} height={'80vh'} width={'100vw'}>
            <div>
                <div className={styles.pageHeaderWrapper}>
                    <h2 className={styles.mainHeader}>Binance Convert</h2>
                    <h4 className={styles.subHeader}>
                        Instant Price | Guaranteed Price | Any Pair
                    </h4>
                </div>

                <div className={styles.conversionForm}>
                    <div className={styles.conversionCards}>
                        <ConverionCard
                            amount={amount}
                            direction='From'
                            sourceCoinId={sourceCoinId}
                            setSourceCoinId={setSourceCoinId}
                            handleChange={(e) => {
                                setAmount(e)
                                calculateConversion(e)
                            }}
                            validationError={validationError}
                            setValidationError={setValidationError}
                        />

                        <div className={styles.swapButton} onClick={handleSwap}>
                            <SwapOutlined className={styles.swapIcon} />
                        </div>

                        <ConverionCard
                            readOnly
                            amount={convertedAmount}
                            direction='To'
                            sourceCoinId={targetCoinId}
                            setSourceCoinId={setTargetCoinId}
                        />
                    </div>
                    <div className={styles.rateInfo}>
                        <Tooltip title="Please note that this final convert quotation rate, which is subject to market condition, may not be equal to the spot price. The price can be refreshed.">
                            Rate
                        </Tooltip>
                        <span>
                            1 {targetCoinId} ≈ {targetCoin?.priceUsd && formatCurrencyPrice(targetCoin.priceUsd)} USD
                        </span>
                    </div>

                    <Button
                        type='primary'
                        className={classNames(styles.convertButton, {
                            [styles.disabled]: !amount || !convertedAmount || validationError
                        })}
                        onClick={handleConvert}
                    >
                        Convert Now
                    </Button>
                </div>

                <SuccessModal
                    title="🎉 Conversion Successful! 🎉"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    content={
                        conversionResult && (
                            <p>
                                Successfully converted {conversionResult.amount} {conversionResult.from} to {' '}
                                <strong>
                                    {conversionResult.result} {conversionResult.to}
                                </strong>
                            </p>
                        )
                    }
                />
            </div>
        </Loader>
    );
};

export default CoinPage;