"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Title from "@/components/custom/Title";
import { TextField, Checkbox, Button } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkUserAndGenerateToken } from "@/backend/actions/users/user";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { loginValidationSchema } from "@/schemas/validationSchemas";
import { MdFormatIndentDecrease } from "react-icons/md";
import { FieldError } from "react-aria-components";
import { useUserStore } from "@/store/userStore";

const LoginForm = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { fetchUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback("");
    setErrors({});
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setFeedback("Please fill in all required fields.");
  
    }
    if(!formData.email || !formData.password){
      const fieldErrors: {email?:string; password?:string}={};
    if(!formData.email){
      fieldErrors.email ="Email is required"
    }
    if(!formData.password){
      fieldErrors.password ="Password is required"
    }

    setErrors(fieldErrors);
    setIsLoading(false);
    return;

    }

    try {
      await loginValidationSchema.validate(formData, { abortEarly: false });
      const { email, password } = formData;
      const res = await checkUserAndGenerateToken({ email, password });

      if (res.success) {
        const token = res?.data?.token || "";
        setAuth(token, formData.remember);
        setFeedback(res.message);
        setIsSuccess(true);
        fetchUser();
        router.push("/");
        router.refresh();
      } else {
        toast.error(res.message || "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      setIsLoading(false);

      if (error.inner) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.inner.forEach((err: any) => {
          if (err.path.includes("email")) {
            fieldErrors.email = err.message;
          }
          if (err.path.includes("password")) {
            fieldErrors.password = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      toast.error("Login error");
      setFeedback(
        "An unexpected error occurred during login. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[598px] mx-auto p-[16px] sm:p-0">
      <form
        onSubmit={handleSubmit}
        className="rounded-[9px] flex flex-1 flex-col space-y-6 w-full lg:w-full bg-[#FFFFFF]/5"
      >
        <div className="flex items-center justify-center space-x-3">
          <Title
            title="Login"
            className="mt-20 text-2xl lg:text-[28px] leading-[32px] font-kaiseiHarunoUmi font-bold text-[#252525]"
          />
          
        </div>

        <div className="flex flex-col space-y-3 mx-auto w-full max-w-[598px] min-w-[343px]">
          <div>
          <TextField
            label="Email*"
            className="w-full min-w-[343px] max-w-[598px] [&_input]:!text-[14px] font-arial [&_input]:leading-[20px] [&_input]:p-3 [&_label]:text-[16px] [&_label]:text-[#252525]"
            placeholder="Enter your Email"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(value: string) => handleChange("email", value)}
            
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div>
          <TextField
            type="password"
            isRevealable
            label="Password*"
            className="w-full min-w-[343px] max-w-[598px] [&_input]:!text-[14px] font-arial  [&_input]:leading-[20px] [&_input]:p-3 [&_label]:text-[#252525] [&_label]:text-[16px]"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={(value: string) => handleChange("password", value)}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

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

        <div className="flex flex-col gap-6 pt-56 sm:pt-3 items-center justify-center mx-auto min-w-[343px] max-w-[598px] w-full">
          <Button
            type="submit"
            className={`w-full !h-[56px] font-arial !text-lg !leading-6 text-[#ffffff] bg-black transition-opacity duration-300 !px-8 !py-4 hover:bg-obsidian-900 cursor-pointer${
              isLoading ? "opacity-80" : ""
            }`}
            isDisabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-1" /> Sign In
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="flex items-center justify-center flex-col sm:flex-row space-x-2 ">
            <p className="text-black text-base font-arial leading-[24px] sm:leading-[20px] sm:text-sm">
              Don't have a CILUNA account yet?
            </p>
            <Link href="/register">
              <p className="text-black cursor-pointer font-arialBold leading-[24px] sm:leading-[20px] text-base sm:text-sm hover:opacity-75">
                Create Account
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;