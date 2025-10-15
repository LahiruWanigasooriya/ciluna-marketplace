import { StaticImageData } from "next/image";
import * as Yup from "yup";
import { orderValidationSchema } from "@/schemas/validationSchemas";

export interface Checkout {
  country:string;
  contactName: string;
  mobileNumber: string;
  street: string;
  province: string;
  district: string;
  town: string;
  zip: string;
  isDefault: boolean;
  paymentMethod: string;
  holderName?: string;
  cardNumber?: string;
  expireMonth?: string;
  expireYear?: string;
  cvv?: string;
  rememberCardDetails?: boolean;
  cilunaWallet?: string;
}

export interface PaymentCardOption {
  brand: string;
  cardHolderName: string;
  last4: string;
  expMonth: string;
  expYear: string;
  rememberCardDetails: boolean;
  isConfidential: boolean;
  stripeCustomerId: string;
  paymentMethodId: string;
}

export interface Address {
  _id: string;
  country: string;
  contactName: string;
  mobileNumber: string;
  street: string;
  province: string;
  district: string;
  town: string;
  zip: string;
  isDefault: boolean;
}

export type OrderFormFields = Yup.InferType<typeof orderValidationSchema>;
