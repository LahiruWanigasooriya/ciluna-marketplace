import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productVariant: { type: mongoose.Schema.Types.ObjectId, ref: "productVariant", required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    // title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ 
      type: String, // Array of Cloudinary URLs
      validate: {
        validator: function(v: string) {
          // Optional: Validate that it's a valid URL
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Invalid image URL'
      }
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the review
  },
  { timestamps: true }
);

const ReviewModel = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default ReviewModel;
