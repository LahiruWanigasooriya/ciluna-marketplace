// "use server";
import mongoose from "mongoose";

const MONGODB_URL_CILUNA = process.env.MONGODB_URL_CILUNA as string;

if (!MONGODB_URL_CILUNA) {
  throw new Error("MONGODB_URL_CILUNA is not defined!");
}

// Singleton for mongoose connection
let isConnected = false;

export async function dbConnectMarketPlace() {
  if (isConnected) {
    console.log("Already connected to the paw-market-place database.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL_CILUNA);
    isConnected = true;
    console.log("paw-market-place database connected");
  } catch (error) {
    console.error("paw-market-place database connection failed!", error);
    throw new Error("paw-market-place database connection failed!");
  }
}

export { mongoose };