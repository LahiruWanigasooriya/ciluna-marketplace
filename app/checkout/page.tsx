"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/custom/Title";
import { TextField } from "@/components/ui/text-field";
import { Checkbox } from "@/components/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import Gpay from "@/public/assets/checkout/gpay.png";
// import Paypal from "@/public/assets/checkout/paypal.png";
// import Visa from "@/public/assets/checkout/visa.png";
import CILUNApay from "@/public/assets/checkout/cilunapay.png";
// import Master from "@/public/assets/checkout/master.png";
import Stripe from "@/public/assets/checkout/stripe.png";
// import QR from "@/public/assets/checkout/qr.png";
import Country from "@/components/custom/CountryDropdown";
import Visa from "@/public/assets/cart/visa.webp";
// import Pawpay from "@/public/assets/checkout/pawpay.png";
// import Master from "@/public/assets/checkout/master.png";
import Master from "@/public/assets/checkout/card.png";
import { fadeInOut } from "@/utils/animations";
import Tel from "@/components/custom/Phone";
import Summary from "../cart/Summary";
import {
  ArrowLeft,
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
import PaymentCards from "@/components/custom/PaymentCards";
import AddressCards from "@/components/custom/AddressCards";
import useDisableScroll from "@/hooks/useDisableScroll";
import OrderDetails from "./OrderDetails";
import * as Yup from "yup";
import { orderValidationSchema } from "@/schemas/validationSchemas";
import { useCheckoutStore } from "@/store/checkout";
import { useCartStore } from "@/store/cart";
import CilunaCards from "@/components/custom/CilunaCards";
import PaymentCardForm from "./PaymentCardForm";
import ShippingAddressForm from "./ShippingAddressForm";
import { PaymentCardOption, Address } from "@/types/checkout";
import { useAuthStore } from "@/store/authStore";
import { getUserById } from "@/actions/users/user";
import { jwtDecode } from "jwt-decode";
import { createAddress } from "@/actions/users/address";
import { createCard, getCardsByUser } from "@/actions/users/card";
import { getCart } from "@/actions/carts/cart";
import { createOrder } from "@/actions/orders/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OptionType {
  value: string;
  label: string;
}

interface DecodedToken {
  userId: string;
  exp: number;
}

type FormFields = Yup.InferType<typeof orderValidationSchema>;

