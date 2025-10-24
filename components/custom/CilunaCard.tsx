import { PaymentCilunaOption } from "@/types/checkout";
import React from "react";

interface CilunaCardProps {
  card: PaymentCilunaOption;
  selectedCard: PaymentCilunaOption | null;
  onSelect: (card: PaymentCilunaOption) => void;
  isLast: boolean;
}

const CilunaCard: React.FC<CilunaCardProps> = ({ card, selectedCard, onSelect, isLast }) => {
  const isSelected = selectedCard === card;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-4">
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

        <div className="flex flex-col gap-1">
          <span className="text-gray font-arialBold">{card.label}</span>
          <span className="text-gray arial">{card.cash}</span>
        </div>
      </div>
      {!isLast && <hr className="border-t border-neutralGray-100 w-full" />}
    </div>
  );
};

export default CilunaCard;
