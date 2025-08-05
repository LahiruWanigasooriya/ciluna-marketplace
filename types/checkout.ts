export interface Checkout {
  country:string;
  contactName: string;
  mobileNumber: string;
  street: string;
  province: string;
  district: string;
  town: string;
  zip: string;
  holderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvv: string;
  rememberShippingAddress: boolean;
  rememberCardDetails: boolean;
}
