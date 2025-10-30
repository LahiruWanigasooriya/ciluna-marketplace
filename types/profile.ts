export interface FormValues {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  contactNo: string;
  gender?: "Male" | "Female" | "Other";
  country: string;
  profileImage: string;
  dateofbirth: Date | null;
  createdAt: string;
  lastLogin?: Date | string;
}

export interface ProfileFormContextType {
  values: FormValues;
  handleChange: <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => void;
  resetForm: () => void;
}

export interface NotificationValues {
  orderConfirmation: boolean;
  orderDelivered: boolean;
  orderStatusChanged: boolean;
  emailNotification: boolean;
}
