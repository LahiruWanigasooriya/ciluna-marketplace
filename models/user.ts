import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    isDeleted: { 
      type: Boolean, 
      default: false 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
    activeStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
    notificationSettings: {
      orderConfirmation: { type: Boolean, default: true },
      orderDelivered: { type: Boolean, default: true },
      orderStatusChanged: { type: Boolean, default: true },
      emailNotification: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error in development
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
