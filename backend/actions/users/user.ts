"use server";

import bcrypt from "bcryptjs";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import UserModel from "../../models/user";
import UserVerificationModel from "../../models/userVerification";
import { GetUserParams, GetUsersResponse, IUser, OtpType, UpdateUserResponse } from "@/types/user";
import { verifyToken } from "../utils/auth";
import { cookies } from "next/headers";
import { emailTemplates } from "../utils/emailTemplates";
import { sendEmail } from "../utils/sendEmail";

const secretKey: string = process.env.JWT_SECRET_KEY || "";

if (!secretKey) {
	throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}

const passwordCriteria = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const contactNoCriteria = /^\+\d{1,4}\d{7,11}$/;

const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getUserById = async (userId: string) => {
	try {
		await dbConnectMarketPlace();

		if (!userId) {
			return {
				status: 400,
				success: false,
				message: "User ID is required",
			};
		}

		// Find the product and populate related fields
		const user = await UserModel.findById(userId);
		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found",
			};
		}

		return {
			status: 200,
			success: true,
			message: "User fetched successfully",
			data: {
				user: JSON.parse(JSON.stringify(user)),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching the category",
			error: error.message,
		};
	}
};

export async function createNewUser(user: IUser) {
	try {
		await dbConnectMarketPlace();

		// Validate email
		if (!emailCriteria.test(user.email)) {
			return {
				status: 400,
				message: "Invalid email format!",
			};
		}

		// Check if the email already exists
		const existingUser = await UserModel.findOne({ email: user.email });
		if (existingUser) {
			return {
				status: 400,
				message: "Email already exists!",
			};
		}

		// Validate password
		if (!passwordCriteria.test(user.password)) {
			return {
				status: 400,
				message:
					"Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
			};
		}

		// Validate contact number
		if (!contactNoCriteria.test(user.contactNo)) {
			return {
				status: 400,
				message: "Contact number must start with '+' followed by a valid country code and 7-11 digits.",
			};
		}

		// Hash the user's password
		const hashedPassword = await bcrypt.hash(user.password, 10);

		// Create a new user instance
		const newUser = new UserModel({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: hashedPassword,
			contactNo: user.contactNo,
			dateofbirth: user.dateofbirth,
			country: user.country,
		});

		// Save the new user to the database
		const savedUser = await newUser.save();

		// Send welcome email
		try {
			const { subject, html } = emailTemplates.welcomeEmail(
				`${savedUser.firstName} ${savedUser.lastName}`.trim() || "User"
			);
			await sendEmail(savedUser.email, subject, html);
		} catch (emailError) {
			console.error("Error sending welcome email:", emailError);
		}

		return {
			status: 200,
			success: true,
			message: "User added successfully",
			user: JSON.parse(JSON.stringify(savedUser)),
		};
	} catch (error: unknown) {
		console.error("Error in createNewUser:", error);

		// Check if error is an instance of Error
		if (error instanceof Error) {
			return {
				status: 500,
				message: "Internal server error",
				error: error.message, // Safe to access error.message because we checked the type
			};
		}

		// Handle case where error is not an instance of Error
		return {
			status: 500,
			message: "Internal server error",
			error: "An unknown error occurred", // Provide a generic message
		};
	}
}

export async function checkUserAndGenerateToken({ email, password }: { email: string; password: string }) {
	try {
		await dbConnectMarketPlace();

		// Validate email format
		if (!emailCriteria.test(email)) {
			return {
				status: 400,
				message: "Invalid email format!",
			};
		}

		// Find the user in the database
		const existingUser = await UserModel.findOne({ email });

		if (!existingUser) {
			return {
				status: 404,
				message: "User not found",
			};
		}

		if (existingUser.activeStatus === false) {
			return {
				status: 403,
				message: "You have no permission to access",
			};
		}

		// Compare the password
		const isPasswordValid = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordValid) {
			return {
				status: 401,
				message: "Invalid password",
			};
		}

		// Update last login timestamp
		await UserModel.findByIdAndUpdate(existingUser._id, {
			lastLogin: new Date(),
		});

		// Generate a JWT token
		const token = jwt.sign(
			{
				userId: existingUser?._id,
				name: `${existingUser?.firstName || ""} ${existingUser?.lastName || ""}`.trim(),
				email: existingUser?.email,
			},
			secretKey,
			{ expiresIn: "1h" }
		);

		return {
			status: 200,
			success: true,
			message: "User authenticated successfully",
			data: {
				token,
				userName: `${existingUser?.firstName || ""} ${existingUser?.lastName || ""}`.trim(),
			},
		};
	} catch (error: unknown) {
		console.error("Error in checkUserAndGenerateToken:", error);

		if (error instanceof Error) {
			return {
				status: 500,
				message: "Internal server error",
				error: error.message,
			};
		}

		return {
			status: 500,
			message: "Internal server error",
			error: "An unknown error occurred",
		};
	}
}

