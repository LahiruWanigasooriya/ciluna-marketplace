import Title from "@/components/custom/Title";
import SelectDropdown from "@/components/ui/select-dropdown";
import { Checkout } from "@/types/checkout";
import React, { useMemo, useState } from "react";
import { TextField } from "@/components/ui/text-field";
import Tel from "@/components/custom/Phone";

import ReactCountryFlag from "react-country-flag";
import { SingleValue } from "react-select";
import countryList from "react-select-country-list";
import { provinces } from "@/constants/dropdown-items";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

interface OptionType {
  value: string;
  label: string;
}

interface ShippingAddressProps {
  title: string;
  values: Checkout;
  handleChange: <K extends keyof Checkout>(name: K, value: Checkout[K]) => void;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  title,
  values,
  handleChange,
  onCancel,
}) => {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>();
  const districts =
    provinces.find((p) => p.value === selectedProvince)?.districts || [];
  const towns =
    districts.find((d) => d.value === selectedDistrict)?.towns || [];

  const formatOptionLabel = ({ value, label }: OptionType) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ReactCountryFlag
        countryCode={value}
        svg
        style={{ marginRight: "8px" }}
      />
      <span>{label}</span>
    </div>
  );
  return (
    <div className="relative bg-white rounded-[8px] md:w-[655px] w-full">
      <div className="flex flex-col gap-4 max-h-[90vh] lg:max-h-none overflow-y-auto p-4 md:p-6">
        <Title title={title} />

        <div className="absolute top-0 right-0 p-2 z-10">
          <CircleX
            fill="#ffffff"
            color="#252525"
            strokeWidth={2}
            className="cursor-pointer h-5 w-5 hover:opacity-70"
            onClick={() => onCancel(false)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <SelectDropdown
            label="Country*"
            options={countryOptions}
            value={
              countryOptions.find(
                (option) => option.value === values.country
              ) || null
            }
            onChange={(selectedOption: SingleValue<OptionType>) => {
              const value = selectedOption ? selectedOption.value : "";
              handleChange("country", value);
            }}
            formatOptionLabel={formatOptionLabel}
            placeholder="Enter country name"
            showFlags={true}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Contact Name*"
              className="custom-textfield w-full"
              inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
              placeholder="Enter contact name"
              name="contactName"
              id="contactName"
              type="text"
              value={values.contactName}
              onChange={(value: string) => handleChange("contactName", value)}
            />

            <Tel
              value={values.mobileNumber}
              onChange={(phone: string) => handleChange("mobileNumber", phone)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <TextField
              label="Street name and number"
              className="custom-textfield w-full"
              inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
              placeholder="Ex: 123, Main street"
              name="street"
              id="street"
              type="text"
              value={values.street}
              onChange={(value: string) => handleChange("street", value)}
            />

            <SelectDropdown
              label="Province*"
              options={provinces}
              value={
                provinces.find((option) => option.value === values.province) ||
                null
              }
              onChange={(selectedOption: SingleValue<OptionType>) => {
                const value = selectedOption ? selectedOption.value : "";
                setSelectedProvince(value);
                handleChange("province", value);
              }}
              placeholder="Select your province"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <SelectDropdown
              label="District*"
              options={districts}
              value={
                districts.find((option) => option.value === values.district) ||
                null
              }
              onChange={(selectedOption: SingleValue<OptionType>) => {
                const value = selectedOption ? selectedOption.value : "";
                setSelectedDistrict(value);
                handleChange("district", value);
              }}
              placeholder="Select your district"
            />

            <SelectDropdown
              label="Area/Town*"
              options={towns}
              value={
                towns.find((option) => option.value === values.town) || null
              }
              onChange={(selectedOption: SingleValue<OptionType>) => {
                const value = selectedOption ? selectedOption.value : "";
                handleChange("town", value);
              }}
              placeholder="Select your area"
            />

            <TextField
              label="Zip Code*"
              className="custom-textfield w-full"
              inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray  border border-[#E1E1E1]"
              placeholder="Your area postal code"
              name="zip"
              id="zip"
              type="text"
              value={values.zip}
              onChange={(value: string) => handleChange("zip", value)}
            />
          </div>

          <div className="w-fit hover:cursor-pointer">
            <Checkbox
              isSelected={values.rememberShippingAddress}
              onChange={(isSelected: boolean) =>
                handleChange("rememberShippingAddress", isSelected)
              }
            >
              Set as a default shipping address
            </Checkbox>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4 mt-4">
          <Button
            className="w-full border !border-gray text-lg"
            size="extra-large"
            onPress={() => onCancel(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-full text-white bg-gray text-lg"
            size="extra-large"
          >
            Update Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
