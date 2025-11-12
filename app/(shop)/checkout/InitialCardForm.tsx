import { OrderFormFields } from "@/types/checkout";
import React, { useMemo, useState } from "react";
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
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart";
import { calculateTotals, getDiscountedPrice } from "@/utils/getDiscountPrice";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { processStripePayment } from "@/backend/actions/utils/payment/stripePayment";
import { useAuthStore } from "@/store/authStore";
import { createCard } from "@/backend/actions/users/card";
import { cardNumberOptions } from "@/utils/styles";
import { Controller, useFormContext } from "react-hook-form";
import { usePaymentStore } from "@/store/paymentStore";

const InitialCardForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const stripe = useStripe();
  const elements = useElements();
  const setSubmitPayment = usePaymentStore((state) => state.setSubmitPayment);

  const { cart } = useCartStore();
  const { rate } = useExchangeRate();
  const { getToken } = useAuthStore();
  const token = getToken();

  const { finalPrice } = useMemo(() => calculateTotals(cart, rate), [cart]);
  const [cardError, setCardError] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (!stripe || !elements) return;

    // Register function into the store
    setSubmitPayment(async () => {
      const cardElement = elements.getElement(CardNumberElement);
      const cardExpElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (!cardElement || !cardExpElement || !cardCvcElement) return { error: "Required fields are missing" };

      const result = await processStripePayment(
        finalPrice,
        getValues("rememberCardDetails"),
        getValues("holderName"),
        token
      );

      if (!result.success || !result.clientSecret) {
        return { error: result.message };
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(result.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: getValues("holderName") },
        },
      });

      if (error) {
        console.error(error.message);
        return { error: error.message };
      } else if (getValues("rememberCardDetails") && result.userId && paymentIntent?.payment_method) {
        // Save card info in DB
        await createCard(result.userId, result.stripeCustomerId, getValues("holderName"), paymentIntent.payment_method);
      }

      return { success: true, paymentIntent };
    });

    return () => setSubmitPayment(null);
  }, [stripe, elements]);

  return (
    <motion.div {...fadeInOut} className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4">
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
        {errors.holderName && <p className="text-red-500 text-xs mt-1">{String(errors.holderName.message)}</p>}
      </div>
      <div className="w-full col-span-3">
        {/* Stripe Card Element */}
        <div className="w-full col-span-3">
          <label className="font-arial text-gray">Card Number*</label>
          <div className="flex items-center bg-white rounded-[8px] mt-2 p-[10px]">
            <div className="w-[40px] h-[24px] relative mr-2">
              <Image alt="card-logo" src={Master.src} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <CardNumberElement
                options={cardNumberOptions}
                onChange={(event) => {
                  if (event.error) {
                    setCardError((prev) => ({
                      ...prev,
                      cardNumber: "Please enter a valid card number",
                    }));
                  } else {
                    setCardError((prev) => ({
                      ...prev,
                      cardNumber: "",
                    }));
                  }
                }}
              />
            </div>
          </div>
          {cardError?.cardNumber && <p className="text-red-500 text-xs mt-1">{cardError.cardNumber}</p>}
        </div>
      </div>
      <div className="gap-2 md:gap-4 col-span-3 items-end grid grid-cols-6">
        <div className="w-full col-span-3 md:col-span-2">
          <label className="font-arial text-gray">Expiry*</label>
          <CardExpiryElement
            options={cardNumberOptions}
            className="mt-2 px-3 py-[10px] bg-white rounded-[0.5rem] h-[44px]"
            onChange={(event) => {
              if (event.error) {
                setCardError((prev) => ({
                  ...prev,
                  cardExp: "Please enter a vaid expiry",
                }));
              } else {
                setCardError((prev) => ({
                  ...prev,
                  cardExp: "",
                }));
              }
            }}
          />
          {cardError?.cardExp && <p className="text-red-500 text-xs mt-1">{cardError.cardExp}</p>}
        </div>

        <div className="w-full col-span-3 md:col-span-2">
          <label className="font-arial text-gray">CVV*</label>
          <CardCvcElement
            options={cardNumberOptions}
            className="h-[44px] mt-2 px-3 py-[10px] bg-white rounded-[0.5rem]"
            onChange={(event) => {
              if (event.error) {
                setCardError((prev) => ({
                  ...prev,
                  cardCvc: "Please enter a valid cvc",
                }));
              } else {
                setCardError((prev) => ({
                  ...prev,
                  cardCvc: "",
                }));
              }
            }}
          />
          {cardError?.cardCvc && <p className="text-red-500 text-xs mt-1">{cardError.cardCvc}</p>}
        </div>
      </div>
      <div className="w-fit hover:cursor-pointer">
        <Checkbox onChange={(isSelected: boolean) => setValue("rememberCardDetails", isSelected)}>
          Save card details
        </Checkbox>
        {errors.rememberCardDetails && (
          <p className="text-red-500 text-xs mt-1">{String(errors.rememberCardDetails.message)}</p>
        )}
      </div>
    </motion.div>
  );
};

export default InitialCardForm;
