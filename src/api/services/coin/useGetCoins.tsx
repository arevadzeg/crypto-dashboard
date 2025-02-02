import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { Coin } from "./coinType";
import ENDPOINTS from "../../endpoints";



export const useGetCoins = () => {


    return useQuery<Coin[], Error>({
        queryKey: ["assets"],
        queryFn: async () => {
            return apiClient
                .get(ENDPOINTS.ASSETS.GET_ASSETS, {
                    params: {
                        // TODO FOR NOW HARD CODED
                        limit: 10,
                        sort: 'marketCapUsd',
                        order: 'desc',
                    },
                })
                .then((res) => res.data.data);
        },
    });

};