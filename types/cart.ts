import { IProduct } from "./product";
import { Types } from "mongoose";

// Variant info stored in cart item
export interface IVariantInfo {
  color: string;
  size: string;
  colorCode: string;
}

export interface ICartItem {
  _id?: string; // Unique identifier for the cart item
  productId: Types.ObjectId | string; // ID of the product
  productVariantId?: Types.ObjectId | string | null; // ID of the product varian
  quantity: number; // Quantity of the product
  price: number; // Price per unit
  total: number; // Total price (quantity * price)
  variantInfo?: IVariantInfo | null;
}

export interface ICart {
  _id?: string; // Unique identifier for the cart
  userId: string; // ID of the user who owns the cart
  items: ICartItem[]; // Array of cart items
  totalPrice: number; // Total price of all items in the cart
  discount: number; // Discount applied to the cart
  finalPrice: number; // Final price after discount
  isDeleted?: boolean; // Logical deletion flag
  createdAt?: string; // Timestamp when the cart was created
  updatedAt?: string; // Timestamp when the cart was last updated
}

export interface AddToCartParams {
  productId: string;
  productVariantId?: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface UpdateCartItemParams {
  itemId: string;
  quantity?: number;
  productVariantId?: string;
}

export interface GetCartParams {
  userId: string; // ID of the user whose cart to retrieve
}

export interface RemoveCartItemParams {
  itemId: string;
}

// Extended cart item for frontend state management
export interface CartItem extends IProduct {
  variantId: string;
  quantity: number;
  productVariantId?: string;
}

export interface CartState {
  cart: CartItem[];
  setCart: (cart: any[]) => void;
  addToCart: (
    product: IProduct, 
    variantId?: string | null,
    quantity?: number, 
    variantInfo?: IVariantInfo
  ) => void;
  removeFromCart: (productId: string, variantId?: string | null) => void;
  updateQuantity: (
    productId: string, 
    variantId?: string | null,
    quantity?: number
  ) => void;
  totalItems: () => number;
}