"use server";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import ProductModel from "@/models/product";
import ProductVariantModel from "@/models/productVariant";
import ProductVariantSubCategoryModel from "@/models/productVariantSubCategory";
import { CreateProductVariantParams } from "@/types/productVariant";
import { GetProductVariantSubCategoriesParams } from "@/types/productVariantSubCategory";

// Get all product variants with pagination, search, and sorting
export const getAllProductVariants = async ({
  page = 1,
  limit = 10,
  productId,
  search = "",
  filters = {},
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetProductVariantSubCategoriesParams) => {
  try {
    await dbConnectMarketPlace();

    // Build query object
    const query: any = {
      ...filters,
    };
    if (productId) query.productId = productId; // Filter by product

    // Add search functionality (search in subcategories)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
      ];
    }

    // Determine sorting order
    const sortOptions: Record<string, any> = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination calculations
    const skip = (page - 1) * limit;

    // Fetch product variants with filters, search, sorting, and pagination
    const productVariants = await ProductVariantModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("productId", "name")
      .populate("category", "name")
      .populate("subCategoryIds", "value"); 

    // Total count for pagination
    const total = await ProductVariantModel.countDocuments(query);

    return {
      status: 200,
      success: true,
      message: "Product variants fetched successfully",
      data: {
        productVariants: JSON.parse(JSON.stringify(productVariants)), // Ensure serializability
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching product variants",
      error: error.message,
    };
  }
};

export const getProductVariantById = async (id: string) => {
  try {
    await dbConnectMarketPlace();

    if (!id) {
      return {
        status: 400,
        success: false,
        message: "product variant ID is required",
      };
    }

    // Find the product and populate related fields
    const product = await ProductVariantModel.findById(id)
 


    if (!product) {
      return {
        status: 404,
        success: false,
        message: "Product not found",
      };
    }

     // Fetch all variants associated with the product
     const variants = await ProductVariantModel.find({ id })
     .populate("subCategoryIds", "value") // Fetch subcategory values (e.g., Color: Black, Size: 24 inch)
     .select("_id price stock images discount subCategoryIds")
     .lean();

    return {
      status: 200,
      success: true,
      message: "product variant fetched successfully",
      data: {
        product: JSON.parse(JSON.stringify(product)), // Ensure serializability
        variants: JSON.parse(JSON.stringify(variants)),
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching the product",
      error: error.message,
    };
  }
};




// Create a new product variant and validate its linked data
export const createProductVariant = async (variantData: CreateProductVariantParams) => {
  try {
    await dbConnectMarketPlace();

    const { productId, subCategoryIds, price, stock, discount, images } = variantData;

    // Validate required fields
    if (!productId || !subCategoryIds || subCategoryIds.length === 0 || !price || !stock) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: productId, subCategoryIds, price, or stock",
      };
    }

    // Check if the product exists
    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) {
      return {
        status: 404,
        success: false,
        message: "Product not found",
      };
    }

    // Validate subcategories
    const validSubCategories = await ProductVariantSubCategoryModel.find({
      _id: { $in: subCategoryIds },
    });

    // if (validSubCategories.length !== subCategoryIds.length) {
    //   return {
    //     status: 400,
    //     success: false,
    //     message: "Some provided subCategoryIds are invalid",
    //   };
    // }

    // Check if a variant with the same subcategories already exists
    const existingVariant = await ProductVariantModel.findOne({
      productId,
      subCategoryIds: { $all: subCategoryIds, $size: subCategoryIds.length },
    });

    if (existingVariant) {
      return {
        status: 400,
        success: false,
        message: "A variant with these subcategories already exists for this product",
      };
    }

    // Create a new product variant
    const newProductVariant = new ProductVariantModel({
      productId,
      subCategoryIds,
      price,
      stock,
      discount: discount || { percentage: 0, startDate: null, endDate: null },
      images: images || [],
    });

    const savedVariant = await newProductVariant.save();

    return {
      status: 201,
      success: true,
      message: "Product variant created successfully",
      data: JSON.parse(JSON.stringify(savedVariant)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while creating the product variant",
      error: error.message,
    };
  }
};

export const updateProductVariant = async (id: string, data: CreateProductVariantParams) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { isActive, price, images, productId, discount } = data;
    if (!price || !images || !productId || !discount) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: price, images, discount or product",
      };
    }

    // Check if the category exists
    const existingProduct = await ProductVariantModel.findById(id);
    if (!existingProduct) {
      return {
        status: 404,
        success: false,
        message: "product not found",
      };
    }

    // Check if the new name is already taken by another category
    const nameConflict = await ProductVariantModel.findOne({ _id: { $ne: id } });
    if (nameConflict) {
      return {
        status: 400,
        success: false,
        message: "product with this name already exists",
      };
    }

    // Update the category
    const updatedProduct = await ProductVariantModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    return {
      status: 200,
      success: true,
      message: "product updated successfully",
      data: JSON.parse(JSON.stringify(updatedProduct)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while updating the product",
      error: error.message,
    };
  }
};


export const deleteProductVariant = async (id: string) => {
  try {
    await dbConnectMarketPlace();

    if (!id) {
      return {
        status: 400,
        success: false,
        message: "product ID is required",
      };
    }

    // Check if product exists
    const product = await ProductModel.findById(id);
    if (!product) {
      return {
        status: 404,
        success: false,
        message: "product not found",
      };
    }

    // Delete the product
    await ProductVariantModel.findByIdAndDelete(id);

    // Delete associated variants
    await ProductVariantModel.deleteMany({ id });

    return {
      status: 200,
      success: true,
      message: "product variant deleted successfully",
    };
  } catch (error: any) {
    console.error("Error in deleteProduct:", error);
    return {
      status: 500,
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    };
  }
}