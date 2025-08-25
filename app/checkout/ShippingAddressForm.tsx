import Title from "@/components/custom/Title";
import SelectDropdown from "@/components/ui/select-dropdown";
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
import { shippingValidationSchema } from "@/schemas/validationSchemas";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address } from "@/types/checkout";

interface OptionType {
  value: string;
  label: string;
}

type FormFields = Yup.InferType<typeof shippingValidationSchema>;

interface ShippingAddressProps {
  title: string;
  selectedAddressForEdit?: Address | null;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShippingAddressForm: React.FC<ShippingAddressProps> = ({
  title,
  selectedAddressForEdit,
  onClose,
}) => {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    selectedAddressForEdit?.province || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    selectedAddressForEdit?.district || ""
  );
  const districts =
    provinces.find((p) => p.value === selectedProvince)?.districts || [];
  const towns =
    districts.find((d) => d.value === selectedDistrict)?.towns || [];

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(shippingValidationSchema),
    mode: "onBlur",
    defaultValues: selectedAddressForEdit ?? {defaultShippingAddress: false},
  });

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
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (selectedAddressForEdit) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate the request to update the address
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate the request to create a new address
    }
    console.log(errors);
    console.log("Data to submit: ", data);
    onClose(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white rounded-[8px] md:w-[655px] w-full"
    >
      <div className="flex flex-col gap-4 max-h-[90vh] lg:max-h-none overflow-y-auto p-4 md:p-6">
        <Title title={title} />

        <div className="absolute top-0 right-0 p-2 z-10">
          <CircleX
            fill="#ffffff"
            color="#252525"
            strokeWidth={2}
            className="cursor-pointer h-5 w-5 hover:opacity-70"
            onClick={() => onClose(false)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectDropdown
                  label="Country*"
                  options={countryOptions}
                  value={
                    countryOptions.find((opt) => opt.value === field.value) ||
                    null
                  }
                  onChange={(selected: SingleValue<OptionType>) =>
                    field.onChange(selected?.value || "")
                  }
                  formatOptionLabel={formatOptionLabel}
                  placeholder="Enter country name"
                  showFlags={true}
                  borderColor="#E1E1E1"
                />
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </p>
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
                    className="custom-textfield w-full"
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
                    groupClassName="border border-[#E1E1E1]"
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
                    onChange={(phone: string) =>
                      setValue("mobileNumber", phone)
                    }
                    className="border border-[#E1E1E1]"
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
                    label="Street name and number"
                    className="custom-textfield w-full"
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
                    groupClassName="border border-[#E1E1E1]"
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <SelectDropdown
                    label="Province*"
                    options={provinces}
                    value={
                      provinces.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      const value = selectedOption ? selectedOption.value : "";
                      setSelectedProvince(value);
                      field.onChange(selectedOption?.value || "");
                    }}
                    placeholder="Select your province"
                    borderColor="#E1E1E1"
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
                    options={districts}
                    value={
                      districts.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      const value = selectedOption ? selectedOption.value : "";
                      setSelectedDistrict(value);
                      field.onChange(selectedOption?.value || "");
                    }}
                    placeholder="Select your district"
                    borderColor="#E1E1E1"
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
                    options={towns}
                    value={
                      towns.find((option) => option.value === field.value) ||
                      null
                    }
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      field.onChange(selectedOption?.value || "");
                    }}
                    placeholder="Select your area"
                    borderColor="#E1E1E1"
                  />
                )}
              />
              {errors.town && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.town.message}
                </p>
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
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
                    groupClassName="border border-[#E1E1E1]"
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.zip.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-fit hover:cursor-pointer">
            <div>
              <Checkbox
                onChange={(isSelected: boolean) =>
                  setValue("defaultShippingAddress", isSelected)
                }
              >
                Set as a default shipping address
              </Checkbox>
              {errors.defaultShippingAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.defaultShippingAddress.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4 mt-4">
          <Button
            className="w-full border !border-gray text-lg"
            size="extra-large"
            onPress={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-full text-white bg-gray text-lg"
            size="extra-large"
            type="submit"
          >
            {isSubmitting
              ? "Loading..."
              : selectedAddressForEdit
              ? "Update Details"
              : "Save Details"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ShippingAddressForm;
