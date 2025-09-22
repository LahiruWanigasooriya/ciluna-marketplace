import { StaticImageData } from "next/image";

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
  img?: StaticImageData;
  holderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvv: string;
  rememberCardDetails: boolean;
  isConfidential: boolean;
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
