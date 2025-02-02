import { useParams } from 'react-router';
import { Skeleton } from 'antd';
import { useGetCoin } from '../../../../api/services/coin/useGetCoin';
import styles from './pricePageHeader.module.scss';
import formatCurrencyPrice from '../../../../utils/formatCurrencyPrice';
import CurrencyLogo from '../../CurrencyLogo/CurrencyLogo';

const PricePageHeader = () => {
    const { coinId } = useParams();
    const { data: coinInfo, isLoading } = useGetCoin(coinId ?? "");

    const isPricePageHeaderLoading = isLoading || !coinInfo

    if (isPricePageHeaderLoading) {
        return (
            <div className={styles.headerWrapper}>
                <div>
                    <Skeleton.Input active size="large" className={styles.skeletonTitle} block />
                    <Skeleton.Input active size="default" className={styles.skeletonSubtitle} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.headerWrapper}>
            <div>
                <h1 className={styles.mainHeader}>
                    <CurrencyLogo id={coinInfo.symbol} alt={coinInfo.symbol} height={40} width={40} /> {coinInfo.name} Price ({coinInfo.symbol})
                </h1>
                <h3 className={styles.subHeader}>
                    {coinInfo.symbol} to <span className={styles.currencyHighlight}>USD</span>:
                    1 {coinInfo.name} equals ${formatCurrencyPrice(coinInfo.priceUsd)} USD
                </h3>
            </div>
        </div>
    );
};

export default PricePageHeader;
