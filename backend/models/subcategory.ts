import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true }, // Subcategory name
    description: { type: String, trim: true },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Parent category reference
    isActive: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const SubcategoryModel = mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema);
export default SubcategoryModel;
