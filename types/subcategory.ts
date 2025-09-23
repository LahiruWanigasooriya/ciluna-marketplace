export interface ISubCategory {
  category: string;
  _id?: string;
  name: string;
  description?: string;
  image: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetSubCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
}

export interface CreateSubCategoryParams {
  name: string;
  description?: string;
  image: string;
}
