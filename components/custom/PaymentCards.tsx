"use client";

import {
  RadioGroup,
  Radio,
  RadioGroupProps,
  Label,
} from "react-aria-components";
import React from "react";
import NewCard from "@/public/assets/checkout/newCard.png";
import { PaymentCardOption } from "@/types/checkout";

interface PaymentCardsProps extends RadioGroupProps {
  options: PaymentCardOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  onCardSelect?: (card: PaymentCardOption) => void;
}

function maskDigits(
  number: string | number,
  startIndex: number,
  count: number
): string {
  const numStr = number.toString();
  return (
    numStr.slice(0, startIndex) +
    "*".repeat(count) +
    numStr.slice(startIndex + count)
  );
}

const PaymentCards: React.FC<PaymentCardsProps> = ({
  options,
  selectedValue,
  onChange,
  onCardSelect,
  ...props
}) => {
  const allOptions: PaymentCardOption[] = [
    ...options,
    {
      cardNumber: "Add a New Card",
      holderName: "Add a New Card",
      img: NewCard,
      expireMonth: "01",
      expireYear: "2025",
      cvv: "485",
      rememberCardDetails: false,
      isConfidential: false,
    },
  ];
  const handleSelectionChange = (value: string) => {
    onChange(value);

    // Pass the full card object to parent
    if (onCardSelect) {
      const selectedCardObject =
        options.find((option) => option.cardNumber === value) || null;
      if (selectedCardObject && onCardSelect) {
        onCardSelect(selectedCardObject);
      }
    }
  };

  return (
    <>
      <RadioGroup
        {...props}
        value={selectedValue}
        onChange={handleSelectionChange}
        className="flex flex-col gap-8 md:gap-12"
      >
        {allOptions.map((option) => (
          <Radio
            key={option.cardNumber}
            value={option.cardNumber}
            className="flex items-center gap-4 p-2 cursor-pointer w-fit h-[52px]"
          >
            {({ isSelected }) => (
              <>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-[14px] h-[14px] rounded-full bg-black" />
                  )}
                </div>
                {option.img && (
                  <div className="w-[40px] h-[24px] relative">
                    <img
                      alt="option"
                      src={
                        typeof option.img === "string"
                          ? option.img
                          : option.img.src
                      }
                      className="object-cover rounded-[4px] w-[40px] h-[24px]"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  {option.isConfidential ? (
                    <Label className="font-bold">
                      {maskDigits(option.cardNumber, 6, 6)}
                    </Label>
                  ) : (
                    <Label className="font-bold">{option.cardNumber}</Label>
                  )}
                </div>
              </>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};

export default PaymentCards;
