import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { Coin } from "./coinType";



export const useGetCoins = () => {


    return useQuery<Coin[], Error>({
        queryKey: ["assets"],
        queryFn: async () => {
            return apiClient
                .get('/assets', {
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