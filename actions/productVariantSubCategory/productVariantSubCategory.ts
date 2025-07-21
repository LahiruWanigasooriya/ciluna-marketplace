"use server";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import ProductVariantCategoryModel from "@/models/productVariantCategory";
import ProductVariantSubCategoryModel from "@/models/productVariantSubCategory";
import { GetProductVariantSubCategoriesParams, CreateProductVariantSubCategoryParams } from "@/types/productVariantSubCategory";

// Get all product variant subcategories with pagination, search, and sorting
export const getAllProductVariantSubCategories = async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  }: GetProductVariantSubCategoriesParams) => {
    try {
      await dbConnectMarketPlace();
  
      // Build query object
      const query: any = {};
  
      // Add search functionality (search in value or subValue)
      if (search) {
        query.$or = [
          { value: { $regex: search, $options: "i" } },
          { subValue: { $regex: search, $options: "i" } }, // Include search for subValue
        ];
      }
  
      // Determine sorting order
      const sortOptions: Record<string, any> = {};
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  
      // Pagination calculations
      const skip = (page - 1) * limit;
  
      // Fetch product variant subcategories with search, sorting, and pagination
      const productVariantSubCategories = await ProductVariantSubCategoryModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate("productVariantCategoryId", "name"); // Populate parent category details
  
      // Total count for pagination
      const total = await ProductVariantSubCategoryModel.countDocuments(query);
  
      return {
        status: 200,
        success: true,
        message: "Product variant subcategories fetched successfully",
        data: {
          productVariantSubCategories: JSON.parse(JSON.stringify(productVariantSubCategories)), // Ensure serializability
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: "An error occurred while fetching product variant subcategories",
        error: error.message,
      };
    }
  };
  




// Create a new product variant subcategory and update the parent category
export const createProductVariantSubCategory = async (
    subCategoryData: CreateProductVariantSubCategoryParams
  ) => {
    try {
      await dbConnectMarketPlace();
  
      // Validate required fields
      const { productVariantCategoryId, value, subValue } = subCategoryData;
      if (!productVariantCategoryId || !value) {
        return {
          status: 400,
          success: false,
          message: "Missing required fields: productVariantCategoryId or value",
        };
      }
  
      // Check if the parent product variant category exists
      const existingCategory = await ProductVariantCategoryModel.findById(productVariantCategoryId);
      if (!existingCategory) {
        return {
          status: 404,
          success: false,
          message: "Parent product variant category not found",
        };
      }
  
      // Check if a subcategory with the same value already exists in the category
      const existingSubCategory = await ProductVariantSubCategoryModel.findOne({
        productVariantCategoryId,
        value,
        subValue, // Include subValue check to prevent duplicates
      });
  
      if (existingSubCategory) {
        return {
          status: 400,
          success: false,
          message: "Product variant subcategory with this value already exists",
        };
      }
  
      // Create a new product variant subcategory
      const newSubCategory = new ProductVariantSubCategoryModel({
        productVariantCategoryId,
        value,
        subValue: subValue || null, // Optional subValue
      });
  
      const savedSubCategory = await newSubCategory.save();
  
      // Update the ProductVariantCategoryModel to include the new subcategory in subCategories[]
      await ProductVariantCategoryModel.findByIdAndUpdate(productVariantCategoryId, {
        $addToSet: { subCategories: savedSubCategory._id }, // Prevent duplicates
      });
  
      return {
        status: 201,
        success: true,
        message: "Product variant subcategory created successfully",
        data: JSON.parse(JSON.stringify(savedSubCategory)),
      };
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: "An error occurred while creating the product variant subcategory",
        error: error.message,
      };
    }
  };
  
