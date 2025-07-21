import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);