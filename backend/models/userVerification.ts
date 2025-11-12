import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IEmailVerification extends Document {
  userId: Schema.Types.ObjectId;
  otp: string; // hashed OTP
  type: "verify_current" | "verify_new"; // phase of verification
  newEmail?: string | null; // only for new email verification
  createdAt: Date;
  expiresAt: Date;
}

const EmailVerificationSchema = new Schema<IEmailVerification>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    otp: { type: String, required: true },
    type: { type: String, enum: ["verify_current", "verify_new"], required: true },
    newEmail: { type: String, default: null },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 45 * 1000), // 45 seconds from creation
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// TTL index: expire documents 45 seconds after creation
EmailVerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 45 });

delete mongoose.models.EmailVerification;

const EmailVerification: Model<IEmailVerification> =
  mongoose.models.EmailVerification || mongoose.model<IEmailVerification>("EmailVerification", EmailVerificationSchema);

export default EmailVerification;
