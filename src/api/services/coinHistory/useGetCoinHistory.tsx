import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { CoinHistory } from "./coinHistoryType";
import ENDPOINTS from "../../endpoints";

export const useGetCoinHistory = (coinId: string, interval: string, days: number) => {

    return useQuery<CoinHistory[], Error>({
        queryKey: ['history', coinId, interval, days],

        queryFn: async () => {
            const now = Date.now();
            const start = now - days * 24 * 60 * 60 * 1000;

            return apiClient
                .get(`${ENDPOINTS.ASSETS.GET_HISTORY.replace(":id", coinId)}`, {
                    params: {
                        interval: interval,
                        start,
                        end: now
                    },
                })
                .then((res) => res.data.data);
        },
    });

};