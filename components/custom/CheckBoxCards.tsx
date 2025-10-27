import React from "react";
import { Checkbox } from "@/components/ui";

interface Option {
    icon: React.JSX.Element;
    label: string;
    value: string;
}

interface CheckBoxCardsProps {
    options: Option[];
    handleChange: (data: string) => void;
    selectedPaymentMethod: string;
}

const CheckBoxCards: React.FC <CheckBoxCardsProps> = ({options, handleChange, selectedPaymentMethod}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex justify-between pl-3 pr-1 w-full bg-white h-[44px] items-center rounded-[8px]"
          >
            <div className="flex gap-2">
              {option.icon} <p>{option.label}</p>
            </div>
            <Checkbox
              isSelected={selectedPaymentMethod === option.value}
              onChange={() => handleChange(option.value)}
            ></Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxCards;
