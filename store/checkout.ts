// "use client";

// import { create } from "zustand";
// import { Checkout } from "@/types/checkout";

// interface CheckoutStore {
//   values: Checkout;
//   handleChange: <K extends keyof Checkout>(
//     field: K,
//     value: Checkout[K]
//   ) => void;
//   resetForm: () => void;
//   setValues: (data: Checkout) => void;
// }

// export const useCheckoutStore = create<CheckoutStore>((set) => ({
//   values: {
//     country: "",
//     contactName: "",
//     mobileNumber: "",
//     street: "",
//     province: "",
//     district: "",
//     town: "",
//     zip: "",
//     isDefault: false,
//     paymentMethod: "",
//     holderName: "",
//     cardNumber: "",
//     expireMonth: "",
//     expireYear: "",
//     cvv: "",
//     rememberCardDetails: true,
//   },
//   setValues: (data) => set({ values: data }),
//   handleChange: (field, value) =>
//     set((state) => ({
//       values: { ...state.values, [field]: value },
//     })),
//   resetForm: () =>
//     set(() => ({
//       values: {
//         country: "",
//         contactName: "",
//         mobileNumber: "",
//         street: "",
//         province: "",
//         district: "",
//         town: "",
//         zip: "",
//         isDefault: false,
//         paymentMethod: "",
//         holderName: "",
//         cardNumber: "",
//         expireMonth: "",
//         expireYear: "",
//         cvv: "",
//         // rememberShippingAddress: false,
//         rememberCardDetails: false,
//       },
//     })),
// }));

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Checkout } from "@/types/checkout";

interface CheckoutStore {
  values: Checkout;
  draftFormData: Partial<Checkout> | null;
  handleChange: <K extends keyof Checkout>(
    field: K,
    value: Checkout[K]
  ) => void;
  resetForm: () => void;
  setValues: (data: Checkout) => void;
  setDraftFormData: (data: Partial<Checkout>) => void;
  clearDraftFormData: () => void;
  restoreDraftData: () => Partial<Checkout> | null;
}

const initialValues: Checkout = {
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
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      values: initialValues,
      draftFormData: null,

      setValues: (data) => set({ values: data }),

      handleChange: (field, value) =>
        set((state) => ({
          values: { ...state.values, [field]: value },
        })),

      resetForm: () =>
        set(() => ({
          values: {
            ...initialValues,
            rememberCardDetails: false,
          },
        })),

      // Save draft form data (call this while user is filling the form)
      setDraftFormData: (data) =>
        set(() => ({
          draftFormData: data,
        })),

      // Clear draft data (call this after successful submission)
      clearDraftFormData: () =>
        set(() => ({
          draftFormData: null,
        })),

      // Restore draft data (call this when component mounts)
      restoreDraftData: () => {
        return get().draftFormData;
      },
    }),
    {
      name: "checkout-storage", // unique name for localStorage key
      partialize: (state) => ({
        draftFormData: state.draftFormData, // only persist draft data
      }),
    }
  )
);