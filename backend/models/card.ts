import mongoose, { Schema, model, Document, models } from "mongoose";

interface ICard extends Document {
  userId: Schema.Types.ObjectId;     // Link to your User
  stripeCustomerId: string;          // Stripe customer ID
  paymentMethodId: string;           // Stripe PaymentMethod ID
  brand: string;                     // Visa, MasterCard, etc.
  last4: string;                     // last 4 digits of the card
  expMonth: number;                  // expiry month (for display)
  expYear: number;                   // expiry year (for display)
  cardHolderName?: string;           // optional, only for display
  createdAt?: Date;
  updatedAt?: Date;
}

const CardSchema: Schema = new Schema<ICard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stripeCustomerId: { type: String, required: true },
    paymentMethodId: { type: String, required: true },
    brand: { type: String, required: true },
    last4: { type: String, required: true },
    expMonth: { type: Number, required: true },
    expYear: { type: Number, required: true },
    cardHolderName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Card || mongoose.model<ICard>("Card", CardSchema);
