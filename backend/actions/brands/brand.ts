"use server";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import BrandModel from "../../models/brand";
import { CreateBrandParams, GetBrandsParams } from "@/types/brand";
import "../../models/model";

export const getAllBrands = async ({
	page = 1,
	limit = 10,
	search = "",
	sortBy = "createdAt",
	filters = {},
	sortOrder = "desc",
}: GetBrandsParams) => {
	try {
		await dbConnectMarketPlace();

		// Build query object
		const query: any = {
			isActive: true,
			...filters,
		};

		// Add search functionality (search in name or description)
		if (search) {
			query.$or = [
				{ name: { $regex: search, $options: "i" } }, // Case-insensitive search
				{ description: { $regex: search, $options: "i" } },
			];
		}

		// Determine sorting order
		const sortOptions: Record<string, any> = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		// Pagination calculations
		const skip = (page - 1) * limit;

		// Fetch brands with filters, search, and pagination
		const brands = await BrandModel.find(query)
			.sort(sortOptions) // Sort by specified field
			.skip(skip) // Skip documents for pagination
			.limit(limit); // Limit number of documents

		// Total count for pagination
		const total = await BrandModel.countDocuments(query);

		return {
			status: 200,
			success: true,
			message: "Brands fetched successfully",
			data: {
				brands: JSON.parse(JSON.stringify(brands)), // Ensure serializability
				total,
				totalPages: Math.ceil(total / limit),
				currentPage: page,
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching brands",
			error: error.message,
		};
	}
};

export const getBrandById = async (brandId: string) => {
	try {
		await dbConnectMarketPlace();

		if (!brandId) {
			return {
				status: 400,
				success: false,
				message: "brand ID is required",
			};
		}

		// Find the product and populate related fields
		const brand = await BrandModel.findById(brandId);
		if (!brand) {
			return {
				status: 404,
				success: false,
				message: "brand not found",
			};
		}

		return {
			status: 200,
			success: true,
			message: "brand fetched successfully",
			data: {
				product: JSON.parse(JSON.stringify(brand)),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching the model",
			error: error.message,
		};
	}
};

// Create a new brand
export const createBrand = async (brandData: CreateBrandParams) => {
	try {
		await dbConnectMarketPlace();

		// Validate required fields
		const { name, logo } = brandData;
		if (!name || !logo) {
			return {
				status: 400,
				success: false,
				message: "Missing required fields: name or logo",
			};
		}

		// Check if the brand name already exists
		const existingBrand = await BrandModel.findOne({ name });
		if (existingBrand) {
			return {
				status: 400,
				success: false,
				message: "Brand with this name already exists",
			};
		}

		// Create a new brand
		const newBrand = new BrandModel({
			...brandData,
		});

		const savedBrand = await newBrand.save();

		return {
			status: 201,
			success: true,
			message: "Brand created successfully",
			data: JSON.parse(JSON.stringify(savedBrand)),
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while creating the brand",
			error: error.message,
		};
	}
};

export const updateBrand = async (brandId: string, brandData: CreateBrandParams) => {
	try {
		await dbConnectMarketPlace();

		const { name, description, logo, isActive } = brandData;
		if (!name || !description || !logo || !isActive) {
			return {
				status: 400,
				success: false,
				message: "Missing required fields: name, logo, description or Active status",
			};
		}

		const existingBrand = await BrandModel.findById(brandId);
		if (!existingBrand) {
			return {
				status: 404,
				success: false,
				message: "Brand not found",
			};
		}

		const nameConflict = await BrandModel.findOne({
			name,
			_id: { $ne: brandId },
		});
		if (nameConflict) {
			return {
				status: 400,
				success: false,
				message: "Brand with this name already exists",
			};
		}

		const updatedBrand = await BrandModel.findByIdAndUpdate(brandId, { ...brandData }, { new: true });

		return {
			status: 200,
			success: true,
			message: "Brand updated successfully",
			data: JSON.parse(JSON.stringify(updatedBrand)),
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while updating the brand",
			error: error.message,
		};
	}
};

export const deleteBrand = async (brandId: string) => {
	try {
		await dbConnectMarketPlace();

		if (!brandId) {
			return {
				status: 400,
				success: false,
				message: "Category ID is required",
			};
		}

		const brand = await BrandModel.findById(brandId);
		if (!brand) {
			return {
				status: 404,
				success: false,
				message: "Brand not found",
			};
		}
		await BrandModel.findByIdAndDelete(brand);

		return {
			status: 200,
			success: true,
			message: "Brand deleted successfully",
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while deleting the brand",
			error: error.message,
		};
	}
};
