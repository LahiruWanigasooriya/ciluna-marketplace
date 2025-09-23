"use server";

import mongoose from "mongoose";
import CardModel from "@/models/card";

interface CardInput {
  holderName?: string;
  cardNumber?: string;
  expireMonth?: string;
  expireYear?: string;
  cvv?: string;
  rememberCardDetails?: boolean;
}

export async function createCard(userId: string, card: CardInput) {
  try {
    if (!card.rememberCardDetails) {
      return {
        success: false,
        message: "Card not saved (rememberCardDetails is false)",
      };
    }

    const newCard = new CardModel({
      userId: new mongoose.Types.ObjectId(userId),
      ...card,
    });

    await newCard.save();

    return { success: true, message: "Card saved successfully" };
  } catch (error: any) {
    console.error("Error saving card:", error);
    return { success: false, message: error.message };
  }
}

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
