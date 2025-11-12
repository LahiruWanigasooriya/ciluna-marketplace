"use client";

import Image from "next/image";
import {
  ChevronRight,
  CircleX,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import QuantitySelector from "../product/[id]/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/authStore";
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/backend/actions/carts/cart";
import { toast } from "sonner";
import { UpdateCartItemParams } from "@/types/cart";
import {
  formatPrice,
  getDiscountedPrice,
} from "@/utils/getDiscountPrice";
import { Checkbox } from "@/components/ui";
import amex from "@/public/assets/cart/amex.webp";
import visa from "@/public/assets/cart/visa.webp";
import mastercard from "@/public/assets/cart/mastercard.webp";
import applePay from "@/public/assets/cart/applePay.webp";
import { RemoveOne, RemoveAll } from "./RemoveItems";
import Summary from "./Summary";
import useDisableScroll from "@/hooks/useDisableScroll";
import { sizeDisplayMap } from "../product/[id]/SizeSelector";
import { useExchangeRate } from "@/hooks/useExchangeRate";

const paymentOptions = [visa, mastercard, amex, applePay];

const CartItems = () => {
  const { cart, removeFromCart, setCart, updateQuantity } = useCartStore();
  const { getToken } = useAuthStore();
  const token = getToken();
  const [deleteCartItems, setDeleteCartItems] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [removeProduct, setRemoveProduct] = useState<any>();
  const [removeAll, setIsRemoveAll] = useState(false);
  const { rate, error } = useExchangeRate();

  {error && console.error("Failed to fetch rate:", error)}

  useDisableScroll(removeProduct);
  useDisableScroll(removeAll);

  const handleQuantityUpdate = async (product: any, newQuantity: number) => {
    const updateParams: UpdateCartItemParams = {
      itemId: product._id, // Use cart item ID
      quantity: newQuantity,
      productVariantId: product.productVariantId, // Include if exists
    };

    if (token) {
      try {
        await updateCartItem(updateParams, token);
        const cartResponse = await getCart(token);
        const updatedCart = cartResponse?.cart?.items || [];
        setCart(updatedCart);
      } catch (error) {
        console.error("❌ Error updating cart quantity:", error);
        toast.error("Failed to update quantity.");
      }
    } else {
      updateQuantity(product._id, newQuantity); // Use itemId for local update
    }
  };

  const handleDeleteItems = () => {
    let i = 0;
    while (i <= deleteCartItems.length) {
      removeFromCart(deleteCartItems[i]);
      i++;
    }

    setDeleteCartItems([]);
    setIsRemoveAll(false);
    if (token) clearCart();
  };

  const handleItemDelete = (product: any) => {
    console.log(token);
    removeFromCart(product._id);
    if (token) {
      console.log("clearing cart in db");
      removeCartItem({ itemId: product._id });
    } else {
      setDeleteCartItems(
        deleteCartItems.filter((item) => item !== product._id)
      );
    }

    setRemoveProduct(null);
    toast.error(
      `${
        typeof product.productId === "object"
          ? product.productId.name
          : product.name
      } Removed from cart!`
    );
  };

  return (
    <div>
      {/* cart and summary */}
      <div className="flex flex-col gap-6 md:gap-8 xl:gap-12 text-white">
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-6">
              <div className="relative h-fit overflow-x-hidden w-full bg-[#F5F5F5] recommend:min-w-[823px] p-4 pb-0 md:p-6 md:pb-2 rounded-[6px]">
                <div className="pb-4 flex items-center justify-between font-arial gap-2">
                  <div className="flex gap-2">
                    <Checkbox
                      isSelected={isAllSelected}
                      onChange={(isSelected: boolean) => {
                        if (isSelected) {
                          setIsAllSelected(true);
                          setDeleteCartItems([...cart.map((item) => item._id)]);
                        } else {
                          setIsAllSelected(false);
                          setDeleteCartItems([]);
                        }
                      }}
                    />
                    <h2 className="text-[1rem] lg:text-lg text-gray font-arialBold font-bold">
                      Product ({deleteCartItems.length})
                    </h2>
                  </div>
                  <div
                    onClick={() => {
                      if (deleteCartItems.length !== 0) {
                        setIsRemoveAll(true);
                      } else {
                        toast.error("No items selected");
                      }
                    }}
                    className="hover:cursor-pointer group flex items-center gap-2 h-6"
                  >
                    <div className="w-6 h-6 flex items-center justify-center group-hover:opacity-50">
                      <Trash2 color="#A70000" size={24} />
                    </div>
                    <p className="text-[0.875rem] w-[83px] text-[#A70000] underline font-arialBold group-hover:opacity-70">
                      Delete Items
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  {cart.map((product, index) => {
                    const isSelected =
                      deleteCartItems.find((item) => item === product._id) !==
                      undefined;

                    const discountPrice = getDiscountedPrice(
                      product.price,
                      product.discount
                    );

                    return (
                      <React.Fragment key={product._id}>
                        <div className="flex flex-col md:flex-row items-start md:items-center md:gap-x-8 py-4 justify-between bg-[#FFFFFF0D]/5 border-t-[1px] border-[#E8E8DA] relative transition-all duration-300 ease-in-out">
                          <div className="flex flex-col md:flex-row gap-[14px] md:gap-[10px] relative w-full">
                            <div>
                              <div className="text-black">
                                <Checkbox
                                  isSelected={isAllSelected || isSelected}
                                  onChange={(isSelected: boolean) => {
                                    if (isSelected) {
                                      setDeleteCartItems([
                                        ...deleteCartItems,
                                        product._id,
                                      ]);
                                      if (
                                        deleteCartItems.length ===
                                        cart.length - 1
                                      ) {
                                        setIsAllSelected(true);
                                      }
                                    } else {
                                      setDeleteCartItems(
                                        deleteCartItems.filter(
                                          (item) => item !== product._id
                                        )
                                      );
                                      setIsAllSelected(false);
                                    }
                                  }}
                                />
                              </div>
                              <div className="absolute top-0 right-0 md:hidden">
                                <CircleX
                                  color="black"
                                  className="cursor-pointer h-6 w-6"
                                  onClick={() => setRemoveProduct(product)}
                                />
                              </div>
                            </div>

                            <div className="flex gap-5">
                              <Link
                                href={`/product/${
                                  typeof product.productId === "object"
                                    ? product.productId._id
                                    : product.productId
                                }`}
                                className="w-[100px] h-[100px] relative bg-white rounded-[8px] shrink-0"
                              >
                                <Image
                                  alt={
                                    typeof product.productId === "object"
                                      ? product.productId.name
                                      : product.name
                                  }
                                  src={
                                    typeof product.productId === "object"
                                      ? product.productId.image
                                      : product.image
                                  }
                                  fill
                                  className="rounded-[14px] lg:rounded-[15px] object-cover"
                                  sizes="(max-width: 768px) full, 177px"
                                  placeholder="blur"
                                  blurDataURL="/placeholder-image.jpg"
                                />
                              </Link>

                              <div className="col-span-2 font-arial">
                                <div className="grid grid-cols-1 md:grid-cols-7">
                                  <div className="col-span-7">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center justify-between">
                                        <Link href={`/product/${product._id}`}>
                                          <p className="font-arialBold text-base leading-[24px] text-gray">
                                            {typeof product.productId ===
                                            "object"
                                              ? product.productId.name
                                              : product.name}
                                          </p>
                                        </Link>
                                      </div>

                                      {(product.color || product.size) && (
                                        <div className="flex text-gray">
                                          <h2>
                                            {[
                                              product.color,
                                              product.size
                                                ? sizeDisplayMap[
                                                    product.size
                                                  ] || product.size
                                                : null,
                                            ]
                                              .filter(Boolean)
                                              .join(" | ")}
                                          </h2>
                                          <ChevronRight />
                                        </div>
                                      )}

                                      <div className="flex flex-col items-start justify-between">
                                        <div className="flex flex-col md:flex-row justify-center md:items-center gap-x-4">
                                          <p className="text-sm text-neutralGray-700 line-through leading-[20px]">
                                            {formatPrice(product.price)}LKR
                                          </p>
                                          <p className="text-base text-[#252525] font-arialBold font-bold leading-[24px]">
                                            {formatPrice(discountPrice)}LKR
                                          </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-center md:items-center gap-x-4">
                                          <p className="text-sm text-neutralGray-700 line-through leading-[20px]">
                                            {formatPrice(product.price / rate)}
                                            USD
                                          </p>
                                          <p className="text-base text-[#252525] font-arialBold font-bold leading-[24px]">
                                            {formatPrice(discountPrice / rate)}
                                            USD
                                          </p>
                                        </div>
                                      </div>
                                      <div className="md:hidden w-fit mt-1">
                                        <QuantitySelector
                                          productId={product._id}
                                          initialQuantity={product.quantity}
                                          countShow={false}
                                          isCartContext={true}
                                          onQuantityChange={(newQuantity) =>
                                            handleQuantityUpdate(
                                              product,
                                              newQuantity
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-8 md:p-0">
                              <div className="hidden md:block">
                                <QuantitySelector
                                  productId={product._id}
                                  initialQuantity={product.quantity}
                                  countShow={false}
                                  isCartContext={true}
                                  onQuantityChange={(newQuantity) =>
                                    handleQuantityUpdate(product, newQuantity)
                                  }
                                />
                              </div>

                              <div className="hidden md:flex items-center justify-end gap-4">
                                <CircleX
                                  color="black"
                                  strokeWidth={1}
                                  className="cursor-pointer h-6 w-6 hover:opacity-70"
                                  onClick={() => setRemoveProduct(product)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                {removeProduct && (
                  <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                    <RemoveOne
                      removeOne={handleItemDelete}
                      setIsRemoveProduct={setRemoveProduct}
                      product={removeProduct}
                    />
                  </div>
                )}
                {removeAll && (
                  <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                    <RemoveAll
                      removeAll={handleDeleteItems}
                      setIsRemoveAll={setIsRemoveAll}
                      product={removeProduct}
                      selectedItems={deleteCartItems}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full lg:max-w-[320px] recommend:max-w-[400px] gap-3">
                <Summary to="checkout" text="Checkout" />

                <div className="flex flex-col py-6 px-4 md:p-6 gap-6 text-gray font-arial bg-[#F5F5F5] rounded-[6px]">
                  <div className="gap-2 md:gap-3 flex flex-col">
                    <h2 className="text-xl leading-6 font-arialBold ">
                      Pay with
                    </h2>
                    <div className="flex gap-2">
                      {paymentOptions.map((option, index) => (
                        <div
                          className="w-[40px] h-[24px] relative bg-[#F5F5F5] rounded-[8px]"
                          key={index}
                        >
                          <Image
                            alt="option"
                            src={option.src}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL="/placeholder-image.jpg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <hr className="h-[1px] bg-neutralGray-100 mb-2 md:mb-1 border-none" />
                    <h2 className="text-xl leading-6 font-arialBold">
                      Buyer protection
                    </h2>
                    <p>
                      Get a full refund if the item is not as described or not
                      deliverd
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartItems;
