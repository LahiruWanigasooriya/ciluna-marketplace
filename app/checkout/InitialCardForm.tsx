import { OrderFormFields } from "@/types/checkout";
import React, { useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { SingleValue } from "react-select";
import { TextField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui";
import Image from "next/image";
import Master from "@/public/assets/checkout/card.png";
import SelectDropdown from "@/components/ui/select-dropdown";
import { months, years } from "@/constants/dropdown-items";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInOut } from "@/utils/animations";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart";
import { getDiscountedPrice } from "@/utils/getDiscountPrice";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { processStripePayment } from "@/actions/utils/payment/stripePayment";
import { useAuthStore } from "@/store/authStore";
import { createCard } from "@/actions/users/card";

interface OptionType {
  value: string;
  label: string;
}

const cardNumberOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0a0a0",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
  hidePostalCode: true,
};

interface CreatePaymentIntentParams {
  amount: number; // in smallest currency unit, e.g. cents
  currency: string; // e.g. "usd"
  customer?: string; // Stripe customer ID, optional if one-time payment
  setup_future_usage?: "off_session" | "on_session"; // optional, if saving card
}

// interface InitialCardFormProps {
//   control: Control<OrderFormFields>;
//   errors: FieldErrors<OrderFormFields>;
//   setValue: UseFormSetValue<OrderFormFields>;
//   getValues: UseFormGetValues<OrderFormFields>;
// }

const InitialCardForm = forwardRef(
  ({ control, errors, setValue, getValues }: any, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    const { cart } = useCartStore();
    const { rate } = useExchangeRate();
    const { getToken } = useAuthStore();
    const token = getToken();

    const calculateTotals = (items: any[]) => {
      const totalPrice = items.reduce(
        (acc, item) =>
          acc +
          getDiscountedPrice(item.price / rate, item.discount) * item.quantity,
        0
      );
      const discount = totalPrice * 0.1; // 10% discount as per your logic
      const finalPrice = totalPrice - discount;

      return { totalPrice, discount, finalPrice };
    };

    const { finalPrice } = useMemo(() => calculateTotals(cart), [cart]);

    useImperativeHandle(ref, () => ({
      submitPayment: async () => {
        if (!stripe || !elements) return { error: "Stripe not ready" };

        const cardElement = elements.getElement(CardNumberElement);

        if (!cardElement) {
          return;
        }

        const result = await processStripePayment(
          finalPrice,
          getValues("rememberCardDetails"),
          getValues("holderName"),
          token
        );
        if (!result.success || !result.clientSecret) {
          console.error("Failed to create payment intent:", result.message);
          return { error: result.message };
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          result.clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: getValues("holderName"),
              },
            },
          }
        );

        if (error) {
          console.error(error.message);
        } else if (getValues("rememberCardDetails") && result.userId && paymentIntent?.payment_method) {
          // Save card info in DB
          await createCard(result.userId, result.stripeCustomerId, getValues("holderName"), paymentIntent.payment_method);
        }

        return { error };
      },
    }));

    return (
      <motion.div
        {...fadeInOut}
        className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
      >
        <div className="w-full col-span-3">
          <Controller
            name="holderName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name on Card*"
                className="custom-textfield font-arial"
                inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                groupClassName="border-none"
                placeholder="Enter name on the card"
                name="holderName"
                id="holderName"
                type="text"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.holderName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.holderName.message}
            </p>
          )}
        </div>
        <div className="w-full col-span-3">
          {/* Stripe Card Element */}
          <div className="w-full col-span-3">
            <label className="font-arial text-gray">Card Number*</label>
            <div className="flex items-center bg-white rounded-[8px] mt-2 p-[10px]">
              <div className="w-[40px] h-[24px] relative mr-2">
                <Image
                  alt="card-logo"
                  src={Master.src}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <CardNumberElement options={cardNumberOptions} />
              </div>
            </div>
            <p
              id="card-errors"
              role="alert"
              className="text-red-500 text-xs mt-1"
            />
          </div>
        </div>
        <div className="gap-2 md:gap-4 col-span-3 items-end grid grid-cols-6">
          <div className="w-full col-span-3 md:col-span-2">
            <label className="font-arial text-gray">Expiry*</label>
            <CardExpiryElement
              options={cardNumberOptions}
              className="mt-2 px-3 py-[10px] bg-white rounded-[0.5rem] h-[44px]"
            />
          </div>

          <div className="w-full col-span-3 md:col-span-2">
            <label className="font-arial text-gray">CVV*</label>
            <CardCvcElement
              options={cardNumberOptions}
              className="h-[44px] mt-2 px-3 py-[10px] bg-white rounded-[0.5rem]"
            />
          </div>

        </div>
        <div className="w-fit hover:cursor-pointer">
          <Checkbox
            onChange={(isSelected: boolean) =>
              setValue("rememberCardDetails", isSelected)
            }
          >
            Save card details
          </Checkbox>
          {errors.rememberCardDetails && (
            <p className="text-red-500 text-xs mt-1">
              {errors.rememberCardDetails.message}
            </p>
          )}
        </div>
      </motion.div>
    );
  }
);

export default InitialCardForm;
