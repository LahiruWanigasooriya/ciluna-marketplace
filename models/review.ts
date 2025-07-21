import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productVariant: { type: mongoose.Schema.Types.ObjectId, ref: "productVariant", required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the review
  },
  { timestamps: true }
);

const ReviewModel = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default ReviewModel;
