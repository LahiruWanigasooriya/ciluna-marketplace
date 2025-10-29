export interface IUser {
  _id?: string;
  profileImage?:string;
  firstName: string;
  lastName: string;
  nickName?: string;
  gender?: "Male" | "Female" | "Other";
  dateofbirth?: Date | null;
  addressLine1?: string;
  addressLine2?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  password: string;
  email: string;
  contactNo: string;
  isDeleted?: boolean;
  role?: "user" | "admin";
  activeStatus?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
  notificationSettings?: {
    orderConfirmation?: boolean;
    orderDelivered?: boolean;
    orderStatusChanged?: boolean;
    emailNotification?: boolean;
  };
}

  export interface JwtPayload {
    userId: string;
    name: string;
    email: string;
  }
  

  export type UpdateUserResponse = {
    status: number;
    success: boolean;
    message: string;
    user?: IUser | null;
  };

  export type GetUserParams = {
    page?: number;
    limit?: number;
    search?: string;
    filters?: Record<string, any>;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }


  export type GetUsersResponse = {
    status: number;
    success: boolean;
    message: string;
    data: {
      users: IUser[] | null;
      total: number;
      totalPages: number;
      currentPage: number;
    };
  }

  export type OtpType = "verify_current" | "verify_new";