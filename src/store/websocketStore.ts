import { create } from 'zustand';

interface WebSocketState {
    prices: Record<string, string>;
    setPrices: (newPrices: Record<string, string>) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
    prices: {},
    setPrices: (newPrices) => set((state) => ({
        prices: { ...state.prices, ...newPrices }
    })),
}));