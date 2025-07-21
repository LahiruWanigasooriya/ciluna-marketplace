import { useState } from "react";

const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm };
};

export default useForm;
