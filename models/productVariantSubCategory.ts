import mongoose from 'mongoose';

const ProductVariantSubCategorySchema = new mongoose.Schema(
  {
    productVariantCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariantCategory", required: true },
    value: { type: String, required: true }, // Example: "Black", "24 inch"
    subValue: { type: String, required:false } // Example: "Black", "24 inch"
  },
  { timestamps: true }
);

const ProductVariantSubCategoryModel = mongoose.models.ProductVariantSubCategory || mongoose.model("ProductVariantSubCategory", ProductVariantSubCategorySchema);
export default ProductVariantSubCategoryModel;
