import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16"as any, 
});

export async function processStripePayment(amount: number, paymentMethodId: string) {
  if (!paymentMethodId) {
    return { success: false, message: "Missing payment method ID" };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    return { success: true, transactionId: paymentIntent.id };
  } catch (error: any) {
    console.error("Stripe Payment Error:", error.message);
    return { success: false, message: error.message || "Stripe Payment Failed" };
  }
}
