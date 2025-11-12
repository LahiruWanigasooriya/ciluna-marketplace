"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Title from "@/components/custom/Title";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Summary from "../cart/Summary";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import useDisableScroll from "@/hooks/useDisableScroll";
import { orderValidationSchema } from "@/schemas/validationSchemas";
import { useCheckoutStore } from "@/store/checkout";
import { useCartStore } from "@/store/cart";
import { PaymentCardOption, Address, OrderFormFields } from "@/types/checkout";
import { useAuthStore } from "@/store/authStore";
import { getUserById } from "@/backend/actions/users/user";
import { createAddress } from "@/backend/actions/users/address";
import { getCardsByUser } from "@/backend/actions/users/card";
import { addMultipleToCart, getCart } from "@/backend/actions/carts/cart";
import { createOrder } from "@/backend/actions/orders/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserId } from "@/hooks/useUserId";
import { payWithSavedCard } from "@/backend/actions/utils/payment/stripePayment";
import { calculateTotals } from "@/utils/getDiscountPrice";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { usePaymentStore } from "@/store/paymentStore";
import OrderDetails from "./OrderDetails";
import Modal from "@/components/custom/Modal";
import ShippingAddress from "./ShippingAddress";
import PaymentDetails from "./PaymentDetails";

const CheckoutPage = () => {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [cards, setCards] = useState<PaymentCardOption[]>([]);
	const [selectedCard, setSelectedCard] = useState<PaymentCardOption>(cards[0]);

	const { getToken } = useAuthStore();
	const token = getToken();
	const userId = useUserId();
	const router = useRouter();

	const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

	const { cart, setCart } = useCartStore();
	const { rate } = useExchangeRate();
	const { setValues, setDraftFormData, clearDraftFormData, restoreDraftData } = useCheckoutStore();

	const { finalPrice } = useMemo(() => calculateTotals(cart, rate), [cart]);

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

	const methods = useForm<OrderFormFields>({
		resolver: yupResolver(orderValidationSchema) as any,
		defaultValues: {
			isDefault: false,
		},
	});

	const {
		formState: { errors },
		getValues,
		reset,
	} = methods;

	// useEffect(() => {
	//   if (!token) {
	//     const subscription = watch((formData) => {
	//       setDraftFormData(formData as Partial<Checkout>);
	//     });
	//     return () => subscription.unsubscribe();
	//   }
	// }, [watch, setDraftFormData, token]);

	// Restore draft data when component mounts or when user logs in
	// useEffect(() => {
	//   const savedDraft = restoreDraftData();
	//   if (savedDraft && token) {
	//     // User just logged in, restore their form data
	//     Object.entries(savedDraft).forEach(([key, value]) => {
	//       if (value !== undefined && value !== null && value !== "") {
	//         setValue(key as keyof OrderFormFields, value, {
	//           shouldValidate: false,
	//         });
	//       }
	//     });

	//     // Restore selected states if they exist
	//     if (savedDraft.paymentMethod) {
	//       setSelectedPaymentMethod(savedDraft.paymentMethod);
	//     }
	//   }
	// }, [token, restoreDraftData, setValue]);

	useDisableScroll(isOrderPlaced);

	const submitPayment = usePaymentStore((state) => state.submitPayment);

	const onSubmit: SubmitHandler<OrderFormFields> = async (data) => {
		console.log("Data to submit: ", data);
		if (!token) {
			toast.error("You must be logged in to place an order");
			return;
		}

		// Handling shipping address
		let address;

		if (addresses.length === 0) {
			const result = await createAddress(userId, data);
			if (result.success) address = result.address;
		} else {
			address = {
				country: data.country,
				contactName: data.contactName,
				mobileNumber: data.mobileNumber,
				street: data.street,
				province: data.province,
				district: data.district,
				town: data.town,
				zip: data.zip,
			};
		}

		// Handling payment card
		if (getValues("paymentMethod") === "card") {
			if (cards.length === 0) {
				if (submitPayment) {
					const result = await submitPayment();
					if (result?.error) {
						console.log("The error: ", result.error);
						toast.error(result.error);
						return;
					}
					toast.success("Payment successful!");
				} else {
					toast.error("Payment function not ready.");
				}
			} else {
				const result = await payWithSavedCard(selectedCard.stripeCustomerId, selectedCard.paymentMethodId, finalPrice);
				if (!result.success) {
					toast.error("Payment failed");
					return;
				}
				toast.success("Payment successful!");
			}
		}

		try {
			const cartResponse = await getCart(token);

			if (cartResponse.cart === null) {
				if (cart && cart.length > 0) {
					const cartItems = cart.map((item: any) => ({
						productId: item.productId._id,
						productVariantId: item.productVariantId || null,
						quantity: item.quantity,
						color: item.color || null,
						size: item.size || null,
						stock: item.stock,
					}));

					await addMultipleToCart(cartItems, token);
				}
			}

			const { cart: newCart } = await getCart(token);

			const payload = {
				userId,
				items: newCart.items,
				totalPrice: newCart.totalPrice,
				discount: newCart.discount,
				finalPrice: newCart.finalPrice,
				payment: { method: data.paymentMethod },
				shippingAddress: address,
			};

			const result = await createOrder(payload);
			if (!result.success) {
				toast.error(result.message);
				return;
			}
			setValues(data); // set values in checkout store in order to display in order success page
			clearDraftFormData();
			reset();
			setIsOrderPlaced(true);
		} catch (error: any) {
			toast.error(error?.message || "Something went wrong");
		}
	};

	console.log("Errors: ", errors);

	return (
		<div className="w-full flex flex-col gap-4 py-8 lg:pb-20 pt-[120px] lg:pt-[132px] px-[16px] md:px-[32px] lg:px-[72px] xl:px-[84px] recommend:px-[96px]">
			<Link href="/cart" className="flex gap-3 items-center w-fit">
				<ArrowLeft />
				<Title title="Shopping Details" className="!font-dmSansBold !text-xl md:!text-2xl leading-[32px]" />
			</Link>

			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} className=" flex flex-col gap-[16px] md:gap-[24px] lg:flex-row">
					<div className="flex flex-col w-full gap-4">
						<ShippingAddress addresses={addresses} fetchData={fetchData} />
						<PaymentDetails
							cards={cards}
							selectedCard={selectedCard}
							setSelectedCard={setSelectedCard}
							fetchData={fetchData}
						/>
					</div>
					<div className="w-full lg:max-w-[400px]">
						<Summary text="Place Order" editCart={true} />
					</div>
				</form>
			</FormProvider>

			<Modal isOpen={isOrderPlaced} onClose={handleCloseOrder}>
				<OrderDetails onCancel={handleCloseOrder} />
			</Modal>
		</div>
	);
};

export default CheckoutPage;
