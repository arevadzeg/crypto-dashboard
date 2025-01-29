import { useQueries } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { useGetCoins } from "../coin/useGetCoins";

interface CoinHistoryEntry {
    priceUsd: string;
    time: number;
    date: string;
}

interface CoinHistory {
    data: CoinHistoryEntry[];
    timestamp?: number;
}

type HistoryData = Record<string, Record<number, CoinHistory>>;

export const useGetCoinsHistory = () => {
    const { data: coinsData } = useGetCoins();
    const now = Date.now();

    const periods = [
        { days: 7, interval: 'd1' },
        { days: 30, interval: 'd1' }
    ];

    const queries = useQueries({
        queries: (coinsData?.data || []).flatMap(coin =>
            periods.map(period => ({
                queryKey: ['history', coin.id, period.days],
                queryFn: async () => {
                    const start = now - period.days * 24 * 60 * 60 * 1000;
                    return apiClient
                        .get(`/assets/${coin.id}/history`, {
                            params: {
                                interval: period.interval,
                                start,
                                end: now
                            }
                        })
                        .then(res => ({
                            coinId: coin.id,
                            days: period.days,
                            data: res.data
                        }));
                },
                enabled: !!coinsData?.data
            }))
        )
    });

    const historyData: HistoryData = queries.reduce((acc, query) => {
        if (query.data) {
            const { coinId, days, data } = query.data;
            acc[coinId] = acc[coinId] || {};
            acc[coinId][days] = data;
        }
        return acc;
    }, {} as HistoryData);

    const refetchHistory = () => queries.forEach(query => query.refetch());

    return {
        refetchHistory,
        historyData,
        isLoading: queries.some(query => query.isLoading),
        error: queries.find(query => query.error)?.error
    };
};
