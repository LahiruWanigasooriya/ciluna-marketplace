export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
  image: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateCategoryParams {
  name: string;
  description?: string;
  image: string;
}


export interface Category {
  id: number;
  name: string;
  image: string;
}
