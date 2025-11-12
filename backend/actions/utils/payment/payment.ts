import { processCryptoPayment } from "./cryptoPayment";
import { processGooglePayPayment } from "./gpayPayment";
import { processPaypalPayment } from "./paypalPayment";
import { processStripePayment } from "./stripePayment";

export async function processPayment(method: string, amount: number, paymentMethodId?: string) {
    try {
      switch (method) {
        case "visa":
        case "stripe":
          return await processStripePayment(amount);
        // case "stripe":
        //   if (!paymentMethodId) {
        //     return { success: false, message: "Missing payment method ID for Stripe/Visa" };
        //   }
        //   return await processStripePayment(amount, paymentMethodId);
        case "paypal":
          return await processPaypalPayment(amount);
        case "crypto":
          return await processCryptoPayment(amount);
        case "gpay":
          return await processGooglePayPayment(amount);
        default:
          return { success: false, message: "Invalid Payment Method" };
      }
    } catch (error) {
      console.error("Payment Processing Error:", error);
      return { success: false, message: "Payment Error" };
    }
  }
  
