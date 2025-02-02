
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './ConvertPage.module.scss';
import { useGetCoins } from '../../api/services/coin/useGetCoins';
import { useParams } from 'react-router';
import ConverionCard from '../../components/features/ConverionCard/ConverionCard';
import SuccessModal from '../../components/ul/SuccessModal/SuccessModal';
import Loader from '../../components/features/Loader/Loader';

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

    const coins = coinsData || [];

    useEffect(() => {
        calculateConversion();
    }, [sourceCoinId, targetCoinId, amount, coins]);

    const calculateConversion = () => {
        if (!sourceCoinId || !targetCoinId) return;

        const sourceCoin = coins.find(c => c.symbol === sourceCoinId);
        const targetCoin = coins.find(c => c.symbol === targetCoinId);

        if (!sourceCoin || !targetCoin) return;
        const sourcePrice = parseFloat(sourceCoin.priceUsd);
        const targetPrice = parseFloat(targetCoin.priceUsd);

        const result = (parseFloat(amount) * sourcePrice) / targetPrice;
        setConvertedAmount(result.toFixed(6));
    };

    const handleSwap = () => {
        const temp = sourceCoinId;
        setSourceCoinId(targetCoinId);
        setTargetCoinId(temp);
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
                            setAmount={setAmount}
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
                            setAmount={setAmount}
                        />
                    </div>

                    <Button
                        type='primary'
                        className={classNames(styles.convertButton, {
                            [styles.disabled]: !amount || !convertedAmount
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