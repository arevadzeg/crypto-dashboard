import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { ApiResponse, Coin } from "./coinType";



export const useGetCoins = () => {


    return useQuery<ApiResponse<Coin[]>, Error>({
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
                .then((res) => res.data);
        },
    });

};