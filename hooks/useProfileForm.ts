import { useState } from "react";
import { FormValues } from '@/types/profile';

const defaultValues: FormValues = {
  nickName: "",
  firstName: "",
  lastName: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  contactNo: "",
  gender: "Male",
  country: "",
  profileImage: ""
};

export const useProfileForm = () => {
  const [values, setValues] = useState<FormValues>(defaultValues);

  const handleChange = <K extends keyof FormValues>(name: K, value: FormValues[K]) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => setValues(defaultValues);

  return { values, handleChange, resetForm };
};
