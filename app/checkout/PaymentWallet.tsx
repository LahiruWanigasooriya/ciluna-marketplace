import CilunaCard from "@/components/custom/CilunaCard";
import { PaymentCilunaOption } from "@/types/checkout";
import { fadeInOut } from "@/utils/animations";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const cilunaOptions = [
  {
    _id: "1",
    label: "CILUNA Cash",
    value: "ciluna_cash",
    cash: "20,000 LKR",
  },
  {
    _id: "2",
    label: "USD Value",
    value: "usd_value",
    cash: "5,000 USD",
  },
];

const PaymentWallet = () => {
  const [selectedCard, setSelectedCard] = useState<PaymentCilunaOption | null>(cilunaOptions[0]);

  const { setValue } = useFormContext();

  useEffect(() => {
    if (selectedCard) {
      setValue("paymentMethod", "ciluna_wallet");
      setValue("cilunaWallet", selectedCard.value);
    }
  }, [selectedCard, setValue]);

  return (
    <motion.div {...fadeInOut} className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4">
      <div className="flex flex-col gap-6 w-full col-span-1 md:col-span-3">
        {cilunaOptions.map((card, index) => (
          <CilunaCard key={card._id} card={card} selectedCard={selectedCard} onSelect={setSelectedCard} isLast={index === cilunaOptions.length - 1}/>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentWallet;
