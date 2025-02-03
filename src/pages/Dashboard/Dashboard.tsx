import Table from "antd/es/table";
import { useGetCoins } from "../../api/services/coin/useGetCoins";
import { useGetCoinsHistory } from "../../api/services/coinHistory/useGetCoinsHistory";
import { useWebSocketStore } from "../../store/websocketStore";
import { useNavigate } from "react-router";
import Loader from "../../components/shared/Loader/Loader";
import CurrencyLogo from "../../components/shared/CurrencyLogo/CurrencyLogo";
import styles from './dashboard.module.scss'

const calculatePriceChange = (
    history: Record<string, any>,
    coinId: string,
    days: number,
    currentPrice: number,
    isLoading: boolean
): number | null => {
    if (isLoading) return null;

    const historicalData = history[coinId]?.[days]?.data;
    if (!historicalData || historicalData.length === 0) return null;
    const targetTimestamp = Date.now() - days * 24 * 60 * 60 * 1000;

    let closestEntry = historicalData.reduce((prev: any, curr: any) =>
        Math.abs(curr.time - targetTimestamp) < Math.abs(prev.time - targetTimestamp) ? curr : prev
    );

    const startPrice = closestEntry?.priceUsd ? parseFloat(closestEntry.priceUsd) : currentPrice;
    return ((currentPrice - startPrice) / startPrice) * 100;
};


const Dashboard = () => {


    const { isLoading: isCoinLoading, data: coinsData } = useGetCoins();
    const { historyData, isLoading: isCoinHistoryLoading } = useGetCoinsHistory();
    const { prices } = useWebSocketStore();
    const navigate = useNavigate()

    const handleNavigateToCoinPricePage = (coinId: string) => navigate(`/price/${coinId}`)
    const isTableDataLoading = isCoinLoading || isCoinHistoryLoading


    const data = coinsData?.map(coin => {
        const wsPrice = parseFloat(prices[coin.id]);
        const currentPrice = wsPrice || parseFloat(coin.priceUsd);

        const change24h = calculatePriceChange(historyData, coin.id, 1, currentPrice, isCoinHistoryLoading) ?? 0;
        const change7d = calculatePriceChange(historyData, coin.id, 7, currentPrice, isCoinHistoryLoading) ?? 0;
        const change30d = calculatePriceChange(historyData, coin.id, 30, currentPrice, isCoinHistoryLoading) ?? 0;

        return {
            key: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: currentPrice,
            change24h,
            change7d,
            change30d,
        };
    }) || [];


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Symbol",
            dataIndex: "symbol",
            key: "symbol",
            render: (symbol: string) => <div className={styles.logoWrapper}> <CurrencyLogo id={symbol} alt={symbol} /> {symbol.toUpperCase()}</div>,
        },
        {
            title: "Price (USD)",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "24h Change",
            dataIndex: "change24h",
            key: "change24h",
            render: (change: number) => (
                <span className={change >= 0 ? styles.increase : styles.decrease}>
                    {change.toFixed(2)}%
                </span>
            ),
        },
        {
            title: "7d Change",
            dataIndex: "change7d",
            key: "change7d",
            render: (change: number) => (
                <span className={change >= 0 ? styles.increase : styles.decrease}>
                    {change.toFixed(2)}%
                </span>
            ),
        },
        {
            title: "30d Change",
            dataIndex: "change30d",
            key: "change30d",
            render: (change: number) => (
                <span className={change >= 0 ? styles.increase : styles.decrease}>
                    {change.toFixed(2)}%
                </span>
            ),
        },
    ];



    return (
        <Loader isLoading={isTableDataLoading} height={'80vh'} width={'100vw'}>
            <>

                <h1 className={styles.mainHeader}>Markets Overview</h1>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ x: true }}
                    onRow={(record) => ({
                        onClick: () => handleNavigateToCoinPricePage(record.key)
                    })}
                    className={styles.table}
                />
            </>
        </Loader>
    );
}

export default Dashboard;
