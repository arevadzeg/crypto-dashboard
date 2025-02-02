import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { Coin } from "./coinType";
import ENDPOINTS from "../../endpoints";



export const useGetCoin = (id: string) => {

    return useQuery<Coin, Error>({
        queryKey: ["assets", id],
        queryFn: async () => {
            return apiClient
                .get(`${ENDPOINTS.ASSETS.GET_ASSETS}/${id}`)
                .then((res) => res.data.data);
        },
    });

};