export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  component: React.FC;
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
