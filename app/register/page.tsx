"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import Logo from "../assets/logo.png";
import Banner from "../assets/login-banner.webp";
import Title from "@/components/custom/Title";
import { TextField, Button,DateField } from "@/components/ui";
import Link from "next/link";
import Tel from "@/components/custom/Phone";
import { signupValidationSchema } from "@/schemas/validationSchemas";
import { createNewUser } from "@/actions/users/user";
import { useRouter } from "next/navigation";
import { date, ValidationError } from "yup";
import BGIMG from "@/public/assets/bglogom.webp";
import { toast } from "sonner";
import { DatePicker } from "react-aria-components";
import { DateValue, parseDate } from "@internationalized/date";

type FormData = {
  firstName: string;
  lastName: string;
  dateofbirth: DateValue | null;
  email: string;
  phone: string;
  password: string;
  remember: boolean;
};


type FormErrors = {
  [K in keyof FormData]?: string;
};

const useForm = (initialState: FormData) => {
  const [formData, setFormData] = React.useState<FormData>(initialState);
  const [errors, setErrors] = React.useState<FormErrors>({});
  
  const handleChange = (field: keyof FormData, value: string | boolean | DateValue | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return { formData, errors, setErrors, handleChange, resetForm };
};

const SignupForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isLoading,
  isSuccess,
}: {
  formData: FormData;
  errors: FormErrors;
  handleChange: (field: keyof FormData, value: string | boolean | DateValue | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;
}) => (
  <form
    onSubmit={handleSubmit}
    className="rounded-[9px] px-3 py-4 lg:px-4 lg:py-5  flex flex-1 flex-col space-y-6 w-full bg-[#FFFFFF]"
  >
    <div className="flex items-center justify-center space-x-2">

      <Title title="Create Account" className=" lg:text-lg text-black" />
    </div>
    <div className="flex flex-col space-y-3 lg:space-y-4">
      <div>
        <TextField
          label="First Name*"
          placeholder="Enter first name"
          value={formData.firstName}
          className=" w-full"
          onChange={(value: string) => handleChange("firstName", value)}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs">{errors.firstName}</p>
        )}
      </div>

      <div>
        <TextField
          label="Last Name*"
          placeholder="Enter last name"
          value={formData.lastName}
          className=" w-full"
          onChange={(value: string) => handleChange("lastName", value)}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs">{errors.lastName}</p>
        )}
      </div>

        <DatePicker
          // label="Date of Birth"
          value={formData.dateofbirth}
          onChange={(value: DateValue | null) => handleChange("dateofbirth", value)}
          className="w-full"
        />
      
        {errors.dateofbirth && (
          <p className="text-red-500 text-xs">{errors.dateofbirth}</p>
        )}
      </div>

      <div>
        <TextField
          label="Email"
          placeholder="Enter email"
          value={formData.email}
          className=" w-full"
          onChange={(value: string) => handleChange("email", value)}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div>
        <Tel
          value={formData.phone}
          onChange={(phone: string) => handleChange("phone", phone)}
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
      </div>

      <div>
        <TextField
          type="password"
          isRevealable
          label="Create Password"
          placeholder="********"
          className="w-full"
          description="Password must contain at least 8 characters."
          value={formData.password}
          onChange={(value: string) => handleChange("password", value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
    

    {/* <div className="flex items-center justify-between">
      <Checkbox
        isSelected={formData.remember}
        onChange={(isSelected: boolean) => handleChange("remember", isSelected)}
      >
        Remember me
      </Checkbox>

      <Link href="/forgotpw">
        <p className="text-blue cursor-pointer underline text-sm hover:opacity-75 font-interSemiBold">
          Forgot your password?
        </p>
      </Link>
    </div> */}
    <div className="flex flex-col gap-2">
      <Button
        type="submit"
        className={`w-full font-interSemiBold bg-purple transition-opacity duration-300 ${
          isLoading ? "opacity-80" : ""
        }`}
        isDisabled={isLoading || isSuccess}
      >
        {isLoading && <Loader2 size={16} className="animate-spin mr-1" />}
        Sign Up
      </Button>

      <div className="flex items-center justify-center space-x-2 font-interSemiBold">
        <p className="text-white text-sm">Already a user?</p>
        <Link href="/login">
          <p className="text-blue cursor-pointer underline text-sm hover:opacity-75">
            Sign In
          </p>
        </Link>
      </div>
    </div>
  </form>
);

const SignupPage: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const { formData, errors, setErrors, handleChange } = useForm({
    firstName: "",
    lastName: "",
    dateofbirth: null,
    email: "",
    phone: "",
    password: "",
    remember: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupValidationSchema.validate(formData, { abortEarly: false });

      const { firstName, lastName, email, password, phone } = formData;
      const contactNo = phone; // This should already include the country code

      // Only send known properties to createNewUser
      const res = await createNewUser({
        firstName,
        lastName,
        email,
        password,
        contactNo,
      });

      if (res.success) {
        setIsSuccess(true);
        router.push("/"); // Redirect to the home page
      } else {
        toast.error(res.message || "Failed to create user.");
      }
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const newErrors = (error as ValidationError).inner.reduce<FormErrors>((acc, err) => {
          if (err.path && typeof err.message === "string") {
            acc[err.path as keyof FormData] = err.message;
          }
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-start justify-between text-white h-screen overflow-hidden">
      <Link
        href="/"
        className="w-[169px] h-[22px] md:w-[224px] md:h-[30px] mb-6"
      >
        <Image src={Logo} alt="logo" />
      </Link>

      <div className="flex items-start h-[80vh] xl:h-[100vh] w-full relative">
        {/* <div className="flex lg:hidden justify-center items-center w-full pt-36">
          <Image src={BGIMG} alt="" className="bg-cover" />
        </div> */}

        <div className="flex items-center justify-between space-x-12 w-full absolute inset-0">
          <SignupForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
          {/* <div className="hidden lg:flex lg:flex-1">
            <Image
              src={Banner}
              alt="banner"
              className="object-cover w-full h-full 2xl:w-5/6 2xl:h-5/6"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
