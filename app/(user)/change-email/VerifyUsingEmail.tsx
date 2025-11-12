import React, { useState } from "react";
import VerifyCurrentEmail from "./VerifyCurrentEmail";
import ChangeEmail from "./ChangeEmail";
import SuccessDialog from "./SuccessDialog";

interface EmailVerificationProps {
  email: string;
  onOtherMethods: () => void;
  onEditEmail: () => void;
}

const VerifyUsingEmail: React.FC<EmailVerificationProps> = ({ email, onOtherMethods, onEditEmail }) => {
  const [isCurrentEmailVerified, setCurrentEmailVerified] = useState<boolean>(false);
  const [isNewEmailVerified, setNewEmailVerified] = useState<boolean>(false);

  if (!isCurrentEmailVerified) {
    return <VerifyCurrentEmail email={email} onOtherMethods={onOtherMethods} onVerified={setCurrentEmailVerified} />;
  }

  if(!isNewEmailVerified) {
    return <ChangeEmail email={email} onOtherMethods={onOtherMethods} onVerified={setNewEmailVerified}/>
  }

  if(isNewEmailVerified) {
    return <SuccessDialog setPopupOpen={setNewEmailVerified} onOtherMethods={onOtherMethods} onEditEmail={onEditEmail}/>
  }

};

export default VerifyUsingEmail;
