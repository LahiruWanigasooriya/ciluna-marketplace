"use client"

import {create} from 'zustand';
import { Checkout } from '@/types/checkout';

interface CheckoutStore {
  values: Checkout;
  handleChange: <K extends keyof Checkout>(field: K, value: Checkout[K]) => void;
  resetForm: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  values: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    holderName: "",
    cardNumber: "",
    csv: "string",
  },
  handleChange: (field, value) => set((state) => ({
    values: { ...state.values, [field]: value }
  })),
  resetForm: () => set(() => ({
    values: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      holderName: "",
      cardNumber: "",
      csv: "string",
    }
  }))
}));
