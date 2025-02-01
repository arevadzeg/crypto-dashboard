
import { useState, useEffect } from 'react';
import { Spin, Alert, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './ConvertPage.module.scss';
import { useGetCoins } from '../../api/services/coin/useGetCoins';
import { useParams } from 'react-router';
import ConverionCard from '../../components/features/ConverionCard/ConverionCard';

const CoinPage = () => {

    const { convertFromId, convertToId } = useParams()
    const { data: coinsData, isLoading, error } = useGetCoins();
    const [sourceCoinId, setSourceCoinId] = useState<string>(convertToId?.toLocaleUpperCase() ?? "");
    const [targetCoinId, setTargetCoinId] = useState<string>(convertFromId?.toLocaleUpperCase() ?? '');
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<string>('');

    const coins = coinsData?.data || [];




    useEffect(() => {
        calculateConversion();
    }, [sourceCoinId, targetCoinId, amount]);

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

    // const sourceCoin = coins.find(c => c.id === sourceCoinId);
    // const targetCoin = coins.find(c => c.id === targetCoinId);

    const handleConvert = () => {

    }


    if (isLoading) return <Spin size="large" />;
    if (error) return <Alert message="Something went wrong" type="error" />;

    return (
        <div>
            <div>
                <div className={styles.pageHeaderWrapper}>
                    <h2 className={styles.mainHeader}>Binance Convert</h2>
                    <h4 className={styles.subHeader}>Instant Price | Guaranteed Price | Any Pair
                    </h4>
                </div>

                <div className={styles.conversionForm}>

                    <div className={styles.conversionCards}>

                        <ConverionCard amount={amount} direction='From' sourceCoinId={sourceCoinId} setSourceCoinId={setSourceCoinId} setAmount={setAmount} />

                        <div className={styles.swapButton} onClick={handleSwap}>
                            <SwapOutlined className={styles.swapIcon} />
                        </div>
                        <ConverionCard readOnly amount={convertedAmount} direction='To' sourceCoinId={targetCoinId} setSourceCoinId={setTargetCoinId} setAmount={setAmount} />

                    </div>


                    <Button
                        type='primary'
                        className={classNames(styles.convertButton, {
                            // [styles.disabled]: !!validationError
                        })}
                        onClick={handleConvert}
                    >
                        Convert Now
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default CoinPage;
