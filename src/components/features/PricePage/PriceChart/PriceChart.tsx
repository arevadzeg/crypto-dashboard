import { useState } from "react";
import { useParams } from "react-router";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import dayjs from "dayjs";
import { useGetCoinHistory } from "../../../../api/services/coinHistory/useGetCoinHistory";
import formatCurrencyPrice from "../../../../utils/formatCurrencyPrice";
import styles from "./priceChart.module.scss";
import Loader from "../../Loader/Loader";

const TIME_RANGES = ["1D", "7D", "30D"] as const;
type TimeRange = typeof TIME_RANGES[number];

const TIME_RANGE_CONFIG: Record<TimeRange, { days: number; interval: string }> = {
    "1D": { days: 1, interval: "m1" },
    "7D": { days: 7, interval: "h1" },
    "30D": { days: 30, interval: "h6" }
};

const PriceChart = () => {
    const { coinId } = useParams();
    const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");

    const { data: coinHistory, isFetching } = useGetCoinHistory(
        coinId ?? "",
        TIME_RANGE_CONFIG[selectedRange].interval,
        TIME_RANGE_CONFIG[selectedRange].days
    );

    const isPriceChartLoading = isFetching || !coinHistory


    const minPrice = coinHistory ? Math.min(...coinHistory.map((entry) => Number(entry.priceUsd))) - 10 : 0;
    const maxPrice = coinHistory ? Math.max(...coinHistory.map((entry) => Number(entry.priceUsd))) + 10 : 0;

    return (
        <div className={styles.chartContainer}>
            <ul className={styles.timeRangeList}>
                {TIME_RANGES.map((range) => (
                    <li
                        key={range}
                        className={`${styles.timeRangeItem} ${range === selectedRange ? styles.active : ""}`}
                        onClick={() => setSelectedRange(range)}
                    >
                        {range}
                    </li>
                ))}
            </ul>

            <Loader isLoading={isPriceChartLoading} height={300} width={300}>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={coinHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis
                                dataKey="time"
                                tickFormatter={(value) =>
                                    selectedRange === "1D" ? dayjs(value).format("HH:mm") : dayjs(value).format("MMM DD")
                                }
                                minTickGap={36}
                            />
                            <YAxis domain={[minPrice, maxPrice]} tickFormatter={(value) => formatCurrencyPrice(value, 0)} />
                            <Tooltip labelFormatter={(label) => `Time: ${label}`} />
                            <Line type="monotone" dataKey="priceUsd" stroke="#FCD535" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


            </Loader>

        </div>
    );
};

export default PriceChart;
