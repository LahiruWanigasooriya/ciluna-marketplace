"use server";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import ProductVariantCategoryModel from "../../models/productVariantCategory";
import { CreateProductVariantCategoryParams, GetProductVariantCategoriesParams } from "@/types/productVariantCategory";
import "../../models/product";
import "../../models/productVariantSubCategory";
import ProductModel from "../../models/product";

// Get all product variant categories with pagination, search, and sorting
export const getAllProductVariantCategories = async ({
	page = 1,
	limit = 10,
	search = "",
	filters = {},
	sortBy = "createdAt",
	sortOrder = "desc",
}: GetProductVariantCategoriesParams) => {
	try {
		await dbConnectMarketPlace();

		// Build query object
		const query: any = {
			isActive: true,
			...filters,
		};
		// Add search functionality (search in name)
		if (search) {
			query.name = { $regex: search, $options: "i" }; // Case-insensitive search
		}

		// Determine sorting order
		const sortOptions: Record<string, any> = {};
		sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

		// Pagination calculations
		const skip = (page - 1) * limit;

		// Fetch product variant categories with search, sorting, and pagination
		const productVariantCategories = await ProductVariantCategoryModel.find(query)
			.sort(sortOptions) // Sort by specified field
			.skip(skip) // Skip documents for pagination
			.limit(limit) // Limit number of documents
			.populate("product", "name") // Populate product details
			.populate("subCategories", "value"); // Populate subcategories

		// Total count for pagination
		const total = await ProductVariantCategoryModel.countDocuments(query);

		console.log(productVariantCategories, "pp variant category");

		return {
			status: 200,
			success: true,
			message: "Product variant categories fetched successfully",
			data: {
				productVariantCategories: JSON.parse(JSON.stringify(productVariantCategories)), // Ensure serializability
				total,
				totalPages: Math.ceil(total / limit),
				currentPage: page,
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching product variant categories",
			error: error.message,
		};
	}
};

export const getVariantCategoryById = async (id: string) => {
	try {
		await dbConnectMarketPlace();

		if (!id) {
			return {
				status: 400,
				success: false,
				message: "Variant Category ID is required",
			};
		}

		// Find the product and populate related fields
		const data = await ProductVariantCategoryModel.findById(id);
		if (!id) {
			return {
				status: 404,
				success: false,
				message: "Variant Category not found",
			};
		}

		return {
			status: 200,
			success: true,
			message: "Variant Category fetched successfully",
			data: {
				product: JSON.parse(JSON.stringify(data)),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching the variant category",
			error: error.message,
		};
	}
};

// Create a new product variant category
export const createProductVariantCategory = async (categoryData: CreateProductVariantCategoryParams) => {
	try {
		await dbConnectMarketPlace();

		// Validate required fields
		const { productId, name, subCategories } = categoryData;
		if (!productId || !name) {
			return {
				status: 400,
				success: false,
				message: "Missing required fields: productId or name",
			};
		}

		// Check if the product variant category with the same name already exists for the product
		const existingCategory = await ProductVariantCategoryModel.findOne({
			product: productId,
			name,
		});

		if (existingCategory) {
			return {
				status: 400,
				success: false,
				message: "Product variant category with this name already exists for the product",
			};
		}

		// Create a new product variant category
		const newProductVariantCategory = new ProductVariantCategoryModel({
			product: productId,
			name,
			subCategories: subCategories || [],
		});

		const savedCategory = await newProductVariantCategory.save();

		// Update the ProductModel to include the new variant category in productVariantCategories[]
		await ProductModel.findByIdAndUpdate(
			productId,
			{
				$addToSet: { productVariantCategories: savedCategory._id }, // Prevents duplicates
			},
			{ new: true }
		);

		return {
			status: 201,
			success: true,
			message: "Product variant category created successfully and linked to product",
			data: JSON.parse(JSON.stringify(savedCategory)),
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while creating the product variant category",
			error: error.message,
		};
	}
};

export const updateVariantCategory = async (id: string, Data: CreateProductVariantCategoryParams) => {
	try {
		await dbConnectMarketPlace();

		const { productId, name } = Data;
		if (!productId || !name) {
			return {
				status: 400,
				success: false,
				message: "Missing required fields: name, image, or description",
			};
		}

		const existingVCategory = await ProductVariantCategoryModel.findById(id);
		if (!existingVCategory) {
			return {
				status: 404,
				success: false,
				message: "Variant not found",
			};
		}

		const nameConflict = await ProductVariantCategoryModel.findOne({
			name,
			_id: { $ne: id },
		});
		if (nameConflict) {
			return {
				status: 400,
				success: false,
				message: "Variant with this name already exists",
			};
		}

		const updatedCategory = await ProductVariantCategoryModel.findByIdAndUpdate(id, { ...Data }, { new: true });

		return {
			status: 200,
			success: true,
			message: "variant category updated successfully",
			data: JSON.parse(JSON.stringify(updatedCategory)),
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while updating variant the category",
			error: error.message,
		};
	}
};

export const deleteProductVariantCategory = async (id: string) => {
	try {
		await dbConnectMarketPlace();

		if (!id) {
			return {
				status: 400,
				success: false,
				message: "Variant Category ID is required",
			};
		}

		const product = await ProductVariantCategoryModel.findById(id);
		if (!product) {
			return {
				status: 404,
				success: false,
				message: "Variant Category not found",
			};
		}

		await ProductVariantCategoryModel.findByIdAndDelete(id);

		return {
			status: 200,
			success: true,
			message: "Variant Category deleted successfully",
		};
	} catch (error: any) {
		console.error("Error in delete:", error);
		return {
			status: 500,
			success: false,
			message: "An error occurred while deleting the category",
			error: error.message,
		};
	}
};
