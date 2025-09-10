export interface ISubSubCategory {
  _id?: string;
  name: string;
  description?: string;
  image?: string; // Made optional to match model
  subcategoryId: string;
  categoryId?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetSubSubCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  subcategoryId?: string;
}

export interface CreateSubSubCategoryParams {
  name: string;
  description?: string;
  image?: string; // Made optional to match model
  subcategoryId: string;
  categoryId?: string;
  isActive?: boolean;
}

export interface SubSubCategoryResponse {
  status?: number;
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    subsubcategories: ISubSubCategory[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CreateSubSubCategoryResponse {
  status: number;
  success: boolean;
  message: string;
  data?: ISubSubCategory;
  error?: string;
}

// Added error response interface for consistency
export interface ErrorResponse {
  status: number;
  success: false;
  message: string;
  error?: string;
}