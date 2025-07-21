export interface IInquiry {
    _id?: string;
    name: string;
    email: string;
    contactNo?: string;
    message: string;
    status?: "pending" | "resolved" | "archived";
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface GetInquiriesParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
  
  export interface CreateInquiryParams {
    name: string;
    email: string;
    contactNo?: string;
    message: string;
  }
  