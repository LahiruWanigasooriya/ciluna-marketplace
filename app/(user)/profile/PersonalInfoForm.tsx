"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TextField } from "@/components/ui/text-field";
import { FormValues } from "@/types/profile";
//import Tel from "@/components/custom/Phone";
//import Country from "@/components/custom/CountryDropdown";
//import GenderDropdown from "@/components/custom/GenderDropdown";
import { Button } from "@/components/ui/button";
import User from "@/public/assets/user.png";
import { FileTrigger } from "@/components/custom/FileTrigger";
import { uploadImage } from "@/backend/actions/utils/cloudinary";
import { toast } from "sonner";
import { updateUserProfile } from "@/backend/actions/users/user";
import { UpdateUserResponse } from "@/types/user";
import { ValidationError } from "yup";
import { profileValidationSchema } from "@/schemas/validationSchemas";
import { BiPencil } from "react-icons/bi";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { formatDate } from "@/utils/formatTime";
import { DatePicker } from "@/components/ui";
import { useUserStore } from "@/store/userStore";

// ✅ Define error state type
type FormErrors = Partial<Record<keyof FormValues, string>>;

interface PersonalInfoFormProps {
	initialData: FormValues;
	onProfileUpdate: (updatedUser: FormValues) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData, onProfileUpdate }) => {
	const [values, setValues] = useState<FormValues>(initialData);
	const [profileImageUrl, setProfileImageUrl] = useState(initialData?.profileImage || User);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [editing, setEditing] = useState(false);
	const [imageUploading, setImageUploading] = useState(false);
	const { setUser } = useUserStore();

	const handleChange = (field: keyof FormValues, value: string | Date | null) => {
		setValues((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: undefined })); // ✅ Clears error when typing
	};

	const handleProfileImageChange = async (file: File) => {
		setImageUploading(true);
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
			setImageUploading(false);
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

			if (response.success && response.user) {
				toast.success("Profile updated successfully!");
				setValues(response.user as FormValues);
				setUser(response.user);
				onProfileUpdate(response.user as FormValues);
				setEditing(false);
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

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleCancelClick = () => {
		setEditing(false);
		setValues(initialData);
		setProfileImageUrl(initialData?.profileImage || User);
		setErrors({});
	};

	// A listner to catch email change from another tab immediately
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === "current-email" && event.newValue) {
				console.log("Storage event detected:", event.newValue);
				setValues((prevValues) => ({
					...prevValues,
					email: event.newValue || values.email,
				}));
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return (
		<form onSubmit={handleSubmit} className="flex justify-between flex-col gap-6 w-full text-black font-arial">
			<div className="flex flex-col md:flex-row gap-4 justify-between text-sm leading-5">
				<div className="gap-4 flex">
					<Image
						src={profileImageUrl}
						alt="User"
						width={74}
						height={74}
						className="rounded-full w-[74px] h-[74px] object-contain"
					/>
					<div className="flex justify-center flex-col">
						<div className="font-arialBold text-[16px] leading-6">
							{values.firstName} {values.lastName}
						</div>
						<div className="mt-[2px] text-sm leading-5">Created On: {formatDate(values.createdAt) || "N/A"}</div>
					</div>
				</div>
				<div className="flex justify-between mg:justify-end items-center gap-4 font-arialBold">
					<button
						type="button"
						className={`flex min-w-fit items-center ${editing ? "hidden" : "block"}`}
						onClick={handleEditClick}
					>
						<BiPencil className="!w-6 !h-6 mr-2" /> Edit Details
					</button>
					<div className="flex min-w-fit">
						<FileTrigger onFileChange={handleProfileImageChange} isDisabled={!editing} />
					</div>
				</div>
			</div>
			<div className="h-[1px] bg-neutralGray-100 w-full"></div>

			<div
				className={`grid grid-cols-1 lg:grid-cols-2 gap-6 w-full text-[14px] leading-5 ${editing ? "hidden" : "block"}`}
			>
				<div className="flex justify-between">
					<div>First Name</div>
					<div className="font-arialBold">{values.firstName}</div>
				</div>
				<div className="flex justify-between">
					<div>Last Name</div>
					<div className="font-arialBold">{values.lastName}</div>
				</div>
				<div className="flex justify-between">
					<div>Date of Birth</div>
					<div className="font-arialBold">{values.dateofbirth ? formatDate(values.dateofbirth) : "N/A"}</div>
				</div>
				<div className="flex justify-between">
					<div>Email</div>
					<div className="font-arialBold">{values.email}</div>
				</div>
			</div>

			<div className={`w-full space-y-8 ${editing ? "block" : "hidden"}`}>
				<div className={`grid gap-6 w-full grid-cols-1 lg:grid-cols-2`}>
					<div>
						<TextField
							label="First Name*"
							placeholder="First Name"
							className="custom-textfield"
							inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray !p-3"
							groupClassName="border border-[#E1E1E1]"
							value={values.firstName}
							onChange={(value) => handleChange("firstName", value)}
						/>
						{errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
					</div>
					<div>
						<TextField
							label="Last Name*"
							placeholder="Last Name"
							className="custom-textfield"
							inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray !p-3"
							groupClassName="border border-[#E1E1E1]"
							value={values.lastName}
							onChange={(value) => handleChange("lastName", value)}
						/>
						{errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
					</div>
					<div>
						<label className=" [&_label]:!text-base [&_label]:!leading-6 text-[#252525] font-medium mb-2 block ">
							Date of Birth*
						</label>
						<DatePicker
							className="w-full [&_input]:!text-[14px] leading-[20px] border-none"
							maxValue={today(getLocalTimeZone())}
							defaultValue={
								values.dateofbirth ? parseDate(new Date(values.dateofbirth).toISOString().split("T")[0]) : null
							}
							onChange={(value) => {
								const date = value ? value.toDate("UTC") : null;
								handleChange("dateofbirth", date);
							}}
						/>
						{errors.dateofbirth && <p className="text-red-500 text-xs">{errors.dateofbirth}</p>}
					</div>
					<div className="flex justify-between items-end gap-2">
						<TextField
							label="Email*"
							placeholder="Email"
							className="custom-textfield w-full"
							inputClassName="!bg-obsidian-50 rounded-[8px] h-[44px] !text-neutralGray-500 !border-none cursor-not-allowed !p-3"
							groupClassName="border-none"
							value={values.email}
							isDisabled={true}
						/>
						{errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
						<Button
							className="!px-[12px] md:!px-[20px] !py-[10px] !text-[18px] !leading-6 h-auto bg-black text-white hover:bg-obsidian-900 border-none"
							intent="primary"
							onClick={() => window.open("/change-email", "_blank", "noopener,noreferrer")}
						>
							<BiPencil className="!w-6 !h-6 md:hidden" />
							<div className="hidden md:block">Change</div>
						</Button>
					</div>
				</div>
				<div className="flex justify-center md:justify-start items-center gap-3 md:gap-6 w-full">
					<Button
						className="!px-0 md:!px-8 !py-4 !text-[18px] !leading-6 h-auto hover:!border-neutralGray-700 w-full md:w-fit"
						type="reset"
						onClick={handleCancelClick}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						isDisabled={loading || imageUploading}
						className="!px-0 md:!px-8 !py-4 !text-[18px] !leading-6 h-auto bg-black text-white hover:bg-obsidian-900 border-none w-full md:w-fit"
						intent="secondary"
					>
						{loading ? "Saving..." : "Save Changes"}
					</Button>
				</div>
			</div>
		</form>
	);
};

export default PersonalInfoForm;
