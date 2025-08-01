"use client";

import { useState } from "react";
import Title from "@/components/custom/Title";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import useForm from "@/hooks/useForm";
import { changePassword } from "@/actions/users/user";
import { toast } from "sonner";
import { ValidationError } from "yup";
import { passwordValidationSchema } from "@/schemas/validationSchemas";

// ✅ Define error state type
type FormErrors = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const AccountInfoForm: React.FC = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { values, handleChange, resetForm } = useForm(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // ✅ Validate form data
      await passwordValidationSchema.validate(values, { abortEarly: false });

      // ✅ Ensure new password matches confirm password
      if (values.newPassword !== values.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      // ✅ Call API to change password
      const response = await changePassword(
        values.oldPassword,
        values.newPassword
      );

      if (response.success) {
        toast.success("Password changed successfully!");
        resetForm(); // ✅ Reset form on success
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        // ✅ Handle validation errors
        const newErrors = error.inner.reduce<FormErrors>((acc, err) => {
          if (err.path) acc[err.path as keyof FormErrors] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        console.error("Password change error:", error);
        toast.error("❌ Error changing password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="font-interSemiBold text-base lg:text-lg text-white">
        Account Information
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-end gap-[12px] recommend:gap-[16px]">
        <div className="flex flex-col gap-1 recommend:min-h-[100px]">
          <TextField
            label="Old Password"
            className="custom-textfield w-full"
            placeholder="Old Password"
            type="password"
            value={values.oldPassword}
            onChange={(value) => handleChange("oldPassword", value)}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs">{errors.oldPassword}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 recommend:min-h-[100px]">
          <TextField
            label="New Password"
            className="custom-textfield w-full"
            placeholder="New Password"
            type="password"
            value={values.newPassword}
            onChange={(value) => handleChange("newPassword", value)}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs">{errors.newPassword}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 recommend:min-h-[100px]">
          <TextField
            label="Confirm Password"
            className="custom-textfield w-full"
            placeholder="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex items-start recommend:items-center recommend:min-h-[100px]">
          {" "}
          {/* Wrap button for alignment */}
          <Button
            type="submit"
            className="w-full bg-purple"
            isDisabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AccountInfoForm;
