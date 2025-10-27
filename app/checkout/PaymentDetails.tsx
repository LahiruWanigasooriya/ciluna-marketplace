import { PaymentCardOption } from "@/types/checkout";
import React, { useEffect, useMemo } from "react";
import InitialCardForm from "./InitialCardForm";
import PaymentCards from "./PaymentCards";
import CheckBoxCards from "@/components/custom/CheckBoxCards";
import { CreditCard, WalletCards } from "lucide-react";
import PaymentWallet from "./PaymentWallet";
import { useFormContext, useWatch } from "react-hook-form";
import StripeProvider from "@/components/custom/payments/StripeProvider";
import { useCartStore } from "@/store/cart";
import { calculateTotals } from "@/utils/getDiscountPrice";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import Title from "@/components/custom/Title";

interface PaymentDetailsProps {
  cards: PaymentCardOption[];
  selectedCard: PaymentCardOption;
  setSelectedCard: React.Dispatch<React.SetStateAction<PaymentCardOption>>;
  fetchData: () => Promise<void>
}

const options = [
  { icon: <CreditCard />, label: "Card", value: "card" },
  { icon: <WalletCards />, label: "Ciluna Wallet", value: "ciluna_wallet" },
];

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ cards, selectedCard, setSelectedCard,fetchData }) => {
  const newCard = cards.length === 0;
  const { control, register, setValue } = useFormContext();

  const { cart } = useCartStore();
  const { rate } = useExchangeRate();

  const { finalPrice } = useMemo(() => calculateTotals(cart, rate), [cart]);

  const selectedPaymentMethod = useWatch({
    control,
    name: "paymentMethod",
  });

  useEffect(() => {
    register("paymentMethod", { required: true });

    if (!selectedPaymentMethod) {
      setValue("paymentMethod", options[1].value);
    }
  }, [register, setValue, selectedPaymentMethod]);

  const handleChange = (method: string) => {
    setValue("paymentMethod", method, { shouldValidate: true });
  };

  return (
    <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
      <Title title="Payment Method" className="!text-base md:!text-lg !leading-6 font-arialBold text-start" />

      <hr className="text-neutralGray-100 h-[1px]" />

      <div className="pb-2">
        <CheckBoxCards options={options} handleChange={handleChange} selectedPaymentMethod={selectedPaymentMethod} />
      </div>

      {selectedPaymentMethod === "ciluna_wallet" && <PaymentWallet />}

      {selectedPaymentMethod === "card" && (
        <>
          {newCard ? (
            <StripeProvider
              options={{
                mode: "payment",
                amount: Math.round(finalPrice * 100),
                currency: "usd",
              }}
            >
              <InitialCardForm />
            </StripeProvider>
          ) : (
            <PaymentCards cards={cards} selectedCard={selectedCard} setSelectedCard={setSelectedCard} fetchData={fetchData}/>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentDetails;
