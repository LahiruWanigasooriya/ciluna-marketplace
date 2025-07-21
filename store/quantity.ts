import { create } from "zustand";

interface QuantityStore {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const useQuantityStore = create<QuantityStore>((set) => ({
  quantity: 1,
  setQuantity: (quantity) => set({ quantity }),
}));