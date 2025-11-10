import { verifyPassword } from "@/actions/users/user";
import React, { useState } from "react";
import { Button, TextField } from "@/components/ui";
import { toast } from "sonner";

interface VerifyPasswordProps {
  email: string;
  onOtherMethods: () => void;
  onVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyPassword: React.FC<VerifyPasswordProps> = ({ email, onOtherMethods, onVerified }) => {
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [formData, setFormData] = useState({ password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleChange = (value: string) => {
    setFormData({ password: value });
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!value.trim()) {
        newErrors.password = "Password is required";
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        delete newErrors.password;
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const result = await verifyPassword(email, formData.password);
      if (!result.success) {
        toast.error(result.message);
        console.log("Error: ", result.message);
        setIsLoading(false);
        return;
      }

      onVerified(true);
    } catch (error: any) {
      console.log("Error verifying password: ", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:px-0 w-full">
      <div className="p-4 md:p-6 bg-neutralGray-50 max-w-[505px] mx-auto rounded-[8px]  w-full flex flex-col">
        <h1 className="text-lg leading-6 mb-2 font-arialBold">Verify with Password</h1>
        <p className="text-[14px] leading-5">Please verify your password to continue.</p>
        <div className="h-[1px] bg-neutralGray-100 w-full my-6"></div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <TextField
              type="password"
              isRevealable
              label="Password*"
              className="w-full max-w-[598px] [&_input]:!text-[14px] font-arial  [&_input]:leading-[20px] [&_input]:p-3 [&_label]:text-[#252525] [&_label]:text-[16px]"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={(value: string) => handleChange(value)}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full mb-4 h-[56px] bg-black text-white !text-lg leading-6"
          >
            Verify
          </Button>
        </form>

        <button
          type="button"
          onClick={onOtherMethods}
          className="text-center text-[14px] leading-5 hover:cursor-pointer mx-auto"
        >
          Use Other Ways to Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyPassword;
