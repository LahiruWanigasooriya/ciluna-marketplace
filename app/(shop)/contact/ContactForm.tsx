"use client";

import React, { useState } from "react";
import { Button, Checkbox, TextField, Textarea } from "@/components/ui";
import { createInquiry } from "@/backend/actions/inquiries/inquiry";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { contactValidationSchema } from "@/schemas/validationSchemas";
import { toast } from "sonner";
import { FiFacebook, FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";

type FormErrors = {
	name?: string;
	email?: string;
	message?: string;
};

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when user types
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors({});

		try {
			await contactValidationSchema.validate(formData, { abortEarly: false });

			const response = await createInquiry({
				name: formData.name,
				email: formData.email,
				message: formData.message,
			});
			if (response?.success) {
				setIsLoading(false);
				toast.success(response.message);
				setFormData({ name: "", email: "", message: "" });
				setErrors({});
			} else {
				toast.error(response.message || "Submission failed. Please try again.");
			}
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				// Handle validation errors
				const newErrors = error.inner.reduce<FormErrors>((acc, err) => {
					if (err.path) acc[err.path as keyof FormErrors] = err.message;
					return acc;
				}, {});
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
		<div className="flex flex-col lg:flex-row gap-8 w-full mb-8 lg:mb-0 text-black">
			<form onSubmit={handleSubmit} className="w-full flex flex-[581] md:min-w-[343px] lg:max-w-[581px] font-arial">
				<div className="flex flex-col gap-4 p-4 md:p-6 rounded-[8px]  bg-neutralGray-50 w-full">
					<div className="flex flex-col items-start justify-between w-full gap-[24px]">
						<div className="w-full">
							<TextField
								label="Your Name*"
								placeholder="Enter your name here..."
								className="custom-textfield w-full"
								inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border-none hover:ring-1 focus:ring-1 focus:ring-neutralGray-100 hover:ring-neutralGray-100"
								groupClassName="border-none"
								name="name"
								id="name"
								type="text"
								value={formData.name}
								onChange={(value: string) => handleChange("name", value)}
							/>
							{errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
						</div>

						<div className="w-full">
							<TextField
								label="Email Address*"
								className="custom-textfield w-full"
								inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border-none hover:ring-1 focus:ring-1 focus:ring-neutralGray-100 hover:ring-neutralGray-100"
								groupClassName="border-none"
								placeholder="Enter your email here..."
								name="email"
								id="email"
								type="email"
								value={formData.email}
								onChange={(value: string) => handleChange("email", value)}
							/>
							{errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
						</div>

						<div className="w-full">
							<Textarea
								label="Message*"
								placeholder="Type your message here..."
								className="custom-textfield h-[141px] rounded-[8px] placeholder-[#707070] !text-gray border-none hover:ring-1 focus:ring-1 focus:ring-neutralGray-100 hover:ring-neutralGray-100"
								name="message"
								value={formData.message}
								onChange={(value: string) => handleChange("message", value)}
							/>
							{errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
						</div>
					</div>
					<div className="flex">
						<Checkbox>
							<div className="text-[14px] leading-[20px]">Keep me up to date on news and events.</div>
						</Checkbox>
					</div>
					<div className="flex gap-4 mt-4">
						<Button
							type="reset"
							className="w-full transition-opacity duration-300 h-[56px] font-arial !text-[18px] !leading-[24px] text-black border-black hover:!border-neutralGray-700"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className={`w-full transition-opacity duration-300 h-[56px] bg-black hover:bg-obsidian-900 text-white font-arial !text-[18px] !leading-[24px] ${
								isLoading ? "opacity-80" : ""
							}`}
							isDisabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 size={16} className="animate-spin mr-1" /> Send Message
								</>
							) : (
								"Send"
							)}
						</Button>
					</div>
				</div>
			</form>
			<div className="w-full lg:w-[200px] xl:w-[363px] text-black space-y-6 font-[Arial] flex flex-col flex-[363]">
				<div className="space-y-2">
					<div className="text-[24px] leading-[32px] font-arialBold">Contact Us</div>
					<div className="text-neutralGray-700 text-[14px] leading-[20px]">
						We'd love to hear from you! Whether you have a question about our products, need assistance with an order,
						or have feedback to share, we're here to help.
					</div>
				</div>
				<div className="gap-3">
					<div className="flex gap-2 items-center">
						<MdOutlineMailOutline size={20} /> support@ciluna.com
					</div>
					<div className="flex gap-2 items-center">
						<FiPhone size={20} /> +94 123 456 789
					</div>
				</div>
				<div className="space-y-4">
					<span className="text-[18px] leading-[24px] font-arialBold ">Follow Us</span>
					<div className="flex gap-4">
						<div className="bg-black w-10 h-10 flex items-center justify-center rounded-[8px]">
							<FaInstagram size={24} className="text-white" />
						</div>
						<div className="bg-black w-10 h-10 flex items-center justify-center rounded-[8px]">
							<FiFacebook size={24} className="text-white" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
