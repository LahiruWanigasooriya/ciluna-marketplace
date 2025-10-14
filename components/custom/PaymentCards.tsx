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
import Master from "@/public/assets/checkout/card.png";
import Visa from "@/public/assets/checkout/visa.png";

interface PaymentCardsProps extends RadioGroupProps {
  options: PaymentCardOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  onCardSelect?: (card: PaymentCardOption) => void;
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
      last4: "Add a New Card",
      brand: "none",
      cardHolderName: "Add a New Card",
      expMonth: "01",
      expYear: "2025",
      rememberCardDetails: false,
      isConfidential: false,
      stripeCustomerId: "Add a New Card",
      paymentMethodId : "Add a New Card"
    },
  ];
  const handleSelectionChange = (value: string) => {
    onChange(value);

    // Pass the full card object to parent
    if (onCardSelect) {
      const selectedCardObject =
        options.find((option) => option.stripeCustomerId === value) || null;
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
            key={option.stripeCustomerId}
            value={option.stripeCustomerId}
            className="flex items-center gap-4 p-2 cursor-pointer w-fit h-[52px]"
          >
            {({ isSelected }) => {
              let cardImage;

              switch (option.brand?.toLowerCase()) {
                case "visa":
                  cardImage = Visa;
                  break;
                case "mastercard":
                  cardImage = Master;
                  break;
                default:
                  cardImage = NewCard;
                  break;
              }
              return (
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
                  {option.brand && (
                    <div className="w-[40px] h-[24px] relative">
                      <img
                        alt="option"
                        src={
                          typeof cardImage === "string"
                            ? cardImage
                            : cardImage.src
                        }
                        className="object-cover rounded-[4px] w-[40px] h-[24px]"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    {option.brand !== "none" ? (
                      <Label className="font-bold tracking-wider">
                        ************{option.last4}
                      </Label>
                    ) : (
                      <Label className="font-bold">{option.last4}</Label>
                    )}
                  </div>
                </>
              );
            }}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};

export default PaymentCards;
