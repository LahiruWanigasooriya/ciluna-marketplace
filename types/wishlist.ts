import { IProduct } from "./product";

// Wishlist Interface
export interface IWishlist {
  save(): unknown;
  _id?: string;
  user: string; // User ID
  products: IProduct[]; // Array of products
  createdAt?: string;
  updatedAt?: string;
}

// API Parameters for fetching wishlist
export interface GetWishlistParams {
  userId: string;
}

// API Parameters for adding/removing product from wishlist
export interface UpdateWishlistParams {
  userId: string;
  productId: string;
}

export interface ProductWishCountResponse {
  success: boolean;
  wishCount: number;
  message: string;
  error: string;
}

interface WishlistData {
  data: {
    updatedProducts: number;
  };
}

export interface ProductWishCountUpdateResponse {
  success: boolean;
  message: string;
  status: number;
  data: WishlistData;
}
