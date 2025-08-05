"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/custom/Title";
import { TextField } from "@/components/ui/text-field";
import { IconButton } from "@/components/custom/IconButton";
import { Checkbox } from "@/components/ui";
import useForm from "@/hooks/useForm";
// import Gpay from "@/public/assets/checkout/gpay.png";
// import Paypal from "@/public/assets/checkout/paypal.png";
import Visa from "@/public/assets/checkout/visa.png";
import CILUNApay from "@/public/assets/checkout/cilunapay.png";
import Master from "@/public/assets/checkout/master.png";
import Stripe from "@/public/assets/checkout/stripe.png";
// import QR from "@/public/assets/checkout/qr.png";
import Country from "@/components/custom/CountryDropdown";
// import Pawpay from "@/public/assets/checkout/pawpay.png";
// import Master from "@/public/assets/checkout/master.png";
import Card from "@/public/assets/checkout/card.png";
import newCard from "@/public/assets/checkout/newCard.png";
// import Stripe from "@/public/assets/checkout/stripe.png";
// import QR from "@/public/assets/checkout/qr.png";
// import Country from "@/components/custom/CountryDropdown";
import { fadeInOut } from "@/utils/animations";
import { Checkout } from "@/types/checkout";
import Tel from "@/components/custom/Phone";
import Summary from "../cart/Summary";
import {
  ArrowLeft,
  CirclePlus,
  CreditCard,
  Info,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import SelectDropdown from "@/components/ui/select-dropdown";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import { SingleValue } from "react-select";
import { provinces, years, months } from "@/constants/dropdown-items";
import RadioGroupField from "@/components/ui/radio-button";
import { useAuthStore } from "@/store/authStore";
import AddressCard from "@/components/custom/AddressCard";
import ShippingAddress from "./ShippingAddress";
import useDisableScroll from "@/hooks/useDisableScroll";
import OrderDetails from "./OrderDetails";

interface OptionType {
  value: string;
  label: string;
}

const options = [
  {
    name: "Hiran Anuraja",
    contactNumber: "+94718789925",
    address:
      "421/2, Shewood glade, Arangala, Colombo, Western Province, Sri Lanka, 91060",
    isDefault: true,
  },
  {
    name: "Sahan Lakshitha",
    contactNumber: "+94778782345",
    address:
      "No 170/2/C, Malapalla Colombo, Western Province, Sri Lanka, 10230",
    isDefault: false,
  },
];

const CheckoutPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("Ciluna Wallet");
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>();
  const [selectedWallet, setSelectedWallet] = useState<string>("ciluna_cash");
  const [selectedCard, setSelectedCard] = useState<string>("423478******7640");
  const [selectedAddress, setSelectedAddress] = useState<string>(
    options.filter((item) => item.isDefault === true)[0].name
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrederPlaced] = useState<boolean>(false);
  // const { token } = useAuthStore();
  const token = "ff";

  const districts =
    provinces.find((p) => p.value === selectedProvince)?.districts || [];
  const towns =
    districts.find((d) => d.value === selectedDistrict)?.towns || [];

  const { values, handleChange, resetForm } = useForm<Checkout>({
    country: "",
    contactName: "",
    mobileNumber: "",
    street: "",
    province: "",
    district: "",
    town: "",
    zip: "",
    holderName: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvv: "",
    rememberShippingAddress: false,
    rememberCardDetails: false,
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

  useDisableScroll(isAddingNewAddress);
  useDisableScroll(isEditingAddress);
  useDisableScroll(isOrderPlaced);

  const handlePaymentSelection = (paymentType: string) => {
    setSelectedPaymentMethod(paymentType);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // const summaryCard =
  //   "font-[400] text-sm leading-[23px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] recommend:leading-[32px]";

  return (
    <div className="flex flex-col gap-3 text-white">
      <div className="flex flex-col gap-3 items-center md:items-start">
        <Title title="Checkout" />
        <p className="font-[400] text-sm text-center md:text-start">
          Complete your purchase with ease. Our checkout process is designed to
          be simple and secure, ensuring your information is protected. At
          CILUNA POS, we prioritize your satisfaction, making your shopping
          experience seamless from start to finish. If you need any assistance,
          our team is here to help with payment options, order review, and
          delivery details.
        </p>
      </div>
    <div className="flex flex-col gap-4 text-gray bg-white">
      <Link href="/cart" className="flex gap-3 items-center w-fit">
        <ArrowLeft />
        <Title
          title="Shopping Details"
          className="font-lora text-2xl leading-[32px]"
        />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[32px] md:gap-[34px] lg:gap-[36px] recommend:gap-[40px] w-full bg-[#FFFFFF]/5 mt-2"
      >
        <div className="flex flex-col gap-[16px] md:gap-[24px] lg:flex-row w-full md:items-start">
          {token ? (
            <div className="flex flex-col w-full gap-4 text-gray">
              <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                <div>
                  <Title
                    title="Shipping Address"
                    className="!text-lg leading-6"
                  />
                </div>

                <div>
                  <AddressCard
                    options={options}
                    selectedValue={selectedAddress}
                    onChange={(val) => setSelectedAddress(val)}
                    handleChange={handleChange}
                    onEdit={setIsEditingAddress}
                  />
                </div>

                <hr className="border-t-2 border-[#E1E1E1]" />

                <div
                  className="flex gap-2 group items-center"
                  onClick={() => setIsAddingNewAddress(true)}
                >
                  <CirclePlus className="group-hover:opacity-70 group-hover:cursor-pointer" />
                  <h2 className="group-hover:underline group-hover:cursor-pointer">
                    Add a New Address
                  </h2>
                </div>

                {isAddingNewAddress && (
                  <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                    <ShippingAddress
                      title="Add a Shipping Address"
                      values={values}
                      handleChange={handleChange}
                      onCancel={setIsAddingNewAddress}
                    />
                  </div>
                )}

                {isEditingAddress && (
                  <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                    <ShippingAddress
                      title="Edit Shipping Address"
                      values={values}
                      handleChange={handleChange}
                      onCancel={setIsEditingAddress}
                    />
                  </div>
                )}
              </div>

              {/* payment */}
              <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                <div>
                  <Title
                    title="Payment Method"
                    className="!text-lg leading-6"
                  />
                </div>

                <hr className="border-t border-[#E1E1E1]" />

                <div className="flex flex-col md:flex-row gap-4">
                  {[
                    { icon: <CreditCard />, label: "Card" },
                    { icon: <WalletCards />, label: "Ciluna Wallet" },
                  ].map((payment, index) => (
                    <div
                      key={index}
                      className="flex justify-between pl-3 pr-1 w-full bg-white h-[44px] items-center rounded-[8px]"
                    >
                      <div className="flex gap-2">
                        {payment.icon} <p>{payment.label}</p>
                      </div>
                      <Checkbox
                        isSelected={selectedPaymentMethod === payment.label}
                        onChange={() => handlePaymentSelection(payment.label)}
                      ></Checkbox>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedPaymentMethod === "Card" && (
                    <motion.div
                      {...fadeInOut}
                      className="gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                    >
                      <RadioGroupField
                        options={[
                          {
                            label: "423478******7640",
                            value: "423478******7640",
                            prefixImage: (
                              <div className="w-[40px] h-[24px] relative">
                                <Image
                                  alt="option"
                                  src={Card.src}
                                  fill
                                  className="object-cover rounded-[4px]"
                                  placeholder="blur"
                                  blurDataURL="/placeholder-image.jpg"
                                />
                              </div>
                            ),
                          },
                          {
                            label: "121471******2020",
                            value: "121471******2020",
                            prefixImage: (
                              <div className="w-[40px] h-[24px] relative">
                                <Image
                                  alt="option"
                                  src={Visa.src}
                                  fill
                                  className="object-cover rounded-[4px]"
                                  placeholder="blur"
                                  blurDataURL="/placeholder-image.jpg"
                                />
                              </div>
                            ),
                          },
                          {
                            label: "Add a New Card",
                            value: "new_card",
                            prefixImage: (
                              <div className="w-[40px] h-[24px] relative">
                                <Image
                                  alt="option"
                                  src={newCard.src}
                                  fill
                                  className="object-cover rounded-[4px]"
                                  placeholder="blur"
                                  blurDataURL="/placeholder-image.jpg"
                                />
                              </div>
                            ),
                          },
                        ]}
                        selectedValue={selectedCard}
                        onChange={(val) => setSelectedCard(val)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {selectedPaymentMethod === "Ciluna Wallet" && (
                    <motion.div
                      {...fadeInOut}
                      className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                    >
                      <RadioGroupField
                        options={[
                          {
                            label: "CILUNA Cash",
                            value: "ciluna_cash",
                            description: "20,000 LKR",
                          },
                          {
                            label: "USD Value",
                            value: "usd_value",
                            description: "5,000 USD",
                          },
                        ]}
                        selectedValue={selectedWallet}
                        onChange={(val) => setSelectedWallet(val)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-4 text-gray">
              <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                <div>
                  <Title
                    title="Shipping Address"
                    className="!text-lg leading-6"
                  />
                </div>

                <hr className="border-t border-[#E1E1E1]" />

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
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                    placeholder="Enter contact name"
                    name="contactName"
                    id="contactName"
                    type="text"
                    value={values.contactName}
                    onChange={(value: string) =>
                      handleChange("contactName", value)
                    }
                  />

                  <Tel
                    value={values.mobileNumber}
                    onChange={(phone: string) =>
                      handleChange("mobileNumber", phone)
                    }
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <TextField
                    label="Street name and number"
                    className="custom-textfield w-full"
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
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
                      provinces.find(
                        (option) => option.value === values.province
                      ) || null
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
                      districts.find(
                        (option) => option.value === values.district
                      ) || null
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
                      towns.find((option) => option.value === values.town) ||
                      null
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
                    inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
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

              {/* payment method */}
              <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                <div>
                  <Title
                    title="Payment Method"
                    className="!text-lg leading-6"
                  />
                </div>

                <hr className="border-t border-[#E1E1E1]" />

                <div className="flex flex-col md:flex-row gap-4">
                  {[
                    { icon: <CreditCard />, label: "Card" },
                    { icon: <WalletCards />, label: "Ciluna Wallet" },
                  ].map((payment, index) => (
                    <div
                      key={index}
                      className="flex justify-between pl-3 pr-1 w-full bg-white h-[44px] items-center rounded-[8px]"
                    >
                      <div className="flex gap-2">
                        {payment.icon} <p>{payment.label}</p>
                      </div>
                      <Checkbox
                        isSelected={selectedPaymentMethod === payment.label}
                        onChange={() => handlePaymentSelection(payment.label)}
                      ></Checkbox>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedPaymentMethod === "Card" && (
                    <motion.div
                      {...fadeInOut}
                      className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                    >
                      <TextField
                        label="Name on Card*"
                        className="custom-textfield col-span-3"
                        inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                        placeholder="Enter name on the card"
                        name="holderName"
                        id="holderName"
                        type="text"
                        value={values.holderName}
                        onChange={(value: string) =>
                          handleChange("holderName", value)
                        }
                      />
                      <TextField
                        label="Card Number"
                        className="custom-textfield col-span-3"
                        inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                        placeholder="Card Number"
                        name="cardNumber"
                        id="cardNumber"
                        type="number"
                        value={values.cardNumber}
                        onChange={(value: string) =>
                          handleChange("cardNumber", value)
                        }
                        prefix={
                          <div className=" bg-white p-[10px] rounded-l-[8px]">
                            <div className="w-[40px] h-[24px] relative">
                              <Image
                                alt="option"
                                src={Card.src}
                                fill
                                className="object-cover"
                                placeholder="blur"
                                blurDataURL="/placeholder-image.jpg"
                              />
                            </div>
                          </div>
                        }
                      />
                      <div className="flex gap-2 md:gap-4 col-span-3 items-end">
                        <SelectDropdown
                          label="Expiry*"
                          options={months}
                          value={
                            months.find(
                              (option) => option.value === values.expireMonth
                            ) || null
                          }
                          onChange={(
                            selectedOption: SingleValue<OptionType>
                          ) => {
                            const value = selectedOption
                              ? selectedOption.value
                              : "";
                            handleChange("expireMonth", value);
                          }}
                          placeholder="MM"
                        />
                        <SelectDropdown
                          options={years}
                          value={
                            years.find(
                              (option) => option.value === values.expireYear
                            ) || null
                          }
                          onChange={(
                            selectedOption: SingleValue<OptionType>
                          ) => {
                            const value = selectedOption
                              ? selectedOption.value
                              : "";
                            handleChange("expireYear", value);
                          }}
                          placeholder="YY"
                        />
                        <TextField
                          label="CVV*"
                          className="custom-textfield w-full"
                          inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray"
                          name="cvv"
                          id="cvv"
                          type="number"
                          value={values.cvv}
                          onChange={(value: string) =>
                            handleChange("cvv", value)
                          }
                          suffix={
                            <div className="bg-white p-[13px] rounded-r-[8px]">
                              <Info className=" w-[18px] h-[18px]" />
                            </div>
                          }
                        />
                      </div>
                      <div className="w-fit hover:cursor-pointer">
                        <Checkbox
                          isSelected={values.rememberCardDetails}
                          onChange={(isSelected: boolean) =>
                            handleChange("rememberCardDetails", isSelected)
                          }
                        >
                          Save card details
                        </Checkbox>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {selectedPaymentMethod === "Ciluna Wallet" && (
                    <motion.div
                      {...fadeInOut}
                      className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                    >
                      <RadioGroupField
                        options={[
                          {
                            label: "CILUNA Cash",
                            value: "ciluna_cash",
                            description: "20,000 LKR",
                          },
                          {
                            label: "USD Value",
                            value: "usd_value",
                            description: "5,000 USD",
                          },
                        ]}
                        selectedValue={selectedWallet}
                        onChange={(val) => setSelectedWallet(val)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          <div className="flex flex-col w-full lg:max-w-[400px] lg:gap-4">
            <Summary
              text="Place Order"
              handlePlaceOrder={setIsOrederPlaced}
            />
            <div className="flex flex-col p-6 bg-[#F5F5F5] gap-4 text-gray rounded-[6px]">
              <div className="flex gap-2 items-center">
                <h2 className="text-xl leading-6 font-bold">Ciluna</h2>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p>Ciluna keeps your information and payment safe</p>
            </div>
          </div>
        </div>

        {isOrderPlaced && (
          <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4 overflow-y-auto">
            <OrderDetails
              rewardPoints="10"
              paymentMethod="Card"
              total="$108.99"
              tax="$10.99"
              discount="-458.00"
              shipping="$5"
              estimatedTotal="$116.99"
              address="421/2, Shewood glade, Arangala, Colombo, Western Province, Sri Lanka, 91060"
              name="Hiran Anuraja"
              contactNumber="+94718789925"
              paymentDetails="4234781234567640"
              onCancel={setIsOrederPlaced}
            />
          </div>
        )}

        {/* Form Actions */}
        {/* <div className="flex flex-col md:flex-row justify-end items-center gap-3 md:gap-4 w-full ">
          <IconButton
            name="Complete Purchase"
            process="Processing..."
            success="Purchased!"
            className="w-full lg:w-[230px] font-interSemiBold bg-purple"
          />
          <button
            type="button"
            className=" w-full bg-transparent text-sm lg:w-[230px] h-10 hover:bg-[#FFFFFF]/5 border border-solid rounded-[10px] border-[#455EB5]"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div> */}
      </form>
    </div>
    </div>
  );
};

export default CheckoutPage;
