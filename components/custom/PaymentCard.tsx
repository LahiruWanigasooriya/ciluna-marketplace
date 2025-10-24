import React from "react";
import Master from "@/public/assets/checkout/card.png";
import Visa from "@/public/assets/checkout/visa.png";
import { PaymentCardOption } from "@/types/checkout";
import Image, { StaticImageData } from "next/image";

const cardBrandLogos: { [key: string]: StaticImageData } = {
  visa: Visa,
  mastercard: Master,
};

interface PaymentCardProps {
  card: PaymentCardOption;
  selectedCard: PaymentCardOption | null;
  onSelect: (card: PaymentCardOption) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ card, selectedCard, onSelect }) => {
  const isSelected = selectedCard === card;

  const brandLogoSrc = cardBrandLogos[card.brand];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 h-7">
        <div className="relative w-5 h-5 cursor-pointer" onClick={() => onSelect(card)}>
          {/* Hidden native input for accessibility */}
          <input
            type="radio"
            name="selectedCard"
            checked={isSelected}
            onChange={() => onSelect(card)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {/* Custom visual radio */}
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
              isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
            }`}
          >
            {isSelected && <div className="w-[14px] h-[14px] rounded-full bg-black" />}
          </div>
        </div>

        {/* Card Brand Logo */}
        {brandLogoSrc && (
          <Image src={brandLogoSrc} alt={`${card.brand} logo`} width={40} height={24} className="object-contain" />
        )}

        {/* Last 4 digits */}
        <span className="text-[#1E1E1E] tracking-wider font-arialBold">************{card.last4}</span>
      </div>
      <hr className="text-neutralGray-100 h-[1px]"/>
    </div>
  );
};

export default PaymentCard;
