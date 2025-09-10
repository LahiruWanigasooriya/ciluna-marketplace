"use server";

import { dbConnectMarketPlace, mongoose } from "@/lib/dbConnect";
import SubSubCategoryModel from "@/models/subsubcategory";
import "@/models/subcategory";
import {
  CreateSubSubCategoryParams,
  SubSubCategoryResponse,
} from "@/types/subsubcategory";
import ProductModel from "@/models/product";

export const getAllSubSubCategories = async ({
  page = 1,
  limit = 12,
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
  subcategoryId,
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  subcategoryId?: string;
}): Promise<SubSubCategoryResponse> => {
  try {
    await dbConnectMarketPlace();

    // Build query object
    const query: any = {};

    // Add search functionality (search in name or description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by subcategoryId if provided
    if (subcategoryId) {
      query.subcategoryId = new mongoose.Types.ObjectId(subcategoryId);
    }

    // Determine sorting order
    const sortOptions: Record<string, any> = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination calculations
    const skip = (page - 1) * limit;

    // Fetch subsubcategories with filters, search, and pagination
    const subsubcategories = await SubSubCategoryModel.find(query)
      .sort(sortOptions) // Sort by specified field
      .skip(skip) // Skip documents for pagination
      .limit(limit); // Limit number of documents

    // Total count for pagination
    const total = await SubSubCategoryModel.countDocuments(query);

    return {
      success: true,
      data: {
        subsubcategories: JSON.parse(JSON.stringify(subsubcategories)), // Ensure serializability
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching subsubcategories",
      error: error.message,
    };
  }
};

export const getSubSubCategoryById = async (subsubcatId: string) => {
  try {
    await dbConnectMarketPlace();

    // Fetch the subsubcategory by ID
    const subsubcategory = await SubSubCategoryModel.findById(subsubcatId);
    if (!subsubcategory) {
      return {
        status: 404,
        success: false,
        message: "Subsubcategory not found",
        data: null,
      };
    }

    // Fetch all products related to this subsubcategory
    const products = await ProductModel.find({
      subsubcategory: new mongoose.Types.ObjectId(subsubcatId),
    });

    return {
      status: 200,
      success: true,
      message: "Subsubcategory and related products fetched successfully",
      data: {
        subsubcategory: JSON.parse(JSON.stringify(subsubcategory)), // Serialize subsubcategory
        products: JSON.parse(JSON.stringify(products)), // Serialize products
      },
    };
  } catch (error: any) {
    console.error("Error in getSubSubCategoryById:", error);
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching subsubcategory and products",
      error: error.message,
    };
  }
};

export const createSubSubCategory = async (
  subsubcategoryData: CreateSubSubCategoryParams
) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { name, description, image, subcategoryId } = subsubcategoryData;
    if (!name || !subcategoryId) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name or subcategoryId",
      };
    }

    // Check if the subsubcategory name already exists within the same subcategory
    const existingSubSubCategory = await SubSubCategoryModel.findOne({ name, subcategoryId });
    if (existingSubSubCategory) {
      return {
        status: 400,
        success: false,
        message: "Subsubcategory with this name already exists in the specified subcategory",
      };
    }

    // Create a new subsubcategory
    const newSubSubCategory = new SubSubCategoryModel({
      ...subsubcategoryData,
    });

    const savedSubSubCategory = await newSubSubCategory.save();

    return {
      status: 201,
      success: true,
      message: "Subsubcategory created successfully",
      data: JSON.parse(JSON.stringify(savedSubSubCategory)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while creating the subsubcategory",
      error: error.message,
    };
  }
};

export const updateSubSubCategory = async (
  subsubcategoryId: string,
  subsubcategoryData: CreateSubSubCategoryParams
) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { name, description, image, subcategoryId } = subsubcategoryData;
    if (!name || !subcategoryId) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name or subcategoryId",
      };
    }

    // Check if the subsubcategory exists
    const existingSubSubCategory = await SubSubCategoryModel.findById(subsubcategoryId);
    if (!existingSubSubCategory) {
      return {
        status: 404,
        success: false,
        message: "Subsubcategory not found",
      };
    }

    // Check if the new name is already taken by another subsubcategory within the same subcategory
    const nameConflict = await SubSubCategoryModel.findOne({
      name,
      subcategoryId,
      _id: { $ne: subsubcategoryId },
    });
    if (nameConflict) {
      return {
        status: 400,
        success: false,
        message: "Subsubcategory with this name already exists in the specified subcategory",
      };
    }

    // Update the subsubcategory
    const updatedSubSubCategory = await SubSubCategoryModel.findByIdAndUpdate(
      subsubcategoryId,
      { ...subsubcategoryData },
      { new: true }
    );

    return {
      status: 200,
      success: true,
      message: "Subsubcategory updated successfully",
      data: JSON.parse(JSON.stringify(updatedSubSubCategory)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while updating the subsubcategory",
      error: error.message,
    };
  }
};

export const deleteSubSubCategory = async (subsubcategoryId: string) => {
  try {
    await dbConnectMarketPlace();

    if (!subsubcategoryId) {
      return {
        status: 400,
        success: false,
        message: "Subsubcategory ID is required",
      };
    }

    // Check if subsubcategory exists
    const subsubcategory = await SubSubCategoryModel.findById(subsubcategoryId);
    if (!subsubcategory) {
      return {
        status: 404,
        success: false,
        message: "Subsubcategory not found",
      };
    }

    // Delete the subsubcategory
    await SubSubCategoryModel.findByIdAndDelete(subsubcategoryId);

    return {
      status: 200,
      success: true,
      message: "Subsubcategory deleted successfully",
    };
  } catch (error: any) {
    console.error("Error in deleteSubSubCategory:", error);
    return {
      status: 500,
      success: false,
      message: "An error occurred while deleting the subsubcategory",
      error: error.message,
    };
  }
};