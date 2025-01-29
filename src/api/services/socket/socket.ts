import { useEffect } from 'react';

import { useWebSocketStore } from "../../../store/websocketStore";
import { useGetCoins } from "../coin/useGetCoins";

export const useCoinCapWebSocket = () => {
    const { data: coins } = useGetCoins();

    useEffect(() => {
        if (!coins?.data) return;

        const assets = coins.data.map(coin => coin.id.toLowerCase());
        const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(',')}`);

        const handleMessage = (msg: MessageEvent) => {
            try {
                const data = JSON.parse(msg.data);
                useWebSocketStore.getState().setPrices(data);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onmessage = handleMessage;

        return () => {
            ws.close();
            ws.onmessage = null;
        };
    }, [coins?.data]);

    return { isConnected: !!coins?.data };
};