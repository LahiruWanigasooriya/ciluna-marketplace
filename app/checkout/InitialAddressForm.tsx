import SelectDropdown from "@/components/ui/select-dropdown";
import React, { useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { SingleValue } from "react-select";
import countryList from "react-select-country-list";
import { TextField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui";
import Tel from "@/components/custom/Phone";
import { provinces } from "@/constants/dropdown-items";
import { OrderFormFields } from "@/types/checkout";

interface OptionType {
  value: string;
  label: string;
}

interface InitialAddressFormProps {
  control: Control<OrderFormFields>;
  errors: FieldErrors<OrderFormFields>;
  getValues: UseFormGetValues<OrderFormFields>;
  setValue: UseFormSetValue<OrderFormFields>;
}

const InitialAddressForm: React.FC<InitialAddressFormProps> = ({
  control,
  errors,
  getValues,
  setValue,
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
    <div className="flex flex-col gap-4">
      <div>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <SelectDropdown
              label="Country*"
              labelClassName="font-arial"
              options={countryOptions}
              value={
                countryOptions.find((opt) => opt.value === field.value) || null
              }
              onChange={(selected: SingleValue<OptionType>) =>
                field.onChange(selected?.value || "")
              }
              formatOptionLabel={formatOptionLabel}
              placeholder="Enter country name"
              showFlags={true}
            />
          )}
        />
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <Controller
            name="contactName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Contact Name*"
                className="custom-textfield w-full font-arial"
                inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                groupClassName="border-none"
                placeholder="Enter contact name"
                name="contactName"
                id="contactName"
                type="text"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.contactName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contactName.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field }) => (
              <Tel
                value={getValues("mobileNumber")}
                onChange={(phone: string) => setValue("mobileNumber", phone)}
              />
            )}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <TextField
                label="Street name and number*"
                className="custom-textfield w-full font-arial"
                inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                groupClassName="border-none"
                placeholder="Ex: 123, Main street"
                name="street"
                id="street"
                type="text"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.street && (
            <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <SelectDropdown
                label="Province*"
                labelClassName="font-arial"
                options={provinces}
                value={
                  provinces.find((option) => option.value === field.value) ||
                  null
                }
                onChange={(selectedOption: SingleValue<OptionType>) => {
                  const value = selectedOption ? selectedOption.value : "";
                  setSelectedProvince(value);
                  field.onChange(selectedOption?.value || "");
                }}
                placeholder="Select your province"
              />
            )}
          />
          {errors.province && (
            <p className="text-red-500 text-xs mt-1">
              {errors.province.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <SelectDropdown
                label="District*"
                labelClassName="font-arial"
                options={districts}
                value={
                  districts.find((option) => option.value === field.value) ||
                  null
                }
                onChange={(selectedOption: SingleValue<OptionType>) => {
                  const value = selectedOption ? selectedOption.value : "";
                  setSelectedDistrict(value);
                  field.onChange(selectedOption?.value || "");
                }}
                placeholder="Select your district"
              />
            )}
          />
          {errors.district && (
            <p className="text-red-500 text-xs mt-1">
              {errors.district.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="town"
            control={control}
            render={({ field }) => (
              <SelectDropdown
                label="Area/Town*"
                labelClassName="font-arial"
                options={towns}
                value={
                  towns.find((option) => option.value === field.value) || null
                }
                onChange={(selectedOption: SingleValue<OptionType>) => {
                  field.onChange(selectedOption?.value || "");
                }}
                placeholder="Select your area"
              />
            )}
          />
          {errors.town && (
            <p className="text-red-500 text-xs mt-1">{errors.town.message}</p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="zip"
            control={control}
            render={({ field }) => (
              <TextField
                label="Zip Code*"
                className="custom-textfield w-full"
                inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                groupClassName="border-none"
                placeholder="Your area postal code"
                name="zip"
                id="zip"
                type="text"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.zip && (
            <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>
          )}
        </div>
      </div>

      <div className="w-fit hover:cursor-pointer">
        <div>
          <Checkbox
            onChange={(isSelected: boolean) =>
              setValue("isDefault", isSelected)
            }
          >
            <p className="font-arial">Set as a default shipping address</p>
          </Checkbox>
          {errors.isDefault && (
            <p className="text-red-500 text-xs mt-1">
              {errors.isDefault.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InitialAddressForm;
