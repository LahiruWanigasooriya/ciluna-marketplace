"use client";

import { useState } from "react";
import Image from "next/image";
import { TextField } from "@/components/ui/text-field";
import { FormValues } from "@/types/profile";
import Tel from "@/components/custom/Phone";
import Country from "@/components/custom/CountryDropdown";
import GenderDropdown from "@/components/custom/GenderDropdown";
import { Button } from "@/components/ui/button";
import User from "@/public/assets/user.png";
import { FileTrigger } from "@/components/custom/FileTrigger";
import { uploadImage } from "@/actions/utils/cloudinary";
import { toast } from "sonner";
import { updateUserProfile } from "@/actions/users/user";
import { UpdateUserResponse } from "@/types/user";
import { ValidationError } from "yup";
import { profileValidationSchema } from "@/schemas/validationSchemas";

// ✅ Define error state type
type FormErrors = Partial<Record<keyof FormValues, string>>;

interface PersonalInfoFormProps {
  initialData: FormValues;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData }) => {
  const [values, setValues] = useState<FormValues>(initialData);
  const [profileImageUrl, setProfileImageUrl] = useState(
    initialData?.profileImage || User
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // ✅ Clears error when typing
  };

  const handleProfileImageChange = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      if (!reader.result || typeof reader.result !== "string") {
        toast.error("Failed to process image.");
        return;
      }

      setProfileImageUrl(URL.createObjectURL(file)); // Temporary preview

      try {
        const uploadedUrl = await uploadImage(reader.result); // Upload to Cloudinary
        if (uploadedUrl) {
          setProfileImageUrl(uploadedUrl); // Store the Cloudinary URL
          handleChange("profileImage", uploadedUrl);
        } else {
          toast.error("Image upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Image upload error. Try again.");
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read file.");
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // ✅ Validate form data
      await profileValidationSchema.validate(values, { abortEarly: false });

      // ✅ Call API
      const response: UpdateUserResponse = await updateUserProfile(values);

      if (response.success) {
        toast.success("Profile updated successfully!");
        setValues((prev) => ({ ...prev, ...values }));
      } else {
        toast.error(`❌ ${response.message}`);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        // ✅ Handle validation errors
        const newErrors = error.inner.reduce<FormErrors>((acc, err) => {
          if (err.path) acc[err.path as keyof FormValues] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        console.error("Update error:", error);
        toast.error("❌ Error updating profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-6">
      <div className="flex xl:flex-row justify-between flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden mx-auto">
            <Image
              src={profileImageUrl}
              alt="User"
              width={200}
              height={200}
              className="rounded-full"
            />
            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7">
              <FileTrigger onFileChange={handleProfileImageChange} />
            </div>
          </div>
          <p className="md:hidden font-interSemiBold text-base lg:text-lg">
            Personal Information
          </p>
          <div className="">
            <TextField
              label="Nick Name"
              placeholder="Nick Name"
              className="custom-textfield w-full"
              value={values.nickName}
              onChange={(value) => handleChange("nickName", value)}
            />
          </div>

          <div>
            <TextField
              label="Email Address"
              placeholder="Email"
              className="custom-textfield w-full"
              value={values.email}
              onChange={(value) => handleChange("email", value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div>
            <TextField
              label="Address Line 1"
              placeholder="Address line 1"
              className="custom-textfield w-full"
              value={values.addressLine1}
              onChange={(value) => handleChange("addressLine1", value)}
            />
          </div>
          <div>
            <TextField
              label="City"
              placeholder="City"
              className="custom-textfield w-full"
              // value={values.city}
              // onChange={(value) => handleChange("addressLine1", value)}
            />
          </div>

          <div>
            <Country
              value={values.country}
              onChange={(field, value) =>
                handleChange(field as keyof FormValues, value)
              }
            />
            {errors.country && (
              <p className="text-red-500 text-xs">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <p className="hidden md:block font-interSemiBold text-base lg:text-lg">
            Personal Information
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <TextField
                label="First Name"
                placeholder="First Name"
                className="custom-textfield w-full"
                value={values.firstName}
                onChange={(value) => handleChange("firstName", value)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>

            <div>
              <TextField
                label="Last Name"
                placeholder="Last Name"
                className="custom-textfield w-full"
                value={values.lastName}
                onChange={(value) => handleChange("lastName", value)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>

            <div>
              <GenderDropdown
                selectedGender={values.gender}
                onSelectGender={(gender) => handleChange("gender", gender)}
              />
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>

            <div>
              <Tel
                value={values.contactNo}
                onChange={(value) => handleChange("contactNo", value)}
              />
              {errors.contactNo && (
                <p className="text-red-500 text-xs">{errors.contactNo}</p>
              )}
            </div>

            <TextField
              label="Address Line 2"
              placeholder="Address Line 1"
              className="custom-textfield w-full"
              value={values.addressLine2}
              onChange={(value) => handleChange("addressLine2", value)}
            />
            <TextField
              label="State / Province"
              className="custom-textfield"
              placeholder="State / Province"
              name="state"
              id="state"
              type="text"
              // value={values.state}
              // onChange={(value: string) => handleChange("state", value)}
            />
            <TextField
              label="Postal code"
              className="custom-textfield"
              placeholder="Zip Code"
              name="zip"
              id="zip"
              type="number"
              // value={values.zip}
              // onChange={(value: string) => handleChange("zip", value)}
            />
          </div>

          <div className="flex justify-center md:justify-end items-center gap-4 md:pt-4 w-full">
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full md:w-36 bg-purple"
            >
              {loading ? "Saving..." : "Save"}
            </Button>

            <button className="w-full  md:w-36 bg-[#FFFFFF]/5 h-10 rounded-[10px] hover:bg-[#FFFFFF]/10 text-sm">
              Cancle
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
