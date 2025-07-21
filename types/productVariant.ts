export interface IProductVariant {
  find(arg0: (v: any) => any): any;
  map(
    arg0: (product: IProductVariant) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id?: string;
  productId: string; // Reference to Product
  subCategoryIds: string[]; // References to ProductVariantCategory
  category?: string;
  price: number;
  stock: number;
  sold?: number;
  discount?: {
    percentage: number;
    startDate?: string;
    endDate?: string;
  };
  images?: string[];
  rating?: number; // Average rating (0 to 5)
  createdAt?: string; // Optional, will be auto-generated
  updatedAt?: string; // Optional, will be auto-generated
  isActive?: boolean;
}

// Interface for pagination params when fetching product variant prices
export interface GetProductVariantParams {
  page?: number; // Current page number
  limit?: number; // Number of products per page
  search?: string; // Search query for product name or description
  filters?: Record<string, any>; // Additional filters (category, brand, price range, etc.)
  sortBy?: string; // Field to sort by
  sortOrder?: "asc" | "desc"; // Sorting order
}

// Interface for creating a product variant price
export interface CreateProductVariantParams {
  productId: string; // Reference to Product
  subCategoryIds: string[]; // References to ProductVariantCategory
  price: number;
  stock: number;
  discount?: {
    percentage: number;
    startDate?: string;
    endDate?: string;
  };
  images?: string[];
  rating?: number; // Average rating (0 to 5)
  isActive?: string;
}

// Final interface after processing or fetching from DB
export interface ProductVariant {
  id: string;
  productId: string;
  subCategoryIds: string[];
  price: number;
  stock: number;
  discount?: {
    percentage: number;
    startDate?: string;
    endDate?: string;
  };
  images?: string[];
  rating?: number; // Average rating (0 to 5)
}
