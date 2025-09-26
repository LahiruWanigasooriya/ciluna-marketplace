import { OrderFormFields } from "@/types/checkout";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { SingleValue } from "react-select";
import { TextField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui";
import Image from "next/image";
import Master from "@/public/assets/checkout/card.png";
import SelectDropdown from "@/components/ui/select-dropdown";
import { months, years } from "@/constants/dropdown-items";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInOut } from "@/utils/animations";

interface OptionType {
  value: string;
  label: string;
}

interface InitialCardFormProps {
  control: Control<OrderFormFields>;
  errors: FieldErrors<OrderFormFields>;
  setValue: UseFormSetValue<OrderFormFields>;
}

const InitialCardForm: React.FC<InitialCardFormProps> = ({
  control,
  errors,
  setValue,
}) => {
  return (
    <motion.div
      {...fadeInOut}
      className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
    >
      <div className="w-full col-span-3">
        <Controller
          name="holderName"
          control={control}
          render={({ field }) => (
            <TextField
              label="Name on Card*"
              className="custom-textfield font-arial"
              inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
              groupClassName="border-none"
              placeholder="Enter name on the card"
              name="holderName"
              id="holderName"
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.holderName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.holderName.message}
          </p>
        )}
      </div>
      <div className="w-full col-span-3">
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <TextField
              label="Card Number"
              className="custom-textfield font-arial"
              inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
              groupClassName="border-none"
              placeholder="Card Number"
              name="cardNumber"
              id="cardNumber"
              type="number"
              value={field.value}
              onChange={field.onChange}
              prefix={
                <div className=" bg-white p-[10px] rounded-l-[8px]">
                  <div className="w-[40px] h-[24px] relative">
                    <Image
                      alt="option"
                      src={Master.src}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="/placeholder-image.jpg"
                    />
                  </div>
                </div>
              }
            />
          )}
        />

        {errors.cardNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.cardNumber.message}
          </p>
        )}
      </div>
      <div className="flex gap-2 md:gap-4 col-span-3 items-end">
        <div className="w-full">
          <Controller
            name="expireMonth"
            control={control}
            render={({ field }) => (
              <SelectDropdown
                label="Expiry*"
                labelClassName="font-arial"
                options={months}
                value={
                  months.find((option) => option.value === field.value) || null
                }
                onChange={(selectedOption: SingleValue<OptionType>) => {
                  const value = selectedOption ? selectedOption.value : "";
                  setValue("expireMonth", value);
                }}
                placeholder="MM"
              />
            )}
          />

          {errors.expireMonth && (
            <p className="text-red-500 text-xs mt-1">
              {errors.expireMonth.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="expireYear"
            control={control}
            render={({ field }) => (
              <SelectDropdown
                options={years}
                value={
                  years.find((option) => option.value === field.value) || null
                }
                onChange={(selectedOption: SingleValue<OptionType>) => {
                  const value = selectedOption ? selectedOption.value : "";
                  setValue("expireYear", value);
                }}
                placeholder="YY"
              />
            )}
          />

          {errors.expireYear && (
            <p className="text-red-500 text-xs mt-1">
              {errors.expireYear.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Controller
            name="cvv"
            control={control}
            render={({ field }) => (
              <TextField
                label="CVV*"
                labelClassName="font-arial"
                className="custom-textfield w-full"
                inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                groupClassName="border-none"
                name="cvv"
                id="cvv"
                type="number"
                value={field.value}
                onChange={field.onChange}
                suffix={
                  <div className="bg-white p-[13px] rounded-r-[8px]">
                    <Info className=" w-[18px] h-[18px]" />
                  </div>
                }
              />
            )}
          />

          {errors.cvv && (
            <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
          )}
        </div>
      </div>
      <div className="w-fit hover:cursor-pointer">
        <Checkbox
          onChange={(isSelected: boolean) =>
            setValue("rememberCardDetails", isSelected)
          }
        >
          Save card details
        </Checkbox>
        {errors.rememberCardDetails && (
          <p className="text-red-500 text-xs mt-1">
            {errors.rememberCardDetails.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default InitialCardForm;