export async function resetPassword(email: string, tempPassword: string) {
	try {
		await dbConnectMarketPlace();

		const user = await UserModel.findOne({ email });

		if (!user) {
			return {
				status: 404,
				message: "User not found",
			};
		}

		// Encrypt the temporary password
		const hashedPassword = await bcrypt.hash(tempPassword, 10);

		// Update the user's password in the database
		user.password = hashedPassword;
		await user.save();

		return {
			status: 200,
			success: true,
			message: "Password updated successfully",
			userName: user.firstName + " " + user.lastName || "User",
		};
	} catch (error: any) {
		console.error("Error in resetPassword:", error);
		return {
			status: 500,
			message: "Internal server error",
			error: error.message,
		};
	}
}

export async function changePassword(oldPassword: string, newPassword: string, token?: string) {
	try {
		await dbConnectMarketPlace();

		// Get token from cookies if not provided
		const authToken = token || (await cookies()).get("authToken")?.value;

		if (!authToken) {
			return {
				status: 401,
				success: false,
				message: "Unauthorized: No token provided",
				user: null,
			};
		}

		// Verify the token and extract user info
		const verifiedUser = await verifyToken(authToken);
		if (verifiedUser.status !== 200) {
			return {
				status: verifiedUser.status,
				success: false,
				message: verifiedUser.message || "Token verification failed",
				user: null,
			};
		}

		const { userId } = verifiedUser;

		// Find the user by ID
		const user = await UserModel.findById(userId);
		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found",
			};
		}

		// Check if the old password matches
		const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
		if (!isPasswordValid) {
			return {
				status: 400,
				success: false,
				message: "Incorrect old password",
			};
		}

		// Prevent setting the same password
		const isSamePassword = await bcrypt.compare(newPassword, user.password);
		if (isSamePassword) {
			return {
				status: 400,
				success: false,
				message: "New password cannot be the same as the old password.",
			};
		}

		// Validate new password format
		if (!passwordCriteria.test(newPassword)) {
			return {
				status: 400,
				success: false,
				message:
					"New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
			};
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update user's password
		user.password = hashedPassword;
		await user.save();

		return {
			status: 200,
			success: true,
			message: "Password changed successfully",
		};
	} catch (error: unknown) {
		console.error("Error in changePassword:", error);

		return {
			status: 500,
			success: false,
			message: "Internal server error",
		};
	}
}

export async function getUserProfile(token?: string) {
	try {
		await dbConnectMarketPlace();

		// If token is not provided, get it from cookies
		const authToken = token || (await cookies()).get("authToken")?.value;

		if (!authToken) {
			return {
				status: 401,
				success: false,
				message: "Unauthorized: No token provided",
				user: null,
			};
		}

		// Verify the token and extract user info
		const verifiedUser = await verifyToken(authToken);

		if (verifiedUser.status !== 200) {
			return {
				status: verifiedUser.status,
				success: false,
				message: verifiedUser.message || "Token verification failed",
				user: null,
			};
		}

		const { userId } = verifiedUser;
		const user = await UserModel.findById(userId).select("-password");

		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found",
				user: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "User profile fetched successfully",
			user: JSON.parse(JSON.stringify(user)),
		};
	} catch (error) {
		console.error("Error in getUserProfile:", error);

		return {
			status: 500,
			success: false,
			message: "Internal server error",
			user: null,
		};
	}
}

