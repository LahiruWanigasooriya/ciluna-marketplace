import AddNewCardItem from "@/components/custom/AddNewCardItem";
import PaymentCard from "@/components/custom/PaymentCard";
import { PaymentCardOption } from "@/types/checkout";
import React, { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import Modal from "@/components/custom/Modal";
import PaymentCardForm from "./PaymentCardForm";
import StripeProvider from "@/components/custom/payments/StripeProvider";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { calculateTotals } from "@/utils/getDiscountPrice";
import { useCartStore } from "@/store/cart";

interface PaymentCardsProps {
  cards: PaymentCardOption[];
  selectedCard: PaymentCardOption;
  setSelectedCard: React.Dispatch<React.SetStateAction<PaymentCardOption>>;
  fetchData: () => Promise<void>
}

const PaymentCards: React.FC<PaymentCardsProps> = ({ cards, selectedCard, setSelectedCard, fetchData }) => {
  const [addNew, setAddNew] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { setValue } = useFormContext();
  const { cart } = useCartStore();
  const { rate } = useExchangeRate();

  const { finalPrice } = useMemo(() => calculateTotals(cart, rate), [cart]);

  useEffect(() => {
    if (selectedCard) {
      setValue("paymentMethod", "card");
      setValue("holderName", selectedCard.cardHolderName);
    }
  }, [selectedCard, setValue]);

  const handleAddNew = () => {
    setIsFormOpen(true);
    setAddNew(true);
  };

  const handleSuccess = async () => {
    fetchData();
    setAddNew(false);
    setIsFormOpen(false);
  }

  const handleCancel = () => {
    setAddNew(false);
    setIsFormOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {cards.map((card) => (
          <PaymentCard key={card._id} card={card} selectedCard={selectedCard} onSelect={setSelectedCard} />
        ))}
      </div>
      <AddNewCardItem onSelect={handleAddNew} addNew={addNew} />
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        {finalPrice > 0 && (
          <StripeProvider
            options={{
              mode: "payment",
              amount: Math.round(finalPrice * 100),
              currency: "usd",
            }}
          >
            <PaymentCardForm onCancel={handleCancel} onSuccess={handleSuccess}/>
          </StripeProvider>
        )}
      </Modal>
    </div>
  );
};

export default PaymentCards;
