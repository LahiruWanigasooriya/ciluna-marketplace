export interface IBrand {
  _id?: string;
  name: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetBrandsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  filters?: Record<string, any>;
  sortOrder?: "asc" | "desc";
}

export interface CreateBrandParams {
  name: string;
  description?: string;
  logo: string;
  isActive?: boolean;
}
