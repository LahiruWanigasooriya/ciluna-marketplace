import { IProduct } from "./product";
import { IProductVariant } from "./productVariant";

// Review Interface
export interface IReview {
  save(): unknown;
  _id?: string;
  product: IProduct | string; // Product reference (Object or ID)
  productVariant?: IProductVariant | string; // Product Variant reference (Object or ID)
  user: string; // User ID
  rating: number; // Rating from 1 to 5
  title: string; // Review title
  content: string; // Review content
  likes: string[]; // Array of User IDs who liked the review
  createdAt?: string;
  updatedAt?: string;
}

// API Parameters for fetching reviews of a product
export interface GetReviewsParams {
  productId: string;
}

// API Parameters for adding a new review
export interface AddReviewParams {
  userId: string;
  productId: string;
  rating: number;
  title: string;
  content: string;
}

// API Parameters for liking/unliking a review
export interface LikeReviewParams {
  userId: string;
  reviewId: string;
}
