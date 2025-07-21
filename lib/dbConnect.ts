// "use server";
import mongoose from 'mongoose';

const MONGODB_URL_MARKET_PLACE = process.env.MONGODB_URL_MARKET_PLACE as string;

if (!MONGODB_URL_MARKET_PLACE) {
  throw new Error('MONGODB_URL_MARKET_PLACE is not defined!');
}

// Singleton for mongoose connection
let isConnected = false;

export async function dbConnectMarketPlace() {
  if (isConnected) {
    console.log("Already connected to the paw-market-place database.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL_MARKET_PLACE);
    isConnected = true;
    console.log("paw-market-place database connected");
  } catch (error) {
    console.error('paw-market-place database connection failed!', error);
    throw new Error('paw-market-place database connection failed!');
  }
}

export { mongoose };
