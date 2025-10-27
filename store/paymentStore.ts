import { create } from "zustand";

interface PaymentStore {
  submitPayment: (() => Promise<any>) | null;
  setSubmitPayment: (fn: (() => Promise<any>) | null) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  submitPayment: null,
  setSubmitPayment: (fn) => set({ submitPayment: fn }),
}));
