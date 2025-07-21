
export interface IProductVariantCategory {
  _id?: string;
  productId: string; // Reference to Product
  name: string; // Example: "Color", "Size"
  subCategories: string[]; // References to sub-variant categories
  createdAt?: string; // Optional, will be auto-generated
  updatedAt?: string; // Optional, will be auto-generated
}

// Interface for pagination params when fetching product variant categories
export interface GetProductVariantCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  productId?:string;
  sortOrder?: "asc" | "desc";
}

export interface CreateProductVariantCategoryParams {
  productId: string; // Reference to Product
  name: string; // Example: "Color", "Size"
  subCategories?: string[]; // References to sub-variant categories
}

export interface ProductVariantCategory {
  id: string;
  productId: string;
  name: string;
  subCategories: string[];
}
