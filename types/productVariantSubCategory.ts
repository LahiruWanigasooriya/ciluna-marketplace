export interface IProductVariantSubCategory {
  _id?: string;
  productVariantCategoryId: string; // Reference to ProductVariantCategory
  value: string; // Example: "Black", "24 inch"
  subValue?: string; // Example: "color code",
  createdAt?: string; // Optional, will be auto-generated
  updatedAt?: string; // Optional, will be auto-generated
}

// Interface for pagination params when fetching product variant subcategories
export interface GetProductVariantSubCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: Record<string, any>;
  sortBy?: string;
  productId?: string;
  sortOrder?: "asc" | "desc";
}

// Interface for creating a product variant subcategory
export interface CreateProductVariantSubCategoryParams {
  productVariantCategoryId: string; // Reference to ProductVariantCategory
  value: string; // Example: "Black", "24 inch"
  subValue?: string;
}

// Final interface after processing or fetching from DB
export interface ProductVariantSubCategory {
  id: string;
  productVariantCategoryId: string;
  value: string;
  subValue?: string;
}
