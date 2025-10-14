"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/custom/Title";
import { Checkbox } from "@/components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fadeInOut } from "@/utils/animations";
import Summary from "../cart/Summary";
import { ArrowLeft, CreditCard, ShieldCheck, WalletCards } from "lucide-react";
import Link from "next/link";
import countryList from "react-select-country-list";
import PaymentCards from "@/components/custom/PaymentCards";
import AddressCards from "@/components/custom/AddressCards";
import useDisableScroll from "@/hooks/useDisableScroll";
import OrderDetails from "./OrderDetails";
import { orderValidationSchema } from "@/schemas/validationSchemas";
import { useCheckoutStore } from "@/store/checkout";
import { useCartStore } from "@/store/cart";
import CilunaCards from "@/components/custom/CilunaCards";
import PaymentCardForm from "./PaymentCardForm";
import ShippingAddressForm from "./ShippingAddressForm";
import {
  PaymentCardOption,
  Address,
  OrderFormFields,
  Checkout,
} from "@/types/checkout";
import { useAuthStore } from "@/store/authStore";
import { getUserById } from "@/actions/users/user";
import { createAddress } from "@/actions/users/address";
import { createCard, getCardsByUser } from "@/actions/users/card";
import { addMultipleToCart, getCart } from "@/actions/carts/cart";
import { createOrder } from "@/actions/orders/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserId } from "@/hooks/useUserId";
import InitialAddressForm from "./InitialAddressForm";
import InitialCardForm from "./InitialCardForm";
import {
  payWithSavedCard,
} from "@/actions/utils/payment/stripePayment";
import StripeProvider from "@/components/custom/payments/StripeProvider";
import { getDiscountedPrice } from "@/utils/getDiscountPrice";
import { useExchangeRate } from "@/hooks/useExchangeRate";

interface OptionType {
  value: string;
  label: string;
}

