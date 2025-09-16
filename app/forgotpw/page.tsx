"use client";

import React, { useState } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import Title from "@/components/custom/Title";
import { TextField, Button } from "@/components/ui";
import Link from "next/link";
import { toast } from "sonner";
import { resendTemporaryPassword } from "@/actions/users/resendTempPassword";
import bgpattern from "@/public/assets/login/bgpattern.png";
import Image from "next/image";

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
    className="rounded-[9px] px-4 md:px-0 flex flex-1 flex-col space-y-6 w-full font-[Arial] md:max-w-[598px] mx-auto mt-[136px] md:mt-[172px]"
  >
    <div className="flex items-center justify-center space-x-2">

      <Title
        title="Forgot your password?"
        className="text-[24px] leading-[32px] md:text-[28px] sm:text-[24px] lg:text-[28px] md:leading-[32px] font-kaiseiHarunoUmi"
      />
    </div>
    <p className=" text-sm font-[Arial]">
      Enter your email and we will help you reset your password.
    </p>
    <div className="flex flex-col space-y-4 text-[16px] leading-6">
      <TextField
        label="Email*"
        className="custom-textfield text-[16px] focus:right-2"
        inputClassName="text-[16px] text-black !text-black"
        placeholder="yourname@email.com"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={(value: string) => handleChange("email", value)}
      />
    </div>
    <div className="flex flex-col space-y-6 md:space-y-8 pt-[261px] md:pt-0">
      <Button
        type="submit"
        isDisabled={isLoading || isSuccess}
        className={`w-full  text-[18px] leading-6 bg-[#252525] hover:bg-obsidian-900 text-white transition-opacity duration-300 ${
          isLoading ? "opacity-80" : ""
        }`}
      >
        {isLoading && <Loader2 size={16} className="animate-spin mr-1" />}
        Reset Password
      </Button>
      <div className="flex items-center justify-center space-x-2">
        <p className="text-sm">Remember your password?</p>
        <Link href="/login">
          <p className=" cursor-pointer underline text-sm hover:opacity-75 font-bold hover:bg-[#050505]">
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
      }, 1000);
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
    <div className="flex flex-col justify-between relative mx-auto mb-8 md:mb-0 h-screen">
      <div className="hidden md:block absolute -right-0 top-[132px]  h-[301px] w-[320px]">
        <Image
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right"
          priority
        />
      </div>
      <div className="hidden md:block absolute -left-0 bottom-6 h-[301px] w-[320px] ">
        <Image
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right transform scale-x-[-1]"
          priority
        />
      </div>
      {/* <Link
        href="/"
        className="w-[169px] h-[22px] md:w-[224px] md:h-[30px] mb-6"
      >
        <Image src={Logo} alt="logo" />
      </Link> */}
      {/* <div className="flex lg:hidden justify-center items-center w-full">
          <Image src={BGIMG} alt="" className="bg-cover" />
        </div> */}

      <ForgotPasswordForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default ForgotPasswordPage;
