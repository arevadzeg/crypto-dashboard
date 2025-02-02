import { useEffect, useRef } from 'react';

import { useWebSocketStore } from "../../../store/websocketStore";
import { useGetCoins } from "../coin/useGetCoins";
import { useQueryClient } from '@tanstack/react-query';
import { Coin } from '../coin/coinType';

export const useCoinCapWebSocket = () => {
    const { data: coins } = useGetCoins();
    const queryClient = useQueryClient();
    const isConnedted = useRef(false)

    useEffect(() => {
        if (!coins) return;
        if (isConnedted.current) return
        isConnedted.current = true

        const assets = coins.map(coin => coin.id.toLowerCase());
        const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(',')}`);

        const handleMessage = (msg: MessageEvent) => {
            try {
                const data = JSON.parse(msg.data);

                queryClient.setQueryData(["assets"], (oldData: any) => {
                    if (!oldData?.data) return oldData;

                    const updatedData = oldData.data.map((item: Coin) => ({
                        ...item,
                        priceUsd: data[item.id] ?? item.priceUsd,
                    }));

                    return { ...oldData, data: updatedData };
                });

                useWebSocketStore.getState().setPrices(data);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onmessage = handleMessage;

        return () => {
            if (isConnedted.current) return

            ws.close();
            ws.onmessage = null;
        };
    }, [coins]);

    return { isConnected: !!coins };
};