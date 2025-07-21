export interface IModel {
    _id?: string;
    name: string; 
    brand?: string; 
    isActive?: boolean; 
    createdAt?: string; 
    updatedAt?: string; 
  }

  export interface GetModelParams {
    page?: number; 
    limit?: number; 
    search?: string; 
    sortBy?: string; 
    sortOrder?: "asc" | "desc"; 
  }


  export interface CreateModelParams {
    name: string;
    brand:string;
    isActive?: boolean
    
  }