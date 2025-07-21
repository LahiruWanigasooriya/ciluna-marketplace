"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import Logo from "../assets/logo.png";
import Banner from "../assets/login-banner.webp";
import Title from "@/components/custom/Title";
import { TextField, Checkbox, Button } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkUserAndGenerateToken } from "@/actions/users/user";
import { useAuthStore } from "@/store/authStore";
import BGIMG from "@/public/assets/bglogom.webp";
import { toast } from "sonner";

const LoginForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  isSuccess,
}: {
  formData: { email: string; password: string; remember: boolean };
  handleChange: (field: keyof typeof formData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  feedback: string;
  isLoading: boolean;
  isSuccess: boolean;
}) => (
  <form
    onSubmit={handleSubmit}
    className="rounded-[9px] px-3 py-4 lg:px-4 lg:py-5 border-t border-l border-solid border-[#6B709499] flex flex-1 flex-col space-y-6 w-full bg-[#FFFFFF]/5"
  >
    <div className="flex items-center space-x-3">
      <Link
        href="/"
        className="flex items-start justify-start cursor-pointer hover:opacity-75"
      >
        <ChevronLeft className="" size={30} />
      </Link>
      <Title title="Sign in to your account" className="lg:text-lg" />
    </div>

    <div className="flex flex-col space-y-3 lg:space-y-4">
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
      <div className="flex flex-col space-y-1">
        <TextField
          type="password"
          isRevealable
          label="Password"
          className="custom-textfield"
          placeholder="password"
          value={formData.password}
          onChange={(value: string) => handleChange("password", value)}
        />
        <div className="flex items-center justify-between">
          <Checkbox
            isSelected={formData.remember}
            onChange={(isSelected: boolean) =>
              handleChange("remember", isSelected)
            }
          >
            <p className="font-interSemiBold text-sm">Remember me</p>
          </Checkbox>
          <Link href="/forgotpw">
            <p className="text-[#4A55E2] cursor-pointer underline text-sm hover:opacity-75 font-interSemiBold">
              Forgot your password?
            </p>
          </Link>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-2 pt-3">
      <Button
        type="submit"
        className={`w-full font-interSemiBold bg-purple transition-opacity duration-300 ${
          isLoading ? "opacity-80" : ""
        }`} 
        isDisabled={isLoading || isSuccess}
      >
        {isLoading ? (
          <>
            {" "}
            <Loader2 size={16} className="animate-spin mr-1" /> Sign In
          </>
        ) : (
          "Sign In"
        )}
      </Button>
      <div className="flex items-center justify-center space-x-2 font-interSemiBold">
        <p className="text-white text-sm">Don't have an account?</p>
        <Link href="/register">
          <p className="text-blue cursor-pointer underline text-sm hover:opacity-75">
            Sign Up
          </p>
        </Link>
      </div>
    </div>
  </form>
);

const LoginPage = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [feedback, setFeedback] = useState("");


  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setFeedback("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { email, password } = formData;
      const res = await checkUserAndGenerateToken({ email, password });

      if (res.success) {
        const token = res?.data?.token || "";
        setAuth(token, formData.remember);
        setFeedback(res.message);
        setIsSuccess(true);
        router.push("/");
        router.refresh();
      } else {
        toast.error(res.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Login error");
      console.error("Login error:", error);
      setFeedback("An error occurred during login. Please try again later.");
    } finally {
      setIsLoading(false);
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
        <div className="flex lg:hidden justify-center items-center w-full">
          <Image src={BGIMG} alt="" className="bg-cover" />
        </div>
        <div className="flex items-center justify-between space-x-12 w-full absolute inset-0">
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            feedback={feedback}
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

export default LoginPage;
