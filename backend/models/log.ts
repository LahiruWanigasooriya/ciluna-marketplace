import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    username: { type: String, required: true },
    role: { type: String, enum: ["admin", "superadmin"], required: true },
    action: { type: String, required: true },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Log || mongoose.model("Log", logSchema);