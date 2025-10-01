import { Button, TextField } from "@/components/ui";
import { forgotPasswordValidationSchema } from "@/schemas/validationSchemas";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ValidationError } from "yup";
import SuccessIcon from "@/public/assets/profile/SuccessIcon.svg";
import ErrorIcon from "@/public/assets/profile/ErrorIcon.svg";
import Image from "next/image";

interface EmailVerificationProps {
  email: string;
}

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ChangeEmail: React.FC<EmailVerificationProps> = ({ email }) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [formData, setFormData] = useState<FormData>({ email });
  const [errors, setErrors] = useState<FormErrors>({});
  const [verify, setVerify] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [popupOpen, setPopupOpen] = useState<boolean>(true);

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
    <div className="flex items-center justify-center w-full">
      <div className="bg-neutralGray-50 max-w-[505px] mx-auto rounded-[8px] w-full flex flex-col">
        {verify ? (
          <div>
            <h1 className="text-lg leading-6 mb-2 font-arialBold">
              Verify your new email address
            </h1>
            <p className="text-[14px] leading-5">
              We’ve sent a 6-digit code to john**@gmail.com. Please enter it
              below.
            </p>
            <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
            <div className="flex mb-3 justify-between md:space-x-5">
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
                  inputClassName="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg leading-6 p-0"
                  aria-label={`Code digit ${i + 1}`}
                />
              ))}
            </div>
            <div className="w-full justify-center items-center flex">
              {timeLeft === 0 ? (
                <button
                  className="font-arialBold"
                  onClick={() => {
                    setTimeLeft(45);
                    setCode(["", "", "", "", "", ""]);
                  }}
                >
                  Resend Code
                </button>
              ) : (
                <span className="text-center text-[14px] leading-5 mx-auto w-full">
                  Code Expires in
                  <span className="font-arialBold"> {timeLeft}s</span>
                </span>
              )}
            </div>
            <Button
              className={`w-full mt-8 !h-[56px] border-none !text-lg leading-6 ${
                !isCodeComplete
                  ? "bg-neutralGray-100 text-neutralGray-600"
                  : "bg-black text-white"
              }`}
              isDisabled={!isCodeComplete || isLoading}
              onClick={() => {
                setIsSuccess(true);
                setPopupOpen(true);
              }} //////////////////////////////// For demo
            >
              Verify
            </Button>
          </div>
        ) : (
          <div>
            <h1 className="text-lg leading-6 mb-2 font-arialBold">
              Change Email
            </h1>
            <p className="text-[14px] leading-5">
              Please enter your new email address below.
            </p>
            <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
            <TextField
              label="Email*"
              placeholder="Enter email"
              className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
              onChange={(value: string) => handleChange("email", value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
            <Button
              type="submit"
              className={`w-full mt-20 !h-[56px] border-none !text-lg leading-6 ${
                !isEmailComplete
                  ? "bg-neutralGray-100 text-neutralGray-600"
                  : "bg-black text-white"
              }`}
              isDisabled={!isEmailComplete}
              onClick={() => setVerify(true)} // For demo; in real app, verify code here
            >
              Verify
            </Button>
          </div>
        )}
      </div>

      {isSuccess && popupOpen && (
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[12px] bg-black/65 text-center px-4 md:px-0">
          <div className="bg-white p-6 rounded-[8px] relative w-[520px]">
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              aria-label="Close popup"
              className="absolute top-2 right-2"
            >
              <IoIosCloseCircleOutline className=" text-neutralGray-500 w-5 h-5 cursor-pointer" />
            </button>
            <div className="flex justify-center mb-6">
              <Image src={SuccessIcon} alt="Success" width={50} height={50} />
            </div>
            <h1 className="text-xl leading-6 mb-3 font-arialBold">Success</h1>
            <p className="text-[18px] leading-6 mb-6">
              Your email address has been successfully updated.
            </p>
            <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
            <Button
              type="button"
              className="w-full !h-[56px] bg-black text-white !text-[18px] leading-6"
              onClick={() => setPopupOpen(false)}
            >
              OK
            </Button>
          </div>

          {/* Error Popup Hidden */}
          <div className="bg-white p-6 rounded-[8px] relative w-[520px] hidden">
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              aria-label="Close popup"
              className="absolute top-2 right-2"
            >
              <IoIosCloseCircleOutline className=" text-neutralGray-500 w-5 h-5 cursor-pointer" />
            </button>
            <div className="flex justify-center mb-6">
              <Image src={ErrorIcon} alt="Error" width={50} height={50} />
            </div>
            <h1 className="text-xl leading-6 mb-3 font-arialBold">Error</h1>
            <p className="text-[18px] leading-6 mb-6">
              Unable to update your email address. Please try again.
            </p>
            <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
            <Button
              type="button"
              className="w-full !h-[56px] bg-black text-white !text-[18px] leading-6"
              onClick={() => setPopupOpen(false)}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeEmail;
