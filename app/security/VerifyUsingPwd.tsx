import React from "react";
interface PasswordVerificationProps {
  onOtherMethods: () => void;
}
import { useState } from "react";
import { Button, TextField } from "@/components/ui";
import ChangeEmail from "./ChangeEmail";

const VerifyUsingPwd: React.FC<PasswordVerificationProps> = ({
  onOtherMethods,
}) => {
  const [formData, setFormData] = useState({ password: "", email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="p-6 bg-neutralGray-50 max-w-[505px] mx-auto rounded-[8px]  w-full flex flex-col">
        {isVerified ? (
          <ChangeEmail email={formData.email} />
        ) : (
          <>
            <h1 className="text-lg leading-6 mb-2 font-arialBold">
              Verify with Password
            </h1>
            <p className="text-[14px] leading-5">
              Please verify your password to continue.
            </p>
            <div className="h-[1px] bg-neutralGray-100 w-full my-6"></div>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <TextField
                  type="password"
                  isRevealable
                  label="Password*"
                  className="w-full min-w-[343px] max-w-[598px] [&_input]:!text-[14px] font-arial  [&_input]:leading-[20px] [&_input]:p-3 [&_label]:text-[#252525] [&_label]:text-[16px]"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={(value: string) => handleChange("password", value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                isDisabled={isLoading}
                className="w-full mb-4 h-[56px] bg-black text-white !text-lg leading-6"
                onClick={() => setIsVerified(true)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyUsingPwd;
