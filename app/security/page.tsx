"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { IoKeyOutline, IoMailOutline } from "react-icons/io5";
import { SlSocialGoogle } from "react-icons/sl";
import VerifyUsingEmail from "./VerifyUsingEmail";
import VerifyUsingPwd from "./VerifyUsingPwd";

type VerificationMethod = "password" | "email" | "google";

type Screen =
  | "security-check"
  | "email-verify"
  | "change-email"
  | "email-verify-new"
  | "password";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SecurityCheckProps {
  onSelectMethod: (method: VerificationMethod) => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => (
  <div className={`bg-white rounded-lg ${className}`} onClick={onClick}>
    {children}
  </div>
);

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => <div className={`p-6 ${className}`}>{children}</div>;

const SecurityCheck: React.FC<SecurityCheckProps> = ({ onSelectMethod }) => {
  interface VerificationOption {
    method: VerificationMethod;
    icon: React.ReactNode;
    label: string;
  }

  const verificationOptions: VerificationOption[] = [
    {
      method: "password",
      icon: <IoKeyOutline className="w-6 h-6 text-black" />,
      label: "Verify using password",
    },
    {
      method: "email",
      icon: <IoMailOutline className="w-6 h-6 text-black" />,
      label: "Verify using email",
    },
    {
      method: "google",
      icon: <SlSocialGoogle className="w-6 h-6 text-black" />,
      label: "Verify using google",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-neutralGray-50 w-[505px] mx-auto rounded-[8px] max-h-[360px] h-screen">
        <h1 className="text-lg leading-6 mb-2 font-arialBold">
          Security Check
        </h1>
        <p className="text-[14px] leading-5 mb-8">
          Please verify your identity using one of the options below.
        </p>
        <div className="h-[1px] bg-neutralGray-100 w-full my-6"></div>
        <div className="space-y-4">
          {verificationOptions.map((option) => (
            <Card
              key={option.method}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectMethod(option.method)}
            >
              <CardContent className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center space-x-3">
                  {option.icon}
                  <span className="text-md leading-6">{option.label}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-black" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Security() {
  const [screen, setScreen] = useState<Screen>("security-check");
  const [currentEmail, setCurrentEmail] =
    useState<string>("shshi***@gmail.com");
  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethod | null>(null);

  const handleSelectMethod = (method: VerificationMethod): void => {
    setVerificationMethod(method);
    if (method === "password") {
      setScreen("password");
    } else if (method === "email") {
      setScreen("email-verify");
    } else if (method === "google") {
      setScreen("security-check"); // Placeholder for Google verification
    }
  };

  return (
    <div className="font-arial text-black">
      {screen === "security-check" && (
        <SecurityCheck onSelectMethod={handleSelectMethod} />
      )}

      {screen === "email-verify" && (
        <VerifyUsingEmail
          email={currentEmail}
          onOtherMethods={() => setScreen("security-check")}
        />
      )}

      {screen === "password" && (
        <VerifyUsingPwd onOtherMethods={() => setScreen("security-check")} />
      )}
    </div>
  );
}