const CheckoutPage: React.FC = () => {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("Ciluna Wallet");
  const [selectedWallet, setSelectedWallet] = useState<string>("ciluna_cash"); // selected method under ciluna wallet payment method
  const [selectedCard, setSelectedCard] = useState<string>(""); // selected method under card payment method

  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

  // getting the selected address for edit
  const [selectedAddressForEdit, setSelectedAddressForEdit] =
    useState<Address | null>(null);

  const [loading, setLoading] = useState(true);
  const { getToken } = useAuthStore();
  const token = getToken();
  const [userId, setUserId] = useState("");

  const districts =
    provinces.find((p) => p.value === selectedProvince)?.districts || [];
  const towns =
    districts.find((d) => d.value === selectedDistrict)?.towns || [];

  // cards and addresses when previous information is available
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cards, setCards] = useState<PaymentCardOption[]>([]);

  // states for pop up models
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [isAddingNewCard, setIsAddingNewCard] = useState<boolean>(false);

  const { setCart } = useCartStore();
  const { setValues} = useCheckoutStore();

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }
  }, [token]);

  const router = useRouter();

  const handleCloseOrder = () => {
    setCart([]);
    setIsOrderPlaced(false);
    router.push("/");
  }

  const fetchData = useCallback(async () => {
    if (!userId) return;

    console.log("fetch addresses");
    try {
      setLoading(true);
      const res = await getUserById(userId);
      const data = await res.data;
      // console.log("data: ", data);
      setAddresses(data?.user.addresses || []);

      const cardRes = await getCardsByUser(userId);
      setCards(cardRes.cards || []);
      // console.log(cardRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Initial fetch when userId changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const {
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(orderValidationSchema),
    mode: "onBlur",
    defaultValues: {
      country: "",
      contactName: "",
      mobileNumber: "",
      street: "",
      province: "",
      district: "",
      town: "",
      paymentMethod: "Ciluna Wallet",
      holderName: "",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      cvv: "",
      isDefault: false,
      rememberCardDetails: false,
    },
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

  useDisableScroll(isOrderPlaced);
  useDisableScroll(isAddingNewAddress);
  useDisableScroll(isEditingAddress);
  useDisableScroll(isAddingNewCard);

  const handlePaymentSelection = (paymentType: string) => {
    setSelectedPaymentMethod(paymentType);
    setValue("paymentMethod", paymentType);
  };

  console.log("Errors: ", errors);

  const handleAddressSelection = (address: Address) => {
    setValue("country", address.country, { shouldValidate: true });
    setValue("contactName", address.contactName, { shouldValidate: true });
    setValue("mobileNumber", address.mobileNumber, { shouldValidate: true });
    setValue("street", address.street, { shouldValidate: true });
    setValue("province", address.province, { shouldValidate: true });
    setValue("district", address.district, { shouldValidate: true });
    setValue("town", address.town, { shouldValidate: true });
    setValue("zip", address.zip, { shouldValidate: true });
  };

  const handleCardSelection = (card: PaymentCardOption) => {
    setValue("paymentMethod", "Card");
    setValue("holderName", card.holderName);
    setValue("cardNumber", card.cardNumber);
    setValue("expireMonth", card.expireMonth);
    setValue("expireYear", card.expireYear);
    setValue("cvv", card.cvv);
  };

  const handleWalletSelections = (card: OptionType) => {
    setValue("cilunaWallet", card.value);
  };

  useEffect(() => {
    if (selectedCard === "Add a New Card") {
      setIsAddingNewCard(true);
    } else {
      setIsAddingNewCard(false);
    }
  }, [selectedCard]);

  const handleCloseNewCard = () => {
    setSelectedCard("");
    setIsAddingNewCard(false);
    fetchData();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (token) {
      const {
        contactName,
        mobileNumber,
        street,
        province,
        district,
        town,
        country,
        zip,
        isDefault,
        holderName,
        cardNumber,
        expireMonth,
        expireYear,
        cvv,
        paymentMethod,
        rememberCardDetails,
      } = data;
      let address = {
        contactName,
        mobileNumber,
        street,
        province,
        district,
        town,
        country,
        zip,
        isDefault,
      };

      let card = {
        holderName,
        cardNumber,
        expireMonth,
        expireYear,
        cvv,
        rememberCardDetails,
      };

      let shippingAddress = address;
      if (addresses.length === 0) {
        await createAddress(userId, address);
      }

      if (cards.length === 0 && paymentMethod === "Card") {
        await createCard(userId, card);
      }

      let res = await getCart(token);

      let payment = {
        method: selectedPaymentMethod,
      };

      const { items, totalPrice, discount, finalPrice } = res.cart;
      console.log("cart: ", res.cart)

      let payload = {
        userId,
        items,
        totalPrice,
        discount,
        finalPrice,
        payment,
        shippingAddress,
      };

      try {
        await createOrder(payload);
        setValues(data);
        reset();
        setIsOrderPlaced(true);
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      }
    } else {
      console.log(errors);
      toast.error((errors as string) || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 text-white py-8 lg:pb-20 pt-[120px] lg:pt-[132px] px-[16px] md:px-[32px] lg:px-[72px] xl:px-[84px] recommend:px-[96px]">
      <div className="flex flex-col gap-4 text-gray bg-white">
        <Link href="/cart" className="flex gap-3 items-center w-fit">
          <ArrowLeft />
          <Title
            title="Shopping Details"
            className="font-arialBold text-xl lg:text-2xl leading-[32px]"
          />
        </Link>

        {token ? (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[32px] md:gap-[34px] lg:gap-[36px] recommend:gap-[40px] w-full bg-[#FFFFFF]/5 mt-2"
            >
              <div className="flex flex-col gap-[16px] md:gap-[24px] lg:flex-row w-full md:items-start">
                <div className="flex flex-col w-full gap-4 text-gray">
                  {/* shipping addresses */}
                  <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                    <div>
                      <Title
                        title="Shipping Address"
                        className="!text-lg leading-6"
                      />
                    </div>

                    {addresses.length === 0 ? (
                      <>
                        <div>
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <SelectDropdown
                                label="Country*"
                                options={countryOptions}
                                value={
                                  countryOptions.find(
                                    (opt) => opt.value === field.value
                                  ) || null
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
                                  onChange={(phone: string) =>
                                    setValue("mobileNumber", phone)
                                  }
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
                                  onChange={(
                                    selectedOption: SingleValue<OptionType>
                                  ) => {
                                    const value = selectedOption
                                      ? selectedOption.value
                                      : "";
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
                                  options={districts}
                                  value={
                                    districts.find(
                                      (option) => option.value === field.value
                                    ) || null
                                  }
                                  onChange={(
                                    selectedOption: SingleValue<OptionType>
                                  ) => {
                                    const value = selectedOption
                                      ? selectedOption.value
                                      : "";
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
                                  options={towns}
                                  value={
                                    towns.find(
                                      (option) => option.value === field.value
                                    ) || null
                                  }
                                  onChange={(
                                    selectedOption: SingleValue<OptionType>
                                  ) => {
                                    field.onChange(selectedOption?.value || "");
                                  }}
                                  placeholder="Select your area"
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
                                setValue("isDefault", isSelected)
                              }
                            >
                              Set as a default shipping address
                            </Checkbox>
                            {errors.isDefault && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.isDefault.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div>
                          <AddressCards
                            options={addresses}
                            onAddressSelect={handleAddressSelection}
                            setIsAddingNewAddress={setIsAddingNewAddress}
                            setSelectedAddressForEdit={
                              setSelectedAddressForEdit
                            }
                            setIsEditingAddress={setIsEditingAddress}
                            refetch={fetchData}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* payment methods */}
                  <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                    <div>
                      <Title
                        title="Payment Method"
                        className="text-[1rem] lg:!text-lg leading-6"
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
                            onChange={() =>
                              handlePaymentSelection(payment.label)
                            }
                          ></Checkbox>
                        </div>
                      ))}
                    </div>

                    {cards.length === 0 ? (
                      // when there are no stored cards in db
                      <>
                        <AnimatePresence>
                          {selectedPaymentMethod === "Card" && (
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
                                      className="custom-textfield"
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
                                      className="custom-textfield"
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
                                        options={months}
                                        value={
                                          months.find(
                                            (option) =>
                                              option.value === field.value
                                          ) || null
                                        }
                                        onChange={(
                                          selectedOption: SingleValue<OptionType>
                                        ) => {
                                          const value = selectedOption
                                            ? selectedOption.value
                                            : "";
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
                                          years.find(
                                            (option) =>
                                              option.value === field.value
                                          ) || null
                                        }
                                        onChange={(
                                          selectedOption: SingleValue<OptionType>
                                        ) => {
                                          const value = selectedOption
                                            ? selectedOption.value
                                            : "";
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
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <AnimatePresence>
                          {selectedPaymentMethod === "Ciluna Wallet" && (
                            <motion.div
                              {...fadeInOut}
                              className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                            >
                              <CilunaCards
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
                                onCardSelect={handleWalletSelections}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <>
                        {" "}
                        <AnimatePresence>
                          {selectedPaymentMethod === "Card" && (
                            <motion.div
                              {...fadeInOut}
                              className="gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                            >
                              <PaymentCards
                                options={cards}
                                selectedValue={selectedCard}
                                onChange={(val) => setSelectedCard(val)}
                                onCardSelect={handleCardSelection}
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
                              <CilunaCards
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
                                onCardSelect={handleWalletSelections}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full lg:max-w-[400px] lg:gap-4">
                  <Summary
                    text="Place Order"
                    handlePlaceOrder={setIsOrderPlaced}
                    editCart={true}
                  />
                  <div className="flex flex-col p-4 md:p-6 bg-[#F5F5F5] gap-4 text-gray font-arial rounded-[6px]">
                    <div className="flex gap-2 items-center">
                      <h2 className="text-xl leading-6 font-arialBold font-bold">
                        Ciluna
                      </h2>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <p>Ciluna keeps your information and payment safe</p>
                  </div>
                </div>
              </div>
            </form>
            {isAddingNewCard && (
              <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                <PaymentCardForm onClose={handleCloseNewCard} />
              </div>
            )}

            {isAddingNewAddress && (
              <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                <ShippingAddressForm
                  title="Add a Shipping Address"
                  onClose={setIsAddingNewAddress}
                  onSuccess={fetchData}
                />
              </div>
            )}

            {isEditingAddress && (
              <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                <ShippingAddressForm
                  title="Edit Shipping Address"
                  selectedAddressForEdit={selectedAddressForEdit}
                  onClose={setIsEditingAddress}
                  onSuccess={fetchData}
                />
              </div>
            )}
          </div>
        ) : (
          <div>Please login or register to place an order</div>
        )}

        {isOrderPlaced && (
          <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4 overflow-y-auto">
            <OrderDetails
              onCancel={handleCloseOrder}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
