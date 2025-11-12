import React, { useState } from "react";
import Master from "@/public/assets/checkout/card.png";
import Title from "@/components/custom/Title";
import { Button, Checkbox } from "@/components/ui";
import { TextField } from "@/components/ui/text-field";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentValidationSchema } from "@/schemas/validationSchemas";
import { CircleX, Info } from "lucide-react";
import * as Yup from "yup";
import Image from "next/image";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { saveCardDetails } from "@/backend/actions/utils/payment/stripePayment";
import { useAuthStore } from "@/store/authStore";
import { cardNumberOptions } from "@/utils/styles";
import { toast } from "sonner";

type FormFields = Yup.InferType<typeof paymentValidationSchema>;
interface PaymentCardFormProps {
  onCancel: () => void;
  onSuccess: () => Promise<void>;
}

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({ onCancel, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { getToken } = useAuthStore();
  const token = getToken();

  const [cardError, setCardError] = useState<Record<string, string> | null>(null);

  const {
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(paymentValidationSchema),
    defaultValues: {
      paymentMethod: "card",
      rememberCardDetails: true,
    },
  });

  const addCard = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    const cardExpElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardElement || !cardExpElement || !cardCvcElement) return;

    const cardHolderName = getValues("holderName");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: { name: cardHolderName },
    });

    if (error) {
      console.error("Failed to create payment method:", error.message);
      return;
    }

    const result = await saveCardDetails(
      getValues("rememberCardDetails"),
      paymentMethod.id,
      getValues("holderName"),
      token
    );

    toast.success(result.message);
    return true;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const success = await addCard();
    if (success) {
      onSuccess();
    }
  };

  return (
    <div className="relative bg-white rounded-[8px] md:w-[655px] w-full">
      <div className="flex flex-col gap-4 max-h-[90vh] lg:max-h-none overflow-y-auto p-4 md:p-6">
        <div>
          <Title title="Add a New Card" className="font-arialBold !text-xl !leading-6 md:!text-xl md:!leading-8" />
        </div>
        <div className="absolute top-0 right-0 p-2 z-10">
          <CircleX
            fill="#ffffff"
            color="#252525"
            strokeWidth={2}
            className="cursor-pointer h-5 w-5 hover:opacity-70"
            onClick={onCancel}
          />
        </div>
        <div className="gap-y-4 flex flex-col">
          <div className="w-full col-span-3">
            <Controller
              name="holderName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name on Card*"
                  className="custom-textfield"
                  inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
                  groupClassName="border border-[#E1E1E1]"
                  placeholder="Enter name on the card"
                  name="holderName"
                  id="holderName"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.holderName && <p className="text-red-500 text-xs mt-1">{errors.holderName.message}</p>}
          </div>
          <div className="w-full col-span-3">
            <label className="font-arial text-gray">Card Number*</label>
            <div className="flex items-center bg-white rounded-[8px] mt-2 p-[10px] border border-[#E1E1E1]">
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
          <div className="gap-2 md:gap-4 col-span-3 items-end grid grid-cols-6">
            <div className="w-full col-span-3 md:col-span-2">
              <label className="font-arial text-gray">Expiry*</label>
              <CardExpiryElement
                options={cardNumberOptions}
                className="mt-2 px-3 py-[10px] bg-white rounded-[0.5rem] h-[44px] border border-[#E1E1E1]"
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
                className="h-[44px] mt-2 px-3 py-[10px] bg-white rounded-[0.5rem] border border-[#E1E1E1]"
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
              <p className="text-red-500 text-xs mt-1">{errors.rememberCardDetails.message}</p>
            )}
          </div>
          <div className="flex gap-3 md:gap-4 mt-4">
            <Button className="w-full border !border-gray text-lg" size="extra-large" onPress={onCancel}>
              Cancel
            </Button>
            <Button
              className="w-full text-white bg-gray text-lg"
              size="extra-large"
              onPress={() => handleSubmit(onSubmit)()}
            >
              {isSubmitting ? "Loading..." : "Save Details"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardForm;
