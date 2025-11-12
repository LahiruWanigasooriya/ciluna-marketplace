import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Brand name
    logo: { type: String }, // Optional: Brand logo URL
    description: { type: String, trim: true }, // Optional: Description of the brand
    isActive: { type: Boolean, default: true }, // Visibility toggle for admins
  },
  { timestamps: true }
);

const BrandModel =
  mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
export default BrandModel;
