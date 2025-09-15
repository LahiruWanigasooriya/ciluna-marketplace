"use client";

import React, { useState } from "react";
import Image from "next/image";
import {  Loader2 } from "lucide-react";
import Title from "@/components/custom/Title";
import { TextField, Checkbox, Button } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkUserAndGenerateToken } from "@/actions/users/user";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import bgpattern from '@/public/assets/login/bgpattern.png';


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
  
  <div className="w-full max-w-[598px] mx-auto">
  <form
    onSubmit={handleSubmit}
      className="rounded-[9px]   flex flex-1 flex-col space-y-6 w-full lg:w-full bg-[#FFFFFF]/5"
  >
    <div className="flex items-center justify-center space-x-3 ">
  
      <Title title="Login" className="mt-20 text-2xl lg:text-[28px] leading-[32px] font-kaiseiHarunoUmi font-bold text-[#252525]" />
    </div>


    <div className="flex flex-col space-y-3  items-center justify-center mx-auto">
      <TextField 
            label="Email*"
            className="
              [&_label]:font-arial font-arial [&_label]:!text-base [&_label]:!leading-6 
              !w-[343px] sm:!w-[598px] !max-w-none
              [&>div]:!w-[343px] sm:[&>div]:!w-[598px] [&>div]:!max-w-none 
              [&>div>input]:!w-[343px] sm:[&>div>input]:!w-[598px] [&>div>input]:!max-w-none 
              [&>div>input]:!h-[44px] [&>div>input]:!min-h-[44px] [&>div>input]:!max-h-[44px]
              [&>div>input]:!p-3 [&>div>input]:!px-3 [&>div>input]:!py-3"
            placeholder="Enter your Email"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(value: string) => handleChange("email", value)}
          />

      <div className="flex flex-col space-y-3">
        <TextField
          type="password"
          isRevealable
          label="Password*"
        className="
          [&_label]:font-arial font-arial [&_label]:!text-base [&_label]:!leading-6
          !w-[343px] sm:!w-[598px] !max-w-none
          [&>div]:!w-[343px] sm:[&>div]:!w-[598px] [&>div]:!max-w-none 
          [&>div>input]:!w-[343px] sm:[&>div>input]:!w-[598px] [&>div>input]:!max-w-none 
          [&>div>input]:!h-[44px] [&>div>input]:!min-h-[44px] [&>div>input]:!max-h-[44px]
          [&>div>input]:!p-3 [&>div>input]:!px-3 [&>div>input]:!py-3"
                    
          placeholder="Enter your Password"
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
            <p className="font-arial text-[#252525] text-sm">Remember me</p>
          </Checkbox>
          <Link href="/forgotpw">
            <p className="text-[#252525] cursor-pointer text-sm hover:opacity-75 font-arial">
              Forgot your password?
            </p>
          </Link>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-6 pt-52  sm:pt-3 items-center justify-center mx-auto" >
      <Button
        type="submit"
        className={`w-[343px] sm:!w-[598px] !h-[56px] font-arial !text-lg !leading-6 text-[#ffffff] bg-black transition-opacity duration-300 !px-8 !py-4 ${
          isLoading ? "opacity-80" : ""
        }`} 
        isDisabled={isLoading || isSuccess}
      >
        {isLoading ? (
          <>
            {" "}
            <Loader2 size={16} className="animate-spin mr-1 " /> Sign In
          </>
        ) : (
          "Sign in"
        )}
      </Button>
      <div className="flex items-center justify-center flex-col sm:flex-row space-x-2 font-arial">
        <p className="text-black text-base sm:text-sm">Don’t have a CILUNA account yet?
        </p>
        <Link href="/register">
          <p className="text-black cursor-pointer font-arialBold font-bold text-base sm:text-sm hover:opacity-75">
            Create Account
          </p>
        </Link>
      </div>
    </div>
  </form>
  </div>
 
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
   
    <div className="flex items-start flex-col  w-full relative justify-between text-black min-h-screen overflow-y-auto overflow-x-hidden sm:overflow-hidden ">
            <div className="hidden sm:block absolute -right-0 top-36  h-[301px] w-[320px]" >
          <Image 
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right"
          priority
          />
        </div>
            <div className="hidden sm:block absolute -left-0  top-[50vh] h-[301px] w-[320px] ">
          <Image 
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right transform scale-x-[-1]"
          priority
          />
           
        </div>
       
      <div className="flex items-center w-full relative pt-12">


   
        <div className="flex items-center justify-between space-x-12 w-full relative ">
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            feedback={feedback}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />

        </div>
        
      </div>
      
    </div>
 


  );
};

export default LoginPage;



