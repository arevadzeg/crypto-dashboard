import Table from "antd/es/table";
import { Tag } from "antd";
import { useGetCoins } from "../../api/services/coin/useGetCoins";
import { useGetCoinsHistory } from "../../api/services/coinHistory/useGetCoinHistory";

const calculatePriceChange = (
    history: Record<string, any>,
    coinId: string,
    days: number,
    currentPrice: number,
    isLoading: boolean
): number | null => {
    if (isLoading) return null;

    const historicalData = history[coinId]?.[days];
    const startPrice = historicalData
        ? parseFloat(historicalData.data[0].priceUsd)
        : currentPrice;

    return ((currentPrice - startPrice) / startPrice) * 100;
};

const Overview = () => {
    const { isLoading: isCoinLoading, data: coinsData } = useGetCoins();
    const { historyData, isLoading: isCoinHistoryLoading } = useGetCoinsHistory();



    const data = coinsData?.data.map(coin => {
        const currentPrice = parseFloat(coin.priceUsd);

        const sevenDayChange = calculatePriceChange(historyData, coin.id, 7, currentPrice, isCoinHistoryLoading) ?? 0;
        const thirtyDayChange = calculatePriceChange(historyData, coin.id, 30, currentPrice, isCoinHistoryLoading) ?? 0;

        return {
            key: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: currentPrice,
            change24h: parseFloat(coin.changePercent24Hr),
            change7d: sevenDayChange,
            change30d: thirtyDayChange,
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
