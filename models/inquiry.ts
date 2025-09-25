import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // contactNo: {
    //   type: String,
    //   required: false,
    // },
    message: {
      type: String,
      required: true,
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "archived"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error in development
const InquiryModel = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

export default InquiryModel;
