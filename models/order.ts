import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }, // Reference to Product
    quantity: {
      type: Number,
      required: true,
      min: 1,
    }, // Quantity of the product
    price: {
      type: Number,
      required: true,
    }, // Price per unit
    total: {
      type: Number,
      required: true,
    }, // Total price for this item (quantity * price)
    color: {
      type: String,
      required: false,
    }, // Optional: Selected color
    size: {
      type: String,
      required: false,
    }, // Optional: Selected size
  },
  { timestamps: true } // Timestamps for individual order items
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who placed the order
    items: [OrderItemSchema], // List of ordered items
    totalPrice: {
      type: Number,
      required: true,
    }, // Total price of all items
    discount: {
      type: Number,
      default: 0,
    }, // Discount applied to the order
    finalPrice: {
      type: Number,
      required: true,
    }, // Final price after discounts

    payment: {
      method: {
        type: String,
        required: true,
        enum: ["visa", "stripe", "paypal", "crypto", "gpay"], // Only first method will be used
      }, // Selected payment method
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      }, // Payment status
      transactionId: {
        type: String,
        required: false,
      }, // Optional transaction ID
    }, // Payment details

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    }, // Order status

    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, required: false },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    }, // Detailed shipping address

    isDeleted: {
      type: Boolean,
      default: false,
    }, // Logical deletion flag
  },
  { timestamps: true } // Timestamps for the order itself
);

// Avoid model overwrite error in development
const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default OrderModel;
