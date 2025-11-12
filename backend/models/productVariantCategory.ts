import mongoose from "mongoose";

const ProductVariantCategorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true }, // Example: "Color", "Size"
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariantSubCategory" }], // Links to sub-variants
  },
  { timestamps: true }
);

const ProductVariantCategoryModel = mongoose.models.ProductVariantCategory || mongoose.model("ProductVariantCategory", ProductVariantCategorySchema);
export default ProductVariantCategoryModel;
