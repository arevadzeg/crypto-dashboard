import { useEffect, useRef } from 'react';

import { useWebSocketStore } from "../../../store/websocketStore";
import { useGetCoins } from "../coin/useGetCoins";
import { useQueryClient } from '@tanstack/react-query';
import { Coin } from '../coin/coinType';
import ENDPOINTS from '../../endpoints';

export const useCoinCapWebSocket = () => {
    const { data: coins } = useGetCoins();
    const queryClient = useQueryClient();
    const isConnedted = useRef(false)

    useEffect(() => {
        if (!coins) return;
        if (isConnedted.current) return
        isConnedted.current = true

        const assets = coins.map(coin => coin.id.toLowerCase());
        const ws = new WebSocket(`${ENDPOINTS.WS.PRICES}?assets=${assets.join(',')}`);

        const handleMessage = (msg: MessageEvent) => {
            try {
                const data = JSON.parse(msg.data);

                queryClient.setQueryData(["assets"], (oldData: Coin[]) => {

                    const updatedData = oldData.map((item: Coin) => ({
                        ...item,
                        priceUsd: data[item.id] ?? item.priceUsd,
                    }));

                    return updatedData
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