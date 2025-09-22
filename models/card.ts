import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  userId: mongoose.Types.ObjectId;
  holderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvv: string;
}

const CardSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    holderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expireMonth: { type: String, required: true },
    expireYear: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema);
