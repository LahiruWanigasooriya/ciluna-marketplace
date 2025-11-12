import mongoose from "mongoose";


const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References User Model
      required: true,
      unique: true, // One wishlist per user
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // References Product Model
      },
    ],
  },
  { timestamps: true }
);

const WishlistModel =
  mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);

export default WishlistModel;
