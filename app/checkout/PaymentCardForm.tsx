import React from "react";
import Master from "@/public/assets/checkout/card.png";
import Title from "@/components/custom/Title";
import { Button, Checkbox } from "@/components/ui";
import { TextField } from "@/components/ui/text-field";
import SelectDropdown from "@/components/ui/select-dropdown";
import { SingleValue } from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentValidationSchema } from "@/schemas/validationSchemas";
import { months, years } from "@/constants/dropdown-items";
import { CircleX, Info } from "lucide-react";
import * as Yup from "yup";
import Image from "next/image";
import { createCard } from "@/actions/users/card";
import { useUserId } from "@/hooks/useUserId";

interface OptionType {
  value: string;
  label: string;
}

type FormFields = Yup.InferType<typeof paymentValidationSchema>;

interface PaymentCardFormProps {
  onClose: () => void;
}

const PaymentCardForm: React.FC<PaymentCardFormProps> = ({ onClose }) => {
  const userId = useUserId();

  const {
    formState: { errors, isSubmitting },
    control,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(paymentValidationSchema),
    defaultValues: {
      paymentMethod: "Card",
      holderName: "",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      cvv: "",
      rememberCardDetails: true,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Data: ", data);
    let card = {
      paymentMethod: data.paymentMethod,
      holderName: data.holderName,
      cardNumber: data.cardNumber,
      expireMonth: data.expireMonth,
      expireYear: data.expireYear,
      cvv: data.cvv,
      rememberCardDetails: data.rememberCardDetails,
    };
    await createCard(userId, card);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white rounded-[8px] md:w-[655px] w-full"
    >
      <div className="flex flex-col gap-4 max-h-[90vh] lg:max-h-none overflow-y-auto p-4 md:p-6">
        <div>
          <Title title="Add a New Card" className="!text-lg leading-6" />
        </div>
        <div className="absolute top-0 right-0 p-2 z-10">
          <CircleX
            fill="#ffffff"
            color="#252525"
            strokeWidth={2}
            className="cursor-pointer h-5 w-5 hover:opacity-70"
            onClick={onClose}
          />
        </div>
        <div className="gap-y-4 flex flex-col">
          <div className="w-full col-span-3">
            <Controller
              name="holderName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name on Card*"
                  className="custom-textfield"
                  inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
                  groupClassName="border border-[#E1E1E1]"
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
                  label="Card Number*"
                  className="custom-textfield"
                  inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                  groupClassName="border border-[#E1E1E1]"
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
                    options={months}
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      const value = selectedOption ? selectedOption.value : "";
                      setValue("expireMonth", value);
                    }}
                    placeholder="MM"
                    borderColor="#E1E1E1"
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
                    onChange={(selectedOption: SingleValue<OptionType>) => {
                      const value = selectedOption ? selectedOption.value : "";
                      setValue("expireYear", value);
                    }}
                    placeholder="YY"
                    borderColor="#E1E1E1"
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
                    className="custom-textfield w-full"
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                    groupClassName="border border-[#E1E1E1]"
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.cvv.message}
                </p>
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
          <div className="flex gap-3 md:gap-4 mt-4">
            <Button
              className="w-full border !border-gray text-lg"
              size="extra-large"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              className="w-full text-white bg-gray text-lg"
              size="extra-large"
              type="submit"
            >
              {isSubmitting ? "Loading..." : "Save Details"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentCardForm;
