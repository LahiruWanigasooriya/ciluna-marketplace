import mongoose from "mongoose";

const SubSubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Subsubcategory name
    description: { type: String, trim: true },
    image: { type: String },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true }, // Parent subcategory reference
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Optional parent category reference
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SubSubCategoryModel = mongoose.models.SubSubCategory || mongoose.model("SubSubCategory", SubSubCategorySchema);
export default SubSubCategoryModel;