export const getAllUsers = async (queryOptions: Partial<GetUserParams> = {}): Promise<GetUsersResponse> => {
	try {
		await dbConnectMarketPlace();

		const { page = 1, limit = 15, search = "", filters = {}, sortBy = "createdAt", sortOrder = "desc" } = queryOptions;

		// Build query
		const query: any = {
			...filters,
		};

		// Add search functionality
		if (search) {
			query.$or = [{ firstName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
		}

		// Calculate pagination
		const skip = (page - 1) * limit;

		// Build sort object
		const sort: any = {};
		if (sortBy) {
			sort[sortBy] = sortOrder === "asc" ? 1 : -1;
		}

		// Fetch users and total count
		const [users, total] = await Promise.all([
			UserModel.find(query).select("-password").sort(sort).skip(skip).limit(limit).lean(),
			UserModel.countDocuments(query),
		]);

		if (!users || users.length === 0) {
			return {
				status: 404,
				success: false,
				message: "No users found",
				data: {
					users: null,
					total: 0,
					totalPages: 0,
					currentPage: page,
				},
			};
		}

		const totalPages = Math.ceil(total / limit);

		return {
			status: 200,
			success: true,
			message: "Users fetched successfully",
			data: {
				users: JSON.parse(JSON.stringify(users)),
				total,
				totalPages,
				currentPage: page,
			},
		};
	} catch (error: any) {
		console.error("Error in getAllUsers:", error);
		return {
			status: 500,
			success: false,
			message: "Internal server error",
			data: {
				users: null,
				total: 0,
				totalPages: 0,
				currentPage: queryOptions.page || 1,
			},
		};
	}
};

export async function updateUserProfile(updateData: Partial<IUser>, token?: string): Promise<UpdateUserResponse> {
	try {
		await dbConnectMarketPlace();
		const authToken = token || (await cookies()).get("authToken")?.value;

		if (!authToken) {
			return {
				status: 401,
				success: false,
				message: "Unauthorized: No token provided",
				user: null,
			};
		}

		const verifiedUser = await verifyToken(authToken);
		if (verifiedUser.status !== 200) {
			return {
				status: verifiedUser.status,
				success: false,
				message: verifiedUser.message || "Token verification failed",
				user: null,
			};
		}

		const { userId } = verifiedUser;

		const allowedFields: (keyof IUser)[] = [
			"firstName",
			"lastName",
			"nickName",
			"email", // ✅ Email is now updatable
			"profileImage",
			"gender",
			"addressLine1",
			"addressLine2",
			"country",
			"city",
			"postalCode",
			"contactNo",
			"dateofbirth",
			"notificationSettings",
		];

		// Filter only allowed fields from updateData
		const sanitizedUpdateData: Record<string, any> = {};
		for (const key of Object.keys(updateData) as (keyof IUser)[]) {
			if (allowedFields.includes(key)) {
				sanitizedUpdateData[key] = updateData[key];
			}
		}

		if (Object.keys(sanitizedUpdateData).length === 0) {
			return {
				status: 400,
				success: false,
				message: "No valid fields to update.",
				user: null,
			};
		}

		// ✅ If the user wants to update their email, check if it's already in use
		if (sanitizedUpdateData.email) {
			const existingUser = await UserModel.findOne({
				email: sanitizedUpdateData.email,
				_id: { $ne: userId },
			});
			if (existingUser) {
				return {
					status: 409, // Conflict
					success: false,
					message: "Email is already in use by another account.",
					user: null,
				};
			}
		}

		// ✅ Update the user and return the updated document (excluding password)
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{ $set: sanitizedUpdateData },
			{ new: true, select: "-password" } // Exclude password from response
		);

		if (!updatedUser) {
			return {
				status: 404,
				success: false,
				message: "User not found.",
				user: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Profile updated successfully.",
			user: JSON.parse(JSON.stringify(updatedUser)),
		};
	} catch (error: unknown) {
		console.error("Error in updateUserProfile:", error);
		return {
			status: 500,
			success: false,
			message: "Internal server error.",
			user: null,
		};
	}
}

export const deleteUser = async (userId: string) => {
	try {
		await dbConnectMarketPlace();

		if (!userId) {
			return {
				status: 400,
				success: false,
				message: "User ID is required",
			};
		}

		// Check if product exists
		const user = await UserModel.findById(userId);
		if (!user) {
			return {
				status: 404,
				success: false,
				message: "Product not found",
			};
		}

		// Delete the product
		await UserModel.findByIdAndDelete(userId);

		return {
			status: 200,
			success: true,
			message: "User deleted successfully",
		};
	} catch (error: any) {
		console.error("Error in deleteUser:", error);
		return {
			status: 500,
			success: false,
			message: "An error occurred while deleting the user",
			error: error.message,
		};
	}
};

export const sendOtp = async (email: string, verifyEmail: string, type: OtpType) => {
	try {
		await dbConnectMarketPlace();

		const user = await UserModel.findOne({ email });

		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found send otp",
			};
		}

		// Check if a recent OTP already exists (within last 15 seconds)
		const recentOtp = await UserVerificationModel.findOne({
			userId: user._id,
			type,
			createdAt: { $gte: new Date(Date.now() - 15 * 1000) },
		});

		if (recentOtp) {
			return {
				status: 429,
				success: true,
				message: "OTP already sent recently",
			};
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const hashedOtp = await bcrypt.hash(otp, 10);

		const newVerification = new UserVerificationModel({
			userId: user._id,
			otp: hashedOtp,
			type,
			newEmail: type === "verify_new" ? verifyEmail : null,
			expiresAt: new Date(Date.now() + 45 * 1000), // 45 sec expiry
		});

		await newVerification.save();

		try {
			const name = `${user.firstName} ${user.lastName}`.trim() || "User";

			const templates = {
				verify_current: emailTemplates.verifyCurrentEmail(name, otp),
				verify_new: emailTemplates.verifyNewEmail(name, verifyEmail, otp),
			};

			const template = templates[type];
			if (!template) throw new Error(`Invalid email type: ${type}`);

			const { subject, html } = template;
			await sendEmail(verifyEmail, subject, html);
		} catch (error) {
			console.error("Error sending verification code:", error);
		}

		return {
			status: 200,
			success: true,
			message: "OTP sent successfully",
		};
	} catch (error) {
		console.log("Error: ", error);
		return {
			status: 500,
			success: false,
			message: "Error sending otp",
		};
	}
};

export const verifyOtp = async (email: string, otp: string, type: OtpType) => {
	try {
		await dbConnectMarketPlace();

		const user = await UserModel.findOne({ email });

		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found verify",
			};
		}

		// Find the latest OTP for this user and type
		const verification = await UserVerificationModel.findOne({
			userId: user._id,
			type,
		}).sort({ createdAt: -1 });

		if (!verification) {
			return {
				status: 404,
				success: false,
				message: "OTP not found or expired",
			};
		}

		// Check expiry
		if (verification.expiresAt < new Date()) {
			await UserVerificationModel.deleteOne({ _id: verification._id });
			return {
				status: 400,
				success: false,
				message: "OTP expired",
			};
		}

		// Compare OTP
		const isMatch = await bcrypt.compare(otp, verification.otp);
		if (!isMatch) {
			return {
				status: 400,
				success: false,
				message: "Invalid OTP",
			};
		}

		// OTP verified successfully — delete the record
		await UserVerificationModel.deleteOne({ _id: verification._id });

		return {
			status: 200,
			success: true,
			message: "OTP verified successfully",
		};
	} catch (error) {
		console.error("Error verifying OTP:", error);
		return {
			status: 500,
			success: false,
			message: "Error verifying OTP",
		};
	}
};

export async function verifyPassword(email: string, password: string) {
	try {
		await dbConnectMarketPlace();

		// Find the user
		const user = await UserModel.findOne({ email });
		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found",
			};
		}

		if (user.activeStatus === false) {
			return {
				status: 403,
				success: false,
				message: "You have no permission to access",
			};
		}

		// Compare password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return {
				status: 401,
				success: false,
				message: "Invalid password",
			};
		}

		// Password correct
		return {
			status: 200,
			success: true,
			message: "Password verified successfully",
		};
	} catch (error: unknown) {
		console.error("Error in verifyPassword:", error);
		return {
			status: 500,
			success: false,
			message: "Internal server error",
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
``;
