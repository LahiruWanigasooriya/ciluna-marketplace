"use client";

import React, { useState } from "react";
import { Button, TextField, Textarea } from "@/components/ui";
import Tel from "@/components/custom/Phone";
import { createInquiry } from "@/actions/inquiries/inquiry";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { contactValidationSchema } from "@/schemas/validationSchemas";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitting(true);
    setIsLoading(true);

    if (
      !formData.email ||
      !formData.name ||
      !formData.phone ||
      !formData.message
    ) {
      setIsLoading(false);
      return;
    }

    try {
      await contactValidationSchema.validate(formData, { abortEarly: false });

      const response = await createInquiry({
        name: formData.name,
        email: formData.email,
        contactNo: formData.phone,
        message: formData.message,
      });
      if (response?.success) {
        setIsLoading(false);
        toast.success(response.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSuccess(true);
        setErrors({});
      } else {
        toast.error(response.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An error occurred while submitting your inquiry.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between w-full gap-[12px] recommend:gap-[16px]">
        <div className="w-full">
          <TextField
            label="Your Name"
            className="custom-textfield w-full"
            placeholder="Full Name"
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={(value: string) => handleChange("name", value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs ml-1">{errors.name}</p>
          )}
        </div>

        <div className="w-full">
          <TextField
            label="Email"
            className="custom-textfield w-full"
            placeholder="Email Address"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(value: string) => handleChange("email", value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs ml-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <Tel
            value={formData.phone}
            onChange={(phone: string) => handleChange("phone", phone)}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs ml-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <Textarea
          label="Message"
          placeholder="Message"
          className="custom-textfield"
          name="message"
          value={formData.message}
          onChange={(value: string) => handleChange("message", value)}
        />
        {errors.message && (
          <p className="text-red-500 text-xs ml-1">{errors.message}</p>
        )}
      </div>
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
            <Loader2 size={16} className="animate-spin mr-1" /> Send Message
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
