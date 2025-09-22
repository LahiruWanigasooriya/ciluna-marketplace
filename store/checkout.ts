"use client";

import { create } from "zustand";
import { Checkout } from "@/types/checkout";

interface CheckoutStore {
  values: Checkout;
  handleChange: <K extends keyof Checkout>(
    field: K,
    value: Checkout[K]
  ) => void;
  resetForm: () => void;
  setValues: (data: Checkout) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  values: {
    country: "",
    contactName: "",
    mobileNumber: "",
    street: "",
    province: "",
    district: "",
    town: "",
    zip: "",
    isDefault: false,
    paymentMethod: "",
    holderName: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvv: "",
    rememberCardDetails: true,
  },
  setValues: (data) => set({ values: data }),
  handleChange: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
    })),
  resetForm: () =>
    set(() => ({
      values: {
        country: "",
        contactName: "",
        mobileNumber: "",
        street: "",
        province: "",
        district: "",
        town: "",
        zip: "",
        isDefault: false,
        paymentMethod: "",
        holderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvv: "",
        // rememberShippingAddress: false,
        rememberCardDetails: false,
      },
    })),
}));
