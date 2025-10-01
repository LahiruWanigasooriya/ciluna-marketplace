import { create } from 'zustand';
import { fetchExchangeRate } from '@/utils/getDiscountPrice';

interface ExchangeRateState {
  rate: number;
  error: Error | null;
  isLoading: boolean;
  lastFetched: number | null;
  fetchRate: () => Promise<void>;
}

const CACHE_DURATION = 3600000;

export const useExchangeRateStore = create<ExchangeRateState>((set, get) => ({
  rate: 300,
  error: null,
  isLoading: false,
  lastFetched: null,

  fetchRate: async () => {
    const { lastFetched, isLoading } = get();
    
    if (isLoading) return;
   
    if (lastFetched && Date.now() - lastFetched < CACHE_DURATION) {
      return;
    }

    set({ isLoading: true });

    try {
      const excRate = await fetchExchangeRate();
      set({ 
        rate: excRate, 
        error: null, 
        isLoading: false,
        lastFetched: Date.now()
      });
    } catch (err) {
      console.error('Failed to fetch exchange rate:', err);
      set({ 
        error: err as Error, 
        isLoading: false 
      });
    }
  },
}));

if (typeof window !== 'undefined') {
  useExchangeRateStore.getState().fetchRate();
}