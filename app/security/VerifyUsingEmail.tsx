import { Button, TextField } from "@/components/ui";
import { forgotPasswordValidationSchema } from "@/schemas/validationSchemas";
import React, { useEffect, useState } from "react";
import { ValidationError } from "yup";
import ChangeEmail from "./ChangeEmail";

interface EmailVerificationProps {
  email: string;
  onOtherMethods: () => void;
  onchangeEmail?: () => void;
}

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const VerifyUsingEmail: React.FC<EmailVerificationProps> = ({
  email,
  onOtherMethods,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [formData, setFormData] = useState<FormData>({ email });
  const [errors, setErrors] = useState<FormErrors>({});
  const [verify, setVerify] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle changes to the email input
  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Handle code input changes
  const handleCodeChange = (index: number, value: string): void => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(
          `code-${index + 1}`
        ) as HTMLInputElement | null;
        nextInput?.focus();
      }
    }
  };

  // Handle backspace navigation for code inputs
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(
        `code-${index - 1}`
      ) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };

  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPasswordValidationSchema.validate(formData, {
        abortEarly: false,
      });
      setVerify(true);
    } catch (error: unknown) {
      setVerify(false);
      if (error instanceof ValidationError) {
        const newErrors = (error as ValidationError).inner.reduce<FormErrors>(
          (acc, err) => {
            if (err.path && typeof err.message === "string") {
              acc[err.path as keyof FormData] = err.message;
            }
            return acc;
          },
          {}
        );
        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
    setTimeLeft(45);
    setCode(["", "", "", "", "", ""]);
  };

  const isCodeComplete = code.every((d) => d !== "");
  const isEmailComplete =
    formData.email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="p-6 bg-neutralGray-50 max-w-[505px] mx-auto rounded-[8px] w-full flex flex-col">
        {verify ? (
          <ChangeEmail email={formData.email} />
        ) : (
          <div>
            <h1 className="text-lg leading-6 mb-2 font-arialBold">
              Verify using email
            </h1>
            <p className="text-[14px] leading-5">
              We’ve sent a 6-digit code to{" "}
              <span className="font-arialBold">shshi***@gmail.com</span>. Please
              enter it below.
            </p>
            <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>{" "}
            <div className="flex mb-3 justify-between space-x-5">
              {code.map((digit, i) => (
                <TextField
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(value: string) => handleCodeChange(i, value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(i, e)
                  }
                  inputClassName="!w-14 !h-14 text-center !text-lg leading-6 p-0"
                  aria-label={`Code digit ${i + 1}`}
                />
              ))}
            </div>
            <div className="w-full justify-center items-center flex">
              <span className="text-center text-[14px] leading-5 mb-8 mx-auto w-full">
                Code Expires in
                <span className="font-arialBold"> {timeLeft}s</span>
              </span>
            </div>
            <Button
              className={`w-full mb-4 !h-[56px] border-none !text-lg leading-6 ${
                !isCodeComplete
                  ? "bg-neutralGray-100 text-neutralGray-600"
                  : "bg-black text-white"
              }`}
              isDisabled={!isCodeComplete || isLoading}
              onClick={() => setVerify(true)} // For demo; in real app, verify code here
            >
              Verify
            </Button>
            <div className="w-full justify-center items-center flex">
              <button
                type="button"
                onClick={onOtherMethods}
                className="text-center text-[14px] leading-5 hover:cursor-pointer mx-auto"
              >
                Use Other Ways to Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyUsingEmail;
