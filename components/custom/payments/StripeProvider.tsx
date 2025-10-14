"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

interface StripeProviderProps {
  children: ReactNode;
  options?: {
    mode?: "payment" | "setup" | "subscription";
    amount?: number;
    currency?: string;
  };
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

export default function StripeProvider({ children, options }: StripeProviderProps) {
  return <Elements stripe={stripePromise} options={options}>{children}</Elements>;
}
