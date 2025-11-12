import mongoose from "mongoose";

interface ICartItem {
  productId: mongoose.Types.ObjectId; // Reference to the Product
  productVariantId?: mongoose.Types.ObjectId; // Optional: Reference to the ProductVariant
  quantity: number; // Quantity of the product/variant
  price: number; // Price at the time of adding to cart
  discount: number; // Discount percentage for this item
  discountAmount: number; // Discount for this item
  total: number; // Total price for this item (price * quantity)
  finalTotal: number; // Final price after discount for this item
  color: string;
  size: string;
  stock: number;
}

interface ICart {
  userId: mongoose.Types.ObjectId; // Reference to the User
  items: ICartItem[]; // Array of cart items
  totalPrice: number; // Total price of all items in the cart
  discount: number; // Total discount applied to the cart
  finalPrice: number; // Final price after discount
  isDeleted: boolean; // Soft delete flag
}

const CartItemSchema = new mongoose.Schema<ICartItem>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productVariantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      default: null, // Optional, only for products with variants
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure quantity is at least 1
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0, // Default discount is 0
    },
    total: {
      type: Number,
      required: true,
    },
    finalTotal: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    finalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default CartModel;