import { createCard } from "@/actions/users/card";
import { getUserProfile } from "@/actions/users/user";
import Stripe from "stripe";

const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16" as any,
});

// export async function processStripePayment(amount: number, paymentMethodId: string) {
//   if (!paymentMethodId) {
//     return { success: false, message: "Missing payment method ID" };
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Convert to cents
//       currency: "usd",
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     return { success: true, transactionId: paymentIntent.id };
//   } catch (error: any) {
//     console.error("Stripe Payment Error:", error.message);
//     return { success: false, message: error.message || "Stripe Payment Failed" };
//   }
// }

export async function processStripePayment(
  amount: number,
  saveCard: boolean = false,
  cardHolder?: string,
  token?: string | null
) {
  try {
    if (!amount || amount < 0.5) {
      return { success: false, message: "Should have the lowest amount" };
    }

    let user;
    let customer;

    if (token && saveCard) {
      user = (await getUserProfile(token)).user;

      if (user) {
        customer = await stripe.customers.create({
          name: cardHolder,
          email: user.email,
        });
      }
    }

    const paymentIntentParams: any = {
      amount: Math.round(amount * 100),
      currency: "usd",
    };

    // only add customer if saving card
    if (saveCard && customer?.id) {
      paymentIntentParams.customer = customer.id;
      paymentIntentParams.setup_future_usage = "off_session";
    }

    const paymentIntent = await stripe.paymentIntents.create(
      paymentIntentParams
    );

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      userId: user?._id,
      stripeCustomerId: customer ? customer.id : "",
    };
  } catch (error: any) {
    console.error("Stripe Payment Error:", error.message);
    return {
      success: false,
      message: error.message || "Stripe Payment Failed",
    };
  }
}

export async function payWithSavedCard(
  customerId: string,
  paymentMethodId: string,
  amount: number
) {
  try {
    // Attach payment method if not already attached
    await stripe.paymentMethods
      .attach(paymentMethodId, { customer: customerId })
      .catch(() => {});

    // Create a PaymentIntent using saved card
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    return { success: true, paymentIntent };
  } catch (error: any) {
    if (error.code === "authentication_required") {
      return {
        success: false,
        requiresAction: true,
        clientSecret: error.raw.payment_intent.client_secret,
      };
    }
    console.error("Stripe Payment Error:", error.message);
    return { success: false, message: error.message };
  }
}

export async function saveCardDetails(
  saveCard: boolean = false,
  paymentMethodId: string,
  cardHolderName?: string,
  token?: string | null
) {
  try {
    let user;
    let customer;

    console.log("Token: ", token);
    console.log("save card: ", saveCard);

    if (token && saveCard) {
      user = (await getUserProfile(token)).user;

      if (user && cardHolderName) {
        customer = await stripe.customers.create({
          name: cardHolderName,
          email: user.email,
        });
        await createCard(
          user._id,
          customer.id,
          cardHolderName,
          paymentMethodId
        );
      }
    }
    return { success: true, message: "Card saved successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
