"use client";

import {
  RadioGroup,
  Radio,
  Text,
  RadioGroupProps,
  Label,
} from "react-aria-components";
import React from "react";

interface Option {
  label: string;
  value: string;
  description?: string;
  prefixImage?: React.ReactNode;
}

interface RadioGroupFieldProps extends RadioGroupProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  options,
  selectedValue,
  onChange,
  ...props
}) => {
  return (
    <RadioGroup
      {...props}
      value={selectedValue}
      onChange={(val) => onChange(val)}
      className="flex flex-col gap-8 md:gap-12"
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
              {option.prefixImage && (option.prefixImage)}
              <div className="flex flex-col gap-1">
                <Label className="font-bold">{option.label}</Label>
                <Text slot="description">{option.description}</Text>
              </div>
            </>
          )}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupField;
