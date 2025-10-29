import { sendOtp, updateUserProfile, verifyOtp } from "@/actions/users/user";
import React, { useEffect, useRef, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui";
import { OtpType } from "@/types/user";
import { toast } from "sonner";

interface OtpVerificationProps {
  title: string;
  email: string;
  verifyEmail: string;
  onOtherMethods: () => void;
  otpType: OtpType;
  onVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  title,
  email,
  verifyEmail,
  onOtherMethods,
  otpType,
  onVerified,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [otp, setOtp] = useState<string>("");

  const handleComplete = (value: string) => {
    // Only digits allowed
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      const result = await verifyOtp(email, otp, otpType);
      if (!result.success) {
        toast.error(result.message);
        console.log("Error verifying otp: ", result.message)
        setIsLoading(false);
        setOtp("");
        return;
      }

      onVerified(true);

      if ((otpType = "verify_new")) {
        await updateUserProfile({ email: verifyEmail });
      }
      console.log(result.message);
      setIsLoading(false);
      setOtp("");
    }
  };

  const sendVerifyCode = async () => {
    try {
      setTimeLeft(45);
      console.log("Email in opt ver: ", email);
      console.log("Verify email in opt ver: ", verifyEmail);
      const result = await sendOtp(email, verifyEmail, otpType);
      console.log("OTP: ", result.message);
    } catch (error: any) {
      console.log("Error sending otp: ", error.message);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const otpSentRef = useRef(false);

  useEffect(() => {
    async function sendOTP() {
      if (otpSentRef.current) return; // Prevent duplicate sends
      otpSentRef.current = true;
      sendVerifyCode();
    }

    sendOTP();
  }, []);

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 3) {
      return `***@${domain}`;
    }
    const visiblePart = localPart.slice(0, -3);
    return `${visiblePart}***@${domain}`;
  };

  const isCodeComplete = otp.length === 6;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:px-0 w-full">
      <div className="p-4 md:p-6 bg-neutralGray-50 max-w-[505px] mx-auto rounded-[8px] w-full flex flex-col">
        <div>
          <h1 className="text-lg leading-6 mb-2 font-arialBold">{title}</h1>
          <p className="text-[14px] leading-5">
            We’ve sent a 6-digit code to <span className="font-arialBold">{maskEmail(verifyEmail)}</span>. Please enter
            it below.
          </p>
          <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>{" "}
          <div className="flex mb-3 justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleComplete}
              autoFocus
              containerClassName="flex justify-between max-w-[457px] w-full"
            >
              <InputOTPSlot
                index={0}
                className="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg p-0 rounded-[8px] bg-white"
              />
              <InputOTPSlot
                index={1}
                className="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg p-0 rounded-[8px] bg-white"
              />
              <InputOTPSlot
                index={2}
                className="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg p-0 rounded-[8px] bg-white"
              />
              <InputOTPSlot
                index={3}
                className="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg p-0 rounded-[8px] bg-white"
              />
              <InputOTPSlot
                index={4}
                className="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg p-0 rounded-[8px] bg-white"
              />
              <InputOTPSlot
                index={5}
                className="!w-[45px] !h-[45px] md:!w-14 md:!h-14 text-center !text-lg p-0 rounded-[8px] bg-white"
              />
            </InputOTP>
          </div>
          <div className="w-full justify-center items-center flex">
            {timeLeft === 0 ? (
              <div className="font-arialBold text-sm leading-5 mb-8 cursor-pointer hover:opacity-70" onClick={sendVerifyCode}>Resend Code</div>
            ) : (
              <span className="text-center text-[14px] leading-5 mb-8 mx-auto w-full">
                Code Expires in
                <span className="font-arialBold"> {timeLeft}s</span>
              </span>
            )}
          </div>
          <Button
            className={`w-full mb-4 !h-[56px] border-none !text-lg leading-6 ${
              !isCodeComplete ? "bg-neutralGray-100 text-neutralGray-600" : "bg-black text-white"
            }`}
            isDisabled={!isCodeComplete || isLoading}
            onClick={handleSubmit}
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
      </div>
    </div>
  );
};

export default OtpVerification;
