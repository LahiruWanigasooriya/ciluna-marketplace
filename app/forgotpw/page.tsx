"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import Logo from "../assets/logo.svg";
import Banner from "../assets/logo.svg";
import Title from "@/components/custom/Title";
import { TextField, Button } from "@/components/ui";
import Link from "next/link";
import { toast } from "sonner";
import { resendTemporaryPassword } from "@/actions/users/resendTempPassword";
// import BGIMG from "@/public/assets/bglogom.webp";

const ForgotPasswordForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  isSuccess,
}: {
  formData: { email: string };
  handleChange: (field: keyof typeof formData, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;
}) => (
  <form
    onSubmit={handleSubmit}
    className="rounded-[9px] px-3 py-4 lg:px-4 lg:py-5 border-t border-l border-solid border-[#6B709499] flex flex-1 flex-col space-y-6 w-full bg-[#FFFFFF]/5"
  >
    <div className="flex items-center space-x-2">
      <Link
        href="/"
        className="flex items-start justify-start cursor-pointer hover:opacity-75"
      >
        <ChevronLeft className="" size={30} />
      </Link>
      <Title title="Forgot your password?" className="lg:text-lg" />
    </div>
    <p className="text-white text-sm font-interSemiBold">
      Enter your email and we will help you reset your password.
    </p>
    <div className="flex flex-col space-y-4">
      <TextField
        label="Email"
        className="custom-textfield"
        placeholder="yourname@email.com"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={(value: string) => handleChange("email", value)}
      />
    </div>
    <div className="flex flex-col space-y-2 pt-3">
      <Button
        type="submit"
        isDisabled={isLoading || isSuccess}
        className={`w-full font-interSemiBold bg-purple transition-opacity duration-300 ${
          isLoading ? "opacity-80" : ""
        }`} 
      >
        {isLoading && <Loader2 size={16} className="animate-spin mr-1" />} Reset
        Password
      </Button>
      <div className="flex items-center space-x-2 font-interSemiBold">
        <p className="text-white text-sm">Remember your password?</p>
        <Link href="/login">
          <p className="text-[#4A55E2] cursor-pointer underline text-sm hover:opacity-75">
            Sign In
          </p>
        </Link>
      </div>
    </div>
  </form>
);

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email) {
      toast.error("Please enter your email.");
      setTimeout(() => {
        setIsLoading(false); 
      },1000)
    
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const promise = resendTemporaryPassword(formData.email);
      const response = await promise; // Await to capture the resolved value

      if (response.success) {
        toast.success(response.message);
        setIsLoading(false); // Stop loading
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-start flex-col justify-between text-white h-screen overflow-hidden">
      <Link
        href="/"
        className="w-[169px] h-[22px] md:w-[224px] md:h-[30px] mb-6"
      >
        <Image src={Logo} alt="logo" />
      </Link>
      <div className="flex items-center h-[100vh] w-full relative">
        {/* <div className="flex lg:hidden justify-center items-center w-full">
          <Image src={BGIMG} alt="" className="bg-cover" />
        </div> */}

        <div className="flex items-center justify-between space-x-12 w-full absolute inset-0">
          <ForgotPasswordForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
          <div className="hidden lg:flex lg:flex-1">
            <Image src={Banner} alt="banner" className="object-cover w-3/4 h-3/4 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
