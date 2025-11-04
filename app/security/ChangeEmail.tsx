import { Button, TextField } from "@/components/ui";
import React, { useState } from "react";
import OtpVerification from "@/components/custom/OtpVerification";

interface ChangeEmailProps {
  onOtherMethods: () => void;
  onVerified: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ onOtherMethods, onVerified, email }) => {
  const [verify, setVerify] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("shshi***@gmail.com");
  const [isEmailValid, setEmailValid] = useState<boolean>(false);

  const handleEmailChange = (value: string) => {
    // Allow only valid email characters
    const emailRegex = /^[a-zA-Z0-9@._-]*$/;

    if (emailRegex.test(value)) {
      setEmailValid(true);
      setNewEmail(value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 md:px-0 w-full">
      {verify ? (
        <OtpVerification
          title="Verify Your New Email Address"
          email={email}
          verifyEmail={newEmail}
          onOtherMethods={onOtherMethods}
          otpType="verify_new"
          onVerified={onVerified}
        />
      ) : (
        <div className="bg-neutralGray-50 max-w-[505px] mx-auto rounded-[8px] w-full flex flex-col p-4 md:p-6">
          <h1 className="text-lg leading-6 mb-2 font-arialBold">Change Email</h1>
          <p className="text-[14px] leading-5">Please enter your new email address below.</p>
          <div className="h-[1px] bg-neutralGray-100 w-full my-6 z-10"></div>
          <TextField
            label="Email*"
            placeholder="Enter email"
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
            onChange={(value: string) => handleEmailChange(value)}
          />
          <Button
            type="submit"
            className={`w-full mt-20 !h-[56px] border-none !text-lg leading-6 ${
              !isEmailValid ? "bg-neutralGray-100 text-neutralGray-600" : "bg-black text-white"
            }`}
            isDisabled={!isEmailValid}
            onClick={() => setVerify(true)} // For demo; in real app, verify code here
          >
            Verify
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeEmail;
