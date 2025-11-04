import React from 'react'
import OtpVerification from "@/components/custom/OtpVerification";

interface VerifyCurrentEmailProps {
  email: string;
  onOtherMethods: () => void;
  onChangeEmail?: () => void;
  onVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyCurrentEmail:React.FC <VerifyCurrentEmailProps> = ({email, onOtherMethods, onChangeEmail, onVerified}) => {
  return (
    <OtpVerification title="Verify Using Email" email={email} verifyEmail={email} onOtherMethods={onOtherMethods} otpType="verify_current" onVerified={onVerified}/>
  );
}

export default VerifyCurrentEmail