"use server";

import mongoose from "mongoose";
import CardModel from "@/models/card";
import UserModel from "@/models/user";
import Stripe from "stripe";
import { PaymentMethod } from "@stripe/stripe-js";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16" as any,
});

export const createCard = async (
  userId: string,
  stripeCustomerId: string,
  cardHolderName: string,
  paymentMethodId: string | PaymentMethod,
) => {
  const paymentMethodIdStr =
    typeof paymentMethodId === "string" ? paymentMethodId : paymentMethodId.id;

  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodIdStr);

  const newCard = new CardModel({
    userId,
    stripeCustomerId,
    paymentMethodId: paymentMethod.id,
    brand: paymentMethod.card?.brand,
    last4: paymentMethod.card?.last4,
    expMonth: paymentMethod.card?.exp_month,
    expYear: paymentMethod.card?.exp_year,
    cardHolderName,
  });

  await newCard.save();

  return {status: 200, success: true, messagee: "Card stored successfully", card: JSON.parse(JSON.stringify(newCard))};
};

export async function getCardsByUser(userId: string) {
  try {
    const cards = await CardModel.find({ userId }).select("-__v"); // exclude mongoose version key
    return {
      success: true,
      cards: JSON.parse(JSON.stringify(cards.map((card) => card.toObject()))),
    };
  } catch (error: any) {
    console.error("Error fetching cards:", error);
    return { success: false, message: error.message };
  }
}
