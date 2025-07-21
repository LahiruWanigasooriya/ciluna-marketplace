"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/custom/Title";
import { TextField } from "@/components/ui/text-field";
import { IconButton } from "@/components/custom/IconButton";
import { DatePicker } from "@/components/ui";
import useForm from "@/hooks/useForm";
import Gpay from "@/public/assets/checkout/gpay.png";
import Paypal from "@/public/assets/checkout/paypal.png";
import Visa from "@/public/assets/checkout/visa.png";
import Pawpay from "@/public/assets/checkout/pawpay.png";
import Master from "@/public/assets/checkout/master.png";
import Stripe from "@/public/assets/checkout/stripe.png";
import QR from "@/public/assets/checkout/qr.png";
import Country from "@/components/custom/CountryDropdown";
import { fadeInOut } from "@/utils/animations";
import { Checkout } from "@/types/checkout";
import Tel from "@/components/custom/Phone";


const CheckoutPage: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const { values, handleChange, resetForm } = useForm<Checkout>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    holderName: "",
    cardNumber: "",
    csv: "",
  });

  const handlePaymentSelection = (paymentType: string) => {
    setSelectedPaymentMethod(paymentType);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const summaryCard =
    "font-[400] text-sm leading-[23px] md:leading-[26px] lg:leading-[28px] xl:leading-[30px] recommend:leading-[32px]";

  return (
    <div className="flex flex-col gap-3 text-white">
      <div className="flex flex-col gap-3 items-center md:items-start">
        <Title title="Checkout" />
        <p className="font-[400] text-sm text-center md:text-start">
          Complete your purchase with ease. Our checkout process is designed to
          be simple and secure, ensuring your information is protected. At PAW
          POS, we prioritize your satisfaction, making your shopping experience
          seamless from start to finish. If you need any assistance, our team is
          here to help with payment options, order review, and delivery details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-[9px] p-[12px] md:p-[14px] lg:p-[16px] recommend:p-[20px] border-t border-l border-solid border-[#6B709499] gap-[32px] md:gap-[34px] lg:gap-[36px] recommend:gap-[40px] w-full bg-[#FFFFFF]/5 mt-4 "
      >
        <div className="flex flex-col-reverse gap-[32px] md:gap-[24px] lg:gap-[26px] recommend:gap-[32px] md:flex-row w-full md:items-start">
          <div className="flex flex-col gap-y-[14px] w-full">
            <TextField
              label="First Name"
              className="custom-textfield w-full"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              type="text"
              value={values.firstName}
              onChange={(value: string) => handleChange("firstName", value)}
            />
            <TextField
              label="Last Name"
              className="custom-textfield"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              type="text"
              value={values.lastName}
              onChange={(value: string) => handleChange("lastName", value)}
            />
            <TextField
              label="Email Address"
              className="custom-textfield"
              placeholder="Email"
              name="email"
              id="email"
              type="email"
              value={values.email}
              onChange={(value: string) => handleChange("email", value)}
            />
            <Tel
              value={values.phone}
              onChange={(phone: string) => handleChange("phone", phone)}
            />
          </div>
          <div className=" recommend:min-w-[585px] bg-[#FFFFFF]/5 border-[#6B709499] rounded-[10px] md:rounded-[14px] border-t-2 border-l-2 flex flex-col py-8 xl:py-4 px-6 gap-4 w-full p-[30px] md:p-[14px] lg:p-[36px] recommend:p-[39px]">
            <div className="flex flex-col gap-[22px] md:gap-[20px] recommend:gap-[18px]">
              <Title
                title="Order Summary"
                className="text-base xl:text-lg recommend:text-xl"
              />

              <div className="flex flex-col gap-[11px] md:gap-[12px] recommend:gap-[14px]">
                <div className="flex items-center justify-between gap-2">
                  <p className={summaryCard}>
                    Logitech MX Master 3 Wir... Price
                  </p>
                  <div className="flex flex-col items-end ">
                    <p className={summaryCard}>40 PAW</p>
                    <p className="font-[400] text-xxs">($0.00)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className={summaryCard}>Discount</p>
                  <div className="flex flex-col items-end">
                    <p className={summaryCard}>100.00 PAW</p>
                    <p className="font-[400] text-xxs">($0.00)</p>
                  </div>
                </div>
                <hr className="border-t border-[#4A55E2]" />

                <div className="flex items-center justify-between">
                  <p className={summaryCard}>Shipping Fee</p>
                  <div className="flex flex-col items-end">
                    <p className={summaryCard}>0 PAW</p>
                    <p className="font-[400] text-xxs">($0.00)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className={summaryCard}>Total</p>
                  <div className="flex flex-col items-end">
                    <p className={summaryCard}>300.00 PAW</p>
                    <p className="font-[400] text-xxs">($0.00)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
          <div className="flex flex-col gap-6 w-full items-start">
            <div className="flex flex-col gap-y-[18px] items-start">
              <Title title="Payment Details" className="text-lg"  />
              <div className="flex items-center gap-2">
                {[
                  { src: Visa, name: "Visa" },
                  { src: Stripe, name: "Stripe" },
                  { src: Paypal, name: "PayPal" },
                  { src: Master, name: "MasterCard" },
                  { src: Gpay, name: "Gpay" },
                  { src: Pawpay, name: "Pawpay" },
                ].map((payment) => (
                  <Image
                    key={payment.name}
                    src={payment.src}
                    alt={payment.name}
                    width={46}
                    height={32}
                    className="cursor-pointer hover:opacity-75"
                    onClick={() => handlePaymentSelection(payment.name)}
                  />
                ))}
              </div>
            </div>
            <AnimatePresence>
              {(selectedPaymentMethod === "Visa" ||
                selectedPaymentMethod === "MasterCard") && (
                <motion.div
                  {...fadeInOut}
                  className="grid grid-cols-1 md:grid-cols-2 gap-y-[14px] w-full gap-x-[32px] md:gap-x-[24px] lg:gap-x-[26px] recommend:gap-x-[30px]"
                >
                  <TextField
                    label="Card holder Name"
                    className="custom-textfield"
                    placeholder="Card holder Name"
                    name="holderName"
                    id="holderName"
                    type="text"
                    value={values.holderName}
                    onChange={(value: string) =>
                      handleChange("holderName", value)
                    }
                  />
                  <TextField
                    label="Card number"
                    className="custom-textfield"
                    placeholder="Card number"
                    name="cardNumber"
                    id="cardNumber"
                    type="number"
                    value={values.cardNumber}
                    onChange={(value: string) =>
                      handleChange("cardNumber", value)
                    }
                  />
                  <DatePicker label="Expiration Date" className="text-white" />
                  <TextField
                    label="CSV"
                    className="custom-textfield"
                    placeholder="CSV"
                    name="cvv"
                    id="cvv"
                    type="number"
                    value={values.csv}
                    onChange={(value: string) => handleChange("csv", value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {selectedPaymentMethod === "Pawpay" && (
                <motion.div
                  {...fadeInOut}
                  className="flex flex-col text-xs md:text-sm items-center md:items-start"
                >
                  <p className="font-[500]">Wallet Address:</p>
                  <p className="font-[600]">
                    pawx90vcICw1igsdfgdsftsdfbvgfggfdsgewvilywlab22
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {selectedPaymentMethod === "Pawpay" && (
              <motion.div
                {...fadeInOut}
                className="flex md:w-full items-center md:items-start"
              >
                <Image alt="qr" src={QR} className="w-[273px] h-[273px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-y-[18px] w-full">
          <Title title="Shipping Address" className="text-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[32px] md:gap-x-[24px] lg:gap-x-[26px] recommend:gap-x-[30px] gap-y-[14px]">
            <TextField
              label="Address line 1"
              className="custom-textfield"
              placeholder="Address line 1"
              name="address1"
              id="address1"
              type="text"
              value={values.address1}
              onChange={(value: string) => handleChange("address1", value)}
            />
            <TextField
              label="Address line 2"
              className="custom-textfield"
              placeholder="Address line 2"
              name="address2"
              id="address2"
              type="text"
              value={values.address2}
              onChange={(value: string) => handleChange("address2", value)}
            />
                   </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
            <TextField
              label="City"
              className="custom-textfield"
              placeholder="City"
              name="city"
              id="city"
              type="text"
              value={values.city}
              onChange={(value: string) => handleChange("city", value)}
            />
            <TextField
              label="State / Province"
              className="custom-textfield"
              placeholder="State / Province"
              name="state"
              id="state"
              type="text"
              value={values.state}
              onChange={(value: string) => handleChange("state", value)}
            />
            <Country
              value={values.country}
              onChange={(field, value) =>
                handleChange(field as keyof Checkout, value)
              }
            />
            <TextField
              label="Postal code"
              className="custom-textfield"
              placeholder="Zip Code"
              name="zip"
              id="zip"
              type="number"
              value={values.zip}
              onChange={(value: string) => handleChange("zip", value)}
            />
            </div>
        
   
        </div>

        {/* Form Actions */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-3 md:gap-4 w-full ">
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
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
