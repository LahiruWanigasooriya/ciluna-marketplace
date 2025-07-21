"use server"
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import CategoryModel from "@/models/category";
import { CreateCategoryParams, GetCategoriesParams } from "@/types/category";



// Get all categories with pagination, search, and sorting
export const getAllCategories = async ({
  page = 1,
  limit = 12,
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetCategoriesParams) => {
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

    // Determine sorting order
    const sortOptions: Record<string, any> = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination calculations
    const skip = (page - 1) * limit;

    // Fetch categories with filters, search, and pagination
    const categories = await CategoryModel.find(query)
      .sort(sortOptions) // Sort by specified field
      .skip(skip) // Skip documents for pagination
      .limit(limit); // Limit number of documents

    // Total count for pagination
    const total = await CategoryModel.countDocuments(query);

    return {
      status: 200,
      success: true,
      message: "Categories fetched successfully",
      data: {
        categories: JSON.parse(JSON.stringify(categories)), // Ensure serializability
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

export const getCategoryById = async (categoryId: string) => {
  try {
    await dbConnectMarketPlace();

    if (!categoryId) {
      return {
        status: 400,
        success: false,
        message: "Category ID is required",
      };
    }

    // Find the product and populate related fields
    const category = await CategoryModel.findById(categoryId)
    if (!category) {
      return {
        status: 404,
        success: false,
        message: "Category not found",
      };
    }


    return {
      status: 200,
      success: true,
      message: "Category fetched successfully",
      data: {
        product: JSON.parse(JSON.stringify(category)), 

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





// Create a new category
export const createCategory = async (categoryData: CreateCategoryParams) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { name, description, image } = categoryData;
    if (!name || !description || !image) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name , image or description",
      };
    }

    // Check if the category name already exists
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return {
        status: 400,
        success: false,
        message: "Category with this name already exists",
      };
    }

    // Create a new category
    const newCategory = new CategoryModel({
      ...categoryData,
    });

    const savedCategory = await newCategory.save();

    return {
      status: 201,
      success: true,
      message: "Category created successfully",
      data: JSON.parse(JSON.stringify(savedCategory)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while creating the category",
      error: error.message,
    };
  }
};

export const updateCategory = async (categoryId: string, categoryData: CreateCategoryParams) => {
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
    const existingCategory = await CategoryModel.findById(categoryId);
    if (!existingCategory) {
      return {
        status: 404,
        success: false,
        message: "Category not found",
      };
    }

    // Check if the new name is already taken by another category
    const nameConflict = await CategoryModel.findOne({ name, _id: { $ne: categoryId } });
    if (nameConflict) {
      return {
        status: 400,
        success: false,
        message: "Category with this name already exists",
      };
    }

    // Update the category
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
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

export const deleteCategory = async (categoryId: string) => {
  try {
    await dbConnectMarketPlace();

    if (!categoryId) {
      return {
        status: 400,
        success: false,
        message: "Category ID is required",
      };
    }

    // Check if product exists
    const product = await CategoryModel.findById(categoryId);
    if (!product) {
      return {
        status: 404,
        success: false,
        message: "Product not found",
      };
    }

    // Delete the product
    await CategoryModel.findByIdAndDelete(categoryId);


    return {
      status: 200,
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error: any) {
    console.error("Error in deleteProduct:", error);
    return {
      status: 500,
      success: false,
      message: "An error occurred while deleting the category",
      error: error.message,
    };
  }
}
