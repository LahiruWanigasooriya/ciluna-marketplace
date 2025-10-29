import React from "react";
import { useState } from "react";
import ChangeEmail from "./ChangeEmail";
import VerifyPassword from "./VerifyPassword";
import SuccessDialog from "./SuccessDialog";

interface PasswordVerificationProps {
  email: string;
  onOtherMethods: () => void;
  onEditEmail: () => void;
}

const VerifyUsingPwd: React.FC<PasswordVerificationProps> = ({ email, onOtherMethods,onEditEmail }) => {
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);
  const [isNewEmailVerified, setNewEmailVerified] = useState<boolean>(false);

  if (!isPasswordVerified) {
    return <VerifyPassword email={email} onOtherMethods={onOtherMethods} onVerified={setIsPasswordVerified} />;
  }

  if (!isNewEmailVerified) {
    return <ChangeEmail email={email} onOtherMethods={onOtherMethods} onVerified={setNewEmailVerified} />;
  }

  if (isNewEmailVerified) {
    return <SuccessDialog setPopupOpen={setNewEmailVerified} onOtherMethods={onOtherMethods} onEditEmail={onEditEmail}/>;
  }
};

export default VerifyUsingPwd;
