import Table from "antd/es/table";
import { Tag } from "antd";
import { useGetCoins } from "../../api/services/coin/useGetCoins";
import { useGetCoinsHistory } from "../../api/services/coinHistory/useGetCoinHistory";
import { useWebSocketStore } from "../../store/websocketStore";
import { useCoinCapWebSocket } from "../../api/services/socket/socket";

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


const Overview = () => {


    const { isLoading: isCoinLoading, data: coinsData } = useGetCoins();
    const { historyData, isLoading: isCoinHistoryLoading } = useGetCoinsHistory();
    const { prices } = useWebSocketStore();


    useCoinCapWebSocket()

    const data = coinsData?.data.map(coin => {
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
            render: (symbol: string) => <Tag color="blue">{symbol.toUpperCase()}</Tag>,
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
                <span style={{ color: change >= 0 ? "green" : "red" }}>
                    {change.toFixed(2)}%
                </span>
            ),
        },
        {
            title: "7d Change",
            dataIndex: "change7d",
            key: "change7d",
            render: (change: number) => (
                <span style={{ color: change >= 0 ? "green" : "red" }}>
                    {change.toFixed(2)}%
                </span>
            ),
        },
        {
            title: "30d Change",
            dataIndex: "change30d",
            key: "change30d",
            render: (change: number) => (
                <span style={{ color: change >= 0 ? "green" : "red" }}>
                    {change.toFixed(2)}%
                </span>
            ),
        },
    ];



    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={isCoinLoading || isCoinHistoryLoading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
            />
        </>
    );
}

export default Overview;
