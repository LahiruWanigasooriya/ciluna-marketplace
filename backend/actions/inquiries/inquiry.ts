"use server";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import InquiryModel from "../../models/inquiry";
import { CreateInquiryParams, GetInquiriesParams } from "@/types/inquiry";

// Get all inquiries with pagination, search, and sorting
export const getAllInquiries = async ({
	page = 1,
	limit = 10,
	search = "",
	sortBy = "createdAt",
	sortOrder = "desc",
}: GetInquiriesParams) => {
	try {
		await dbConnectMarketPlace();

		// Build query object
		const query: any = { isDeleted: false }; // Exclude deleted inquiries

		// Add search functionality (search in name, email, or message)
		if (search) {
			query.$or = [
				{ name: { $regex: search, $options: "i" } }, // Case-insensitive search
				{ email: { $regex: search, $options: "i" } },
				{ message: { $regex: search, $options: "i" } },
			];
		}

		// Determine sorting order
		const sortOptions: Record<string, any> = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		// Pagination calculations
		const skip = (page - 1) * limit;

		// Fetch inquiries with filters, search, and pagination
		const inquiries = await InquiryModel.find(query)
			.sort(sortOptions) // Sort by specified field
			.skip(skip) // Skip documents for pagination
			.limit(limit); // Limit number of documents

		// Total count for pagination
		const total = await InquiryModel.countDocuments(query);

		return {
			status: 200,
			success: true,
			message: "Inquiries fetched successfully",
			data: {
				inquiries: JSON.parse(JSON.stringify(inquiries)), // Ensure serializability
				total,
				totalPages: Math.ceil(total / limit),
				currentPage: page,
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching inquiries",
			error: error.message,
		};
	}
};

export const createInquiry = async (inquiryData: CreateInquiryParams) => {
	try {
		await dbConnectMarketPlace();

		// Validate required fields
		const { name, email, message } = inquiryData;
		if (!name || !email || !message) {
			return {
				status: 400,
				success: false,
				message: "Missing required fields: name, email, or message",
			};
		}

		// Create a new inquiry
		const newInquiry = new InquiryModel({
			name,
			email,
			message,
			status: "pending", // Default status
		});

		const savedInquiry = await newInquiry.save();

		return {
			status: 201,
			success: true,
			message: "Inquiry submitted successfully",
			data: JSON.parse(JSON.stringify(savedInquiry)),
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while submitting the inquiry",
			error: error.message,
		};
	}
};
