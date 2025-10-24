import React from "react";
import Image from "next/image"; // Assuming Next.js Image
import Visa from "@/public/assets/checkout/visa.png";
import Master from "@/public/assets/checkout/card.png";
import Amex from "@/public/assets/checkout/amex.png";
import Apple from "@/public/assets/checkout/apple.png";
import Union from "@/public/assets/checkout/union.png";
import NewCard from "@/public/assets/checkout/newCard.png";

interface AddNewCardItemProps {
  // selectedCardId: string | null;
  onSelect: () => void;
  addNew: boolean;
}

const images = [Visa, Master, Amex, Apple, Union];

const AddNewCardItem: React.FC<AddNewCardItemProps> = ({ onSelect, addNew }) => {
  // const newCardId = "newCard";
  // const isSelected = selectedCardId === newCardId;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4 h-7">
        <div className="relative w-5 h-5 cursor-pointer" onClick={() => onSelect()}>
          {/* Hidden native input for accessibility */}
          <input
            type="radio"
            name="selectedCard"
            checked={addNew}
            onChange={() => onSelect()}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {/* Custom visual radio */}
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
              addNew ? "border-blue-500 bg-blue-500" : "border-gray-400"
            }`}
          >
            {addNew && <div className="w-[14px] h-[14px] rounded-full bg-black" />}
          </div>
        </div>

        {/* Generic Card Icon */}
        <Image src={NewCard} alt="New Card" width={40} height={24} className="object-contain" />

        {/* Text label */}
        <span className="text-[#1E1E1E] tracking-wider font-arialBold">Add a New Card</span>
      </div>
      <div className="flex gap-2 pl-7">
        {images.map((image, index) => (
          <Image key={index} src={image} alt="New Card" width={33} height={20} className="object-contain" />
        ))}
      </div>
    </div>
  );
};

export default AddNewCardItem;
