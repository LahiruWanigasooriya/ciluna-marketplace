import { Checkout } from "@/types/checkout";
import React from "react";
import {
  Checkbox,
  Label,
  Radio,
  RadioGroup,
  Text,
} from "react-aria-components";

interface Option {
  name: string;
  contactNumber: string;
  address: string;
  isDefault: boolean;
}

interface AddressCardProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  handleChange: <K extends keyof Checkout>(name: K, value: Checkout[K]) => void;
  onEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressCard = ({
  options,
  selectedValue,
  onChange,
  handleChange,
  onEdit,
  ...props
}: AddressCardProps) => {
  return (
    <div>
      <RadioGroup
        {...props}
        value={selectedValue}
        onChange={(val) => onChange(val)}
        className="flex flex-col gap-4"
      >
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <hr className="border-t-2 border-[#E1E1E1]" />
            <div className="flex items-start lg:items-center justify-between gap-2">
              <Radio
                key={index}
                value={option.name}
                className="flex flex-col lg:flex-row items-start gap-4 cursor-pointer w-fit"
              >
                {({ isSelected }) => (
                  <>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-[14px] h-[14px] rounded-full bg-black" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">
                        {option.name} | <span>{option.contactNumber}</span>
                      </Label>
                      <Text slot="description">{option.address}</Text>
                      {option.isDefault ? (
                        <div className="bg-[#E1E1E1] text-[#707070] py-1 px-3 rounded-[4px] w-fit">
                          Default
                        </div>
                      ) : (
                        <div className="w-fit hover:cursor-pointer">
                          <Checkbox
                            isSelected={option.name === selectedValue}
                            onChange={(isSelected: boolean) =>
                              handleChange("rememberShippingAddress", isSelected)
                            }
                          >
                            Set as a default shipping address
                          </Checkbox>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Radio>

              <div className=" font-bold text-[1rem] hover:cursor-pointer hover:underline" onClick={() => onEdit(true)}>
                Edit
              </div>
            </div>
          </React.Fragment>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AddressCard;
