"use client";

import {
  RadioGroup,
  Radio,
  Text,
  RadioGroupProps,
  Label,
} from "react-aria-components";
import React, { useEffect } from "react";
import { maskDigits } from "@/utils/maskDigits";

interface Option {
  label: string;
  value: string;
  description?: string;
  prefixImage?: React.ReactNode;
}

interface CilunaCardsProps extends RadioGroupProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  isConfidential?: boolean;
  onCardSelect?: (card: Option) => void;
}

const CilunaCards: React.FC<CilunaCardsProps> = ({
  options,
  selectedValue,
  onChange,
  isConfidential = false,
  onCardSelect,
  ...props
}) => {
  const handleSelectionChange = (value: string) => {
    onChange(value);

    // Pass the full card object to parent
    if (onCardSelect) {
      const selectedCardObject =
        options.find((option) => option.value === value) || null;
      if (selectedCardObject && onCardSelect) {
        onCardSelect(selectedCardObject);
      }
    }
  };

  useEffect(() => {
    if(onCardSelect) onCardSelect(options[0]);
  }, []);
  
  return (
    <RadioGroup
      {...props}
      value={selectedValue}
      onChange={handleSelectionChange}
      className="flex flex-col gap-8 md:gap-12 col-span-3"
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          className="flex items-center gap-4 p-2 cursor-pointer w-fit h-[52px]"
        >
          {({ isSelected }) => (
            <>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
                }`}
              >
                {isSelected && (
                  <div className="w-[14px] h-[14px] rounded-full bg-black" />
                )}
              </div>
              {option.prefixImage && option.prefixImage}
              <div className="flex flex-col gap-1">
                {isConfidential ? (
                  <Label className="font-bold">
                    {maskDigits(option.label, 6, 6)}
                  </Label>
                ) : (
                  <Label className="font-bold">{option.label}</Label>
                )}
                <Text slot="description">{option.description}</Text>
              </div>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default CilunaCards;
