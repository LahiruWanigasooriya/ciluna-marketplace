import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  contactName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  street: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  town: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
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
    dateofbirth: {
      type: Date,
      required: true,
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
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: [AddressSchema],
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
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error in development
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
