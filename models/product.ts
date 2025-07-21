import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 }, // Base price
    discount: {
      type: {
        percentage: { type: Number, default: 0 },// Discount percentage
        startDate: { type: Date },// Discount start date
        endDate: { type: Date },
      },// Discount end date
      default: null,
    },
    stock: { type: Number, required: true, min: 0 },
    image: { type: String, required: true }, // Primary image
    images: { type: [String], default: [] }, // Additional images
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },// Optional subcategory field
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", default: null }, // Optional brand
    model: { type: mongoose.Schema.Types.ObjectId, ref: "Model", default: null }, // Optional model
    productVariantCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariantCategory" }], // Linking variants
    regionCode: { type: String }, // Optional: Region-specific product
    storageCapacity: { type: String }, // e.g., '128GB', '256GB'
    condition: { type: String, enum: ["new", "used"], default: "new" },
    features: { type: [String], default: [] }, // Array of product features
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },// avg rating from reviews table
    wishCount: { type: Number, default: 0 },// Initialize count to 0
    sold: { type: Number, default: 0, min: 0 },
    color: { type: String, default: null },
    colorCode: { type: String, default: null },
    size: { type: String, default: null },

  },
  { timestamps: true }
);



const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default ProductModel;