const cilunaOptions = [
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
];

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("Ciluna Wallet");
  const [selectedWallet, setSelectedWallet] = useState<string>("ciluna_cash");
  const [selectedCard, setSelectedCard] = useState<string>("");

  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

  // getting the selected address for edit
  const [selectedAddressForEdit, setSelectedAddressForEdit] =
    useState<Address | null>(null);

  const { getToken } = useAuthStore();
  const token = getToken();
  const userId = useUserId();

  const { cart: localCart } = useCartStore();

  // cards and addresses when previous information is available
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cards, setCards] = useState<PaymentCardOption[]>([]);

  // states for pop up models
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);
  const [isAddingNewCard, setIsAddingNewCard] = useState<boolean>(false);

  const cardRef = useRef<any>(null);
  const { rate } = useExchangeRate();

  const { setCart } = useCartStore();
  const { setValues, setDraftFormData, clearDraftFormData, restoreDraftData } =
    useCheckoutStore();

  const calculateTotals = (items: any[]) => {
    const totalPrice = items.reduce(
      (acc, item) =>
        acc +
        getDiscountedPrice(item.price / rate, item.discount) * item.quantity,
      0
    );
    const discount = totalPrice * 0.1; // 10% discount as per your logic
    const finalPrice = totalPrice - discount;

    return { totalPrice, discount, finalPrice };
  };

  const { finalPrice } = useMemo(() => calculateTotals(localCart), [localCart]);

  const router = useRouter();

  const handleCloseOrder = () => {
    setCart([]);
    setIsOrderPlaced(false);
    router.push("/");
  };

  const fetchData = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await getUserById(userId);
      const data = await res.data;
      setAddresses(data?.user.addresses || []);

      const cardRes = await getCardsByUser(userId);
      setCards(cardRes.cards || []);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

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
    watch,
  } = useForm<OrderFormFields>({
    resolver: yupResolver(orderValidationSchema) as any,
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
      isDefault: false,
      rememberCardDetails: false,
      cilunaWallet: "",
    },
  });

  useEffect(() => {
    if (!token) {
      const subscription = watch((formData) => {
        setDraftFormData(formData as Partial<Checkout>);
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, setDraftFormData, token]);

  // Restore draft data when component mounts or when user logs in
  useEffect(() => {
    const savedDraft = restoreDraftData();
    if (savedDraft && token) {
      // User just logged in, restore their form data
      Object.entries(savedDraft).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          setValue(key as keyof OrderFormFields, value, {
            shouldValidate: false,
          });
        }
      });

      // Restore selected states if they exist
      if (savedDraft.paymentMethod) {
        setSelectedPaymentMethod(savedDraft.paymentMethod);
      }
    }
  }, [token, restoreDraftData, setValue]);

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
    setValue("holderName", card.cardHolderName);
    // setValue("cardNumber", card.cardNumber);
    // setValue("expireMonth", card.expireMonth);
    // setValue("expireYear", card.expireYear);
    // setValue("cvv", card.cvv);
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

  const onSubmit: SubmitHandler<OrderFormFields> = async (data) => {
    if (!token) {
      toast.error("You must be logged in to place an order");
      return;
    }

    if (cards.length === 0) {
      const result = await cardRef.current.submitPayment();

      if (result.error) {
        toast.error(`Stripe error: ${result.error.message}`);
        return;
      }
    } else {
      const selectedCardObj = cards.find(
        (card) => card.stripeCustomerId === selectedCard
      );
      if (selectedCardObj) {
        const result = await payWithSavedCard(
          selectedCardObj.stripeCustomerId,
          selectedCardObj.paymentMethodId,
          finalPrice
        );
        console.log("result: ", result);
      }
    }

    const address = {
      contactName: data.contactName,
      mobileNumber: data.mobileNumber,
      street: data.street,
      province: data.province,
      district: data.district,
      town: data.town,
      country: data.country,
      zip: data.zip,
      isDefault: data.isDefault,
    };

    // const card = {
    //   holderName: data.holderName,
    //   cardNumber: data.cardNumber,
    //   expireMonth: data.expireMonth,
    //   expireYear: data.expireYear,
    //   cvv: data.cvv,
    //   rememberCardDetails: data.rememberCardDetails,
    // };

    if (addresses.length === 0) {
      await createAddress(userId, address);
    }

    // if (cards.length === 0 && data.paymentMethod === "Card") {
    //   await createCard(userId, card);
    // }

    try {
      const cartResponse = await getCart(token);

      if (cartResponse.cart === null) {
        if (localCart && localCart.length > 0) {
          const cartItems = localCart.map((item: any) => ({
            productId: item.productId._id,
            productVariantId: item.productVariantId || null,
            quantity: item.quantity,
            color: item.color || null,
            size: item.size || null,
          }));

          await addMultipleToCart(cartItems, token);
        }
      }

      const { cart } = await getCart(token);

      const payload = {
        userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        discount: cart.discount,
        finalPrice: cart.finalPrice,
        payment: { method: data.paymentMethod },
        shippingAddress: address,
      };

      await createOrder(payload);
      setValues(data); // set values in checkout store in order to display in order success page
      clearDraftFormData();
      reset();
      setIsOrderPlaced(true);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-3 text-white py-8 lg:pb-20 pt-[120px] lg:pt-[132px] px-[16px] md:px-[32px] lg:px-[72px] xl:px-[84px] recommend:px-[96px]">
      <div className="flex flex-col gap-4 text-gray bg-white">
        <Link href="/cart" className="flex gap-3 items-center w-fit">
          <ArrowLeft />
          <Title
            title="Shopping Details"
            className="!font-dmSansBold !text-xl md:!text-2xl leading-[32px]"
          />
        </Link>

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
                      className="!text-base md:!text-lg !leading-6 font-arialBold"
                    />
                  </div>

                  <div className="h-[1px] bg-neutralGray-100" />

                  {addresses.length === 0 ? (
                    <InitialAddressForm
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ) : (
                    <div>
                      <AddressCards
                        options={addresses}
                        onAddressSelect={handleAddressSelection}
                        setIsAddingNewAddress={setIsAddingNewAddress}
                        setSelectedAddressForEdit={setSelectedAddressForEdit}
                        setIsEditingAddress={setIsEditingAddress}
                        refetch={fetchData}
                      />
                    </div>
                  )}
                </div>

                {/* payment methods */}
                <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
                  <div>
                    <Title
                      title="Payment Method"
                      className="!text-base md:!text-lg !leading-6 font-arialBold"
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

                  {cards.length === 0 ? (
                    // when there are no stored cards in db
                    <>
                      <AnimatePresence>
                        {selectedPaymentMethod === "Card" && (
                          <StripeProvider
                            options={{
                              mode: "payment",
                              amount: Math.round(finalPrice * 100),
                              currency: "usd",
                            }}
                          >
                            <InitialCardForm
                              control={control}
                              errors={errors}
                              setValue={setValue}
                              getValues={getValues}
                              ref={cardRef}
                            />
                          </StripeProvider>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {selectedPaymentMethod === "Ciluna Wallet" && (
                          <motion.div
                            {...fadeInOut}
                            className="grid grid-cols-1 md:grid-cols-3 gap-y-[14px] w-full gap-x-[32px] md:gap-x-4"
                          >
                            <CilunaCards
                              options={cilunaOptions}
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
                              options={cilunaOptions}
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
              <StripeProvider
                options={{
                  mode: "payment",
                  amount: Math.round(finalPrice * 100),
                  currency: "usd",
                }}
              >
                <PaymentCardForm onClose={handleCloseNewCard} />
              </StripeProvider>
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

        {isOrderPlaced && (
          <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4 overflow-y-auto">
            <OrderDetails onCancel={handleCloseOrder} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
