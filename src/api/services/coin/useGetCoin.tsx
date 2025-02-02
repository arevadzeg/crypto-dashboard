import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import { Coin } from "./coinType";



export const useGetCoin = (id: string) => {

    return useQuery<Coin, Error>({
        queryKey: ["assets", id],
        queryFn: async () => {
            return apiClient
                .get(`/assets/${id}`)
                .then((res) => res.data.data);
        },
    });

};