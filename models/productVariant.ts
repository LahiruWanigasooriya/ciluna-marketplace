import mongoose from 'mongoose';

const ProductVariantSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    subCategoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariantSubCategory", required: true }], // Links specific sub-variant values
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sold: { type: Number, default: 0, min: 0 },
    discount: {
      percentage: { type: Number, default: 0 },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },// avg rating from reviews table
    images: { type: [String], default: [] },
    isActive: { type: Boolean, default: true }
  },

  { timestamps: true }

);


const ProductVariantModel = mongoose.models.ProductVariant || mongoose.model("ProductVariant", ProductVariantSchema);
export default ProductVariantModel;
