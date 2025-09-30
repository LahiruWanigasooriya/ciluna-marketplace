"use client";

import React, { useState } from "react";
import Image from "next/image";
import {  Loader2,Info } from "lucide-react";
import Title from "@/components/custom/Title";
import { TextField, DatePicker,Button, Checkbox } from "@/components/ui";

// import { TextField, Button, DatePicker,Checkbox } from "@/components/ui";
import Link from "next/link";
import Tel from "@/components/custom/Phone";
import { signupValidationSchema } from "@/schemas/validationSchemas";
import { createNewUser } from "@/actions/users/user";
import { useRouter } from "next/navigation";
import { ValidationError } from "yup";
import { toast } from "sonner";
import CountryDropdown from "@/components/custom/CountryDropdown";
import { DateField } from "react-aria-components";
import type {DateValue} from "react-aria-components";
import { policyConfig } from "@/config/policy";
import {parseDate} from "@internationalized/date";
import bgpattern from "@/public/assets/login/bgpattern.png";
import TitleLabelDropdown from "@/components/TitleDropDown";
import {CalendarWithYearPicker} from "@/components/custom/CalendarWithYearPicker";


type FormData = {
  titlelabel:string;
  firstName: string;
  lastName: string;
  email: string;
  confirmemail:string; 
  phone: string;
  password: string;
  confirmpassword: string;
  remember: boolean;
  dateofbirth: DateValue | null;
  country: string;
  recieveUpdates:boolean;
  personalizedOffers:boolean;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const useForm = (initialState: FormData) => {
  const [formData, setFormData] = React.useState<FormData>(initialState);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string | boolean | Date | DateValue | null) => {
    let actualValue = value;
    if (field === "dateofbirth" && value instanceof Date) {
      actualValue = parseDate(value.toISOString().split("T")[0]);
    }
    setFormData((prev) => ({ ...prev, [field]: actualValue }));
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
  handleChange: (field: keyof FormData, value: string | boolean | Date | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSuccess: boolean;

}) => {
  return (
    
    <div className="w-full max-w-[598px] !min-w-[343px]  mx-auto">

    <form
      onSubmit={handleSubmit}
      className="max-w-[598px] min-w-[343px] mx-auto rounded-[9px]  flex flex-1 flex-col space-y-6 w-full bg-[#FFFFFF]/5"
    >
      <div className="flex items-center justify-center space-x-2 text-[#252525] mt-16 w-full">
        
        <Title title="Create Account" className="font-kaiseiHarunoUmi font-bold  !text-2xl !leading-[32px] md:!text-[26px] md:!leading-[32px] lg:!text-[28px] lg:!leading-[32px]" />
      </div>



      <div className="flex flex-col space-y-6 lg:space-y-4 font-arial">

         <div>
          <TitleLabelDropdown
            value={formData.titlelabel}
            onChange={(_field: string, value: string) => handleChange("titlelabel", value)}
           
          />
          {errors.titlelabel && <p className="text-red-500 text-xs">{errors.titlelabel}</p>}
        </div>



        <div className="flex flex-col gap-6 sm:gap-2  sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 ">
          <TextField
            label="First Name*"
            placeholder="Enter first name"
            value={formData.firstName}
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_label]:border-none [&_input]:!text-sm leading-5 [&_input]:p-3"
            onChange={(value: string) => handleChange("firstName", value)}
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>

        <div className="flex-1">
          <TextField
            label="Last Name*"
            placeholder="Enter last name"
            value={formData.lastName}
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
            onChange={(value: string) => handleChange("lastName", value)}
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>
        </div>
       

      <div className="w-full">
        <label className=" [&_label]:!text-base [&_label]:!leading-6 text-[#252525] font-medium mb-2 block ">
          Date of Birth*
        </label>
                    <DatePicker
                className="w-full [&_input]:!text-[14px] leading-[20px] [&_input]:!p-3 [&_input]:!text-[#252525]"
                placeholder="Select date of birth"
                onChange={(value: DateValue | null) => {
                  const date = value ? value.toDate("UTC") : null;
                  handleChange("dateofbirth", date);
                }}
                value={
                  formData.dateofbirth instanceof Date
                    ? parseDate(formData.dateofbirth.toISOString().split("T")[0])
                    : formData.dateofbirth
                }
/>
                        {errors.dateofbirth && (
          <p className="text-red-500 text-xs mt-1">{errors.dateofbirth}</p>
        )}

      </div>

        <div className="w-full">
          <CountryDropdown
            value={formData.country}
            onChange={(_field: string, value: string) => handleChange("country", value)}
            
          />
          {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
        </div>

        <div>
          <TextField
            label="Email*"
            placeholder="Enter email"
            value={formData.email}
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
            onChange={(value: string) => handleChange("email", value)}
          />
          
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <TextField
            label="Confirm Email*"
            placeholder="Enter email again"
            value={formData.confirmemail}
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
            onChange={(value: string) => handleChange("confirmemail", value)}
          />
          {errors.confirmemail && <p className="text-red-500 text-xs">{errors.confirmemail}</p>}
        </div>

        <div>
          <Tel value={formData.phone} onChange={(phone: string) => handleChange("phone", phone)} 
          className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3 !p-3" />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <div className="relative w-full ">
          <label className="mb-2 [&_label]:!text-base [&_label]:!leading-6 text-[#252525] font-arial flex items-center gap-2 !mt-0 ">
            Password* 
            <div className="relative group cursor-pointer ">  
              <Info  className="h-[18px] w-[18px] text-black" />
              <div className="absolute left-6 top-1/2 mt-0 mb-0 -translate-y-1/2 bg-gray-500 text-black text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Password must contain 8 characters.
              </div>
              </div>
          
          </label>
          <TextField
            type="password"
            isRevealable
            placeholder="Enter your password"
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
            value={formData.password}
            onChange={(value: string) => handleChange("password", value)}
          
          />

          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

          <div>
          <TextField
            type="password"
            isRevealable
            label="Confirm Password*"
            placeholder="Confirm  your password"
            value={formData.confirmpassword}
            className="w-full [&_label]:!text-base [&_label]:!leading-6 [&_input]:!text-sm leading-5 [&_input]:p-3"
            onChange={(value: string) => handleChange("confirmpassword", value)}
          />
          {errors.confirmpassword && <p className="text-red-500 text-xs">{errors.confirmpassword}</p>}
        </div>

        <div className="flex flex-col gap-[16px] max-w-[572px] min-w-[343px]">
            <Checkbox
              isSelected={formData.recieveUpdates}
              onChange={(isSelected: boolean) =>
                  handleChange("recieveUpdates", isSelected)
                  }
                    >

            <p className="font-arial text-[#252525] text-sm block min-w-[311px] max-w-[566px] h-[40px] sm:h-[20px]">I agree to receive CILUNA updates and promotions as per the Privacy Policy.</p>
             

            </Checkbox>

           <Checkbox
              isSelected={formData.personalizedOffers}
              onChange={(isSelected: boolean) =>
                  handleChange("personalizedOffers", isSelected)
                  }
                    >
              <p className="font-arial text-[#252525] text-sm block min-w-[311px] max-w-[566px] h-[40px] sm:h-[20px]">I consent to personalized offers from CILUNA based on my preferences.</p>
            </Checkbox>
            <Link href="">
            <p className=" font-arial text-black text-sm block w-full h-[60px] sm:h-[40px]">By creating an account, you accept our Terms and Conditions and confirm that you have read our <span className="text-sm font-arialBold"> Privacy Policy.</span></p>

            </Link>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center mx-auto w-full">
          <Button
            type="submit"
            isDisabled={!(formData.recieveUpdates && formData.personalizedOffers) || isLoading || isSuccess}

            className={` w-full !h-[56px] font-arial font-normal !text-lg leading-6 !py-4 !px-8 bg-[#252525] hover:bg-obsidian-900 text-white transition-opacity duration-300 ${
                isLoading ? "opacity-80" : ""
            }
            ${!(formData.recieveUpdates && formData.personalizedOffers) ? "cursor-not-allowed" :""}`}
          >
            {isLoading && <Loader2 size={16} className="animate-spin mr-1 " />}

            Create Account
          </Button>


          <div className="flex items-center justify-center space-x-2 mt-5 pb-6">
            <p className="text-[#252525] font-arial text-base leading-[24px] sm:leading-[20px]">Already have a CILUNA account? </p>
            <Link href="/login">
              <p className="text-[#252525] cursor-pointer font-arialBold leading-[24px] sm:leading-[20px] text-base hover:opacity-75">Login</p>
            </Link>
          </div>
        </div>
      </div>
    </form>
     </div>
  );
};

const SignupPage: React.FC = () => {
  const router = useRouter();

  const { formData, errors, setErrors, handleChange } = useForm({
    titlelabel:"",
    firstName: "",
    lastName: "",
     dateofbirth:null,
    country: "",
    email: "",
    confirmemail:"",
    phone: "",
    password: "",
    confirmpassword:"",
    remember: false,
    recieveUpdates:false,
    personalizedOffers:false,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupValidationSchema.validate(formData, { abortEarly: false });

      const { firstName, lastName, email, password, phone, dateofbirth, country} = formData;
      const contactNo = phone;
      let dateOfBirthAsDate: Date | null = null;
      if (dateofbirth) {
        dateOfBirthAsDate = dateofbirth.toDate("UTC"); //convert DateValue to date object
      }
      const res = await createNewUser({ firstName, lastName, email, password, contactNo, dateofbirth: dateOfBirthAsDate, country });

      if (res.success) {
        setIsSuccess(true);
        toast.success("User created successfully!");
        router.push("/");
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
      setIsLoading(false);
    }
  };

  return (
<>

    <div className="hidden sm:block">
      <div className="absolute right-0 top-32 h-[301px] w-[320px] z-20">
        <Image
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right"
          priority
        />
      </div>
      
      <div className="absolute left-0 bottom-0 h-[301px] w-[320px] z-20">
        <Image
          src={bgpattern}
          alt="background pattern"
          fill
          className="object-right transform scale-x-[-1]"
          priority
        />
      </div>
    </div>

    {/* Main content */}
    <div className="flex flex-col min-h-screen bg-white text-black overflow-auto relative z-10">
      <main className="flex-grow flex justify-center mt-10 sm:mt-8 sm:pt-16 p-4 relative">
        <SignupForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </main>
    </div>
  </>
    );
  }

  export default SignupPage;