"use server";
import { dbConnectMarketPlace, mongoose } from "@/lib/dbConnect";
import SubcategoryModel from "@/models/subcategory";
import "@/models/category";
import {
  CreateSubCategoryParams,
  GetSubCategoriesParams,
} from "@/types/subcategory";

import ProductModel from "@/models/product";

// interface GetSubCategoriesParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   sortBy?: string;
//   sortOrder?: "asc" | "desc";
//   categoryId?: string;
// }

// Get all categories with pagination, search, and sorting
export const getAllSubCategories = async ({
  page = 1,
  limit = 12,
  search = "",
  filters = {},
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetSubCategoriesParams) => {
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

    // Fetch categories with filters, search, and pagination
    const subcategories = await SubcategoryModel.find(query)
      .sort(sortOptions) // Sort by specified field
      .skip(skip) // Skip documents for pagination
      .limit(limit); // Limit number of documents

    // Total count for pagination
    const total = await SubcategoryModel.countDocuments(query);

    return {
      status: 200,
      success: true,
      message: "Subcategories fetched successfully",
      data: {
        subcategories: JSON.parse(JSON.stringify(subcategories)), // Ensure serializability
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching categories",
      error: error.message,
    };
  }
};

export const getSubcategoryById = async (subcatId: string) => {
  try {
    await dbConnectMarketPlace();

    // Fetch the subcategory by ID
    const subcategory = await SubcategoryModel.findById(subcatId);
    if (!subcategory) {
      return {
        status: 404,
        success: false,
        message: "Subcategory not found",
        data: null,
      };
    }

    // Fetch all products related to this subcategory
    const products = await ProductModel.find({
      subcategory: new mongoose.Types.ObjectId(subcatId),
    });

    return {
      status: 200,
      success: true,
      message: "Subcategory and related products fetched successfully",
      data: {
        subcategory: JSON.parse(JSON.stringify(subcategory)), // Serialize subcategory
        products: JSON.parse(JSON.stringify(products)), // Serialize products
      },
    };
  } catch (error: any) {
    console.error("Error in getSubcategoryById:", error);
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching subcategory and products",
      error: error.message,
    };
  }
};

// Create a new category
export const createSubCategory = async (
  subcategoryData: CreateSubCategoryParams
) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { name, description, image } = subcategoryData;
    if (!name || !description || !image) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name , image or description",
      };
    }

    // Check if the category name already exists
    const existingCategory = await SubcategoryModel.findOne({ name });
    if (existingCategory) {
      return {
        status: 400,
        success: false,
        message: "Category with this name already exists",
      };
    }

    // Create a new category
    const newCategory = new SubcategoryModel({
      ...subcategoryData,
    });

    const savedCategory = await newCategory.save();

    return {
      status: 201,
      success: true,
      message: "Subcategory created successfully",
      data: JSON.parse(JSON.stringify(savedCategory)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while creating the subcategory",
      error: error.message,
    };
  }
};

export const updateSubCategory = async (
  subcategoryId: string,
  categoryData: CreateSubCategoryParams
) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { name, description, image } = categoryData;
    if (!name || !description || !image) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name, image, or description",
      };
    }

    // Check if the category exists
    const existingCategory = await SubcategoryModel.findById(subcategoryId);
    if (!existingCategory) {
      return {
        status: 404,
        success: false,
        message: "Category not found",
      };
    }

    // Check if the new name is already taken by another category
    const nameConflict = await SubcategoryModel.findOne({
      name,
      _id: { $ne: subcategoryId },
    });
    if (nameConflict) {
      return {
        status: 400,
        success: false,
        message: "Category with this name already exists",
      };
    }

    // Update the category
    const updatedCategory = await SubcategoryModel.findByIdAndUpdate(
      subcategoryId,
      { ...categoryData },
      { new: true }
    );

    return {
      status: 200,
      success: true,
      message: "Category updated successfully",
      data: JSON.parse(JSON.stringify(updatedCategory)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while updating the category",
      error: error.message,
    };
  }
};

export const deleteSubCategory = async (subcategoryId: string) => {
  try {
    await dbConnectMarketPlace();

    if (!subcategoryId) {
      return {
        status: 400,
        success: false,
        message: "Sub Category ID is required",
      };
    }

    // Check if product exists
    const product = await SubcategoryModel.findById(subcategoryId);
    if (!product) {
      return {
        status: 404,
        success: false,
        message: "Product not found",
      };
    }

    // Delete the product
    await SubcategoryModel.findByIdAndDelete(subcategoryId);

    return {
      status: 200,
      success: true,
      message: "Sub Category deleted successfully",
    };
  } catch (error: any) {
    console.error("Error in deleteProduct:", error);
    return {
      status: 500,
      success: false,
      message: "An error occurred while deleting the sub category",
      error: error.message,
    };
  }
};
