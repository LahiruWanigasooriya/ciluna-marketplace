import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Unique category name
    description: { type: String, required: true }, 
    image: { type: String, required: true }, // Image URL or path for the category
    isActive: { type: Boolean, default: true }, // Visibility toggle for admins
  },
  { timestamps: true } 
);

const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default CategoryModel;
