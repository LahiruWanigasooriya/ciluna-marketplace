"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleX,
  Trash2,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuantitySelector from "@/app/product/[id]/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/authStore";
import { clearCart, getCart, updateCartItem } from "@/actions/carts/cart";
import { toast } from "sonner";
import { UpdateCartItemParams } from "@/types/cart";
import { getDiscountedPrice } from "@/utils/getDiscountPrice";
import { Checkbox } from "@/components/ui";
import amex from "@/public/assets/cart/amex.webp";
import visa from "@/public/assets/cart/visa.webp";
import mastercard from "@/public/assets/cart/mastercard.webp";
import applePay from "@/public/assets/cart/applePay.webp";
import { RemoveOne, RemoveAll } from "./RemoveItems";

const paymentOptions = [visa, mastercard, amex, applePay];

// Function to calculate totals based on cart items
const calculateTotals = (items: any[]) => {
  const totalPrice = items.reduce(
    (acc, item) =>
      acc +
      getDiscountedPrice(item.priceUSD.original, item.discount) * item.quantity,
    0
  );
  const discount = totalPrice * 0.1; // 10% discount as per your logic
  const finalPrice = totalPrice - discount;

  return { totalPrice, discount, finalPrice };
};

const CartItems = () => {
  const { cart, removeFromCart, setCart, updateQuantity } = useCartStore();
  const { token } = useAuthStore();
  const [deleteCartItems, setDeleteCartItems] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isOpenSummary, setIsOpenSummary] = useState(false);
  const [removeProduct, setRemoveProduct] = useState<any>();
  const [removeAll, setIsRemoveAll] = useState(false);

  // Recalculate totals whenever visibleOrderItems changes
  const { totalPrice, discount, finalPrice } = useMemo(
    () => calculateTotals(cart),
    [cart]
  );

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
  };

  const handleItemDelete = (product: any) => {
    if (token) {
      removeFromCart(product._id);
      clearCart();
    } else {
      removeFromCart(product._id);
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
    <div className="flex flex-col gap-6 md:gap-8 xl:gap-12 text-white">
      {cart.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-6">
            <div className="relative h-fit overflow-x-hidden w-full bg-[#F5F5F5] recommend:min-w-[823px] p-4 md:p-6 rounded-[6px]">
              <div className="pb-4 flex items-center justify-between font-lora gap-2">
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
                  <h2 className="text-[1.125rem] text-[#1E1E1E] font-bold">
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
                  <p className="text-[0.875rem] text-[#A70000] underline font-bold group-hover:opacity-70">
                    Delete Items
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                {cart.map((product, index) => {
                  // Calculate discounted price for this product
                  const discountedPrice =
                    product.price -
                    (product.price * (product.discount || 0)) / 100;

                  const isSelected =
                    deleteCartItems.find((item) => item === product._id) !==
                    undefined;

                  return (
                    <React.Fragment key={product._id}>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-y-6 md:gap-x-8 py-4 justify-between bg-[#FFFFFF0D]/5 border-t-[1px] border-[#E8E8DA] relative transition-all duration-300 ease-in-out">
                        <div className="flex flex-col md:flex-row gap-[14px] md:gap-[10px]">
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

                          <div className="flex gap-5">
                            <Link
                              href={`/product/${
                                typeof product.productId === "object"
                                  ? product.productId._id
                                  : product.productId
                              }`}
                              className="w-[100px] h-[100px] relative bg-white rounded-[8px]"
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

                            <div className="col-span-2 font-lora">
                              <div className="grid grid-cols-1 md:grid-cols-7">
                                <div className="col-span-6">
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                      <Link href={`/product/${product._id}`}>
                                        <p className="font-bold text-base leading-[24px] text-[#1E1E1E]">
                                          {typeof product.productId === "object"
                                            ? product.productId.name
                                            : product.name}
                                        </p>
                                      </Link>
                                    </div>

                                    <div className="flex text-gray">
                                      <h2>Blue | XL</h2>
                                      <ChevronRight />
                                    </div>

                                    <div className="flex flex-col items-start justify-between">
                                      <div className="flex justify-center items-center gap-4">
                                        <p className="text-[0.75rem] lg:text-[0.75rem] text-[#909090] line-through leading-[18px] lg:leading-[20px]">
                                          {product.price.toFixed(2)}LKR
                                        </p>
                                        <p className="text-base text-[#252525] font-bold leading-[24px]">
                                          {getDiscountedPrice(
                                            product.price,
                                            product.discount
                                          ).toFixed(2)}
                                          LKR
                                        </p>
                                      </div>
                                      <div className="flex justify-center items-center gap-4">
                                        <p className="text-[0.75rem] text-[#909090] line-through leading-[18px] lg:leading-[20px]">
                                          {product.priceUSD.original}USD
                                        </p>
                                        <p className="text-base text-[#252525] font-bold leading-[24px]">
                                          {product.priceUSD.discounted}
                                          USD
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between gap-8 md:p-0">
                            <QuantitySelector
                              productId={product._id}
                              initialQuantity={product.quantity}
                              countShow={false}
                              isCartContext={true}
                              onQuantityChange={(newQuantity) =>
                                handleQuantityUpdate(product, newQuantity)
                              }
                            />

                            <div className="hidden md:flex items-center justify-end gap-4">
                              <CircleX
                                color="black"
                                strokeWidth={1}
                                className="cursor-pointer h-6 w-6 hover:opacity-70"
                                onClick={() => setRemoveProduct(product)}
                              />
                            </div>

                            <div className="flex items-center gap-4 md:hidden">
                              <CircleX
                                color="black"
                                className="cursor-pointer h-6 w-6"
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
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col w-full lg:max-w-[400px] gap-3">
              <div className="hidden lg:flex flex-col p-6 rounded-[6px] justify-between bg-[#F5F5F5] gap-4">
                {cart.length > 0 ? (
                  <>
                    <div className="flex flex-col text-gray">
                      <div className="flex flex-col gap-6">
                        <p className="text-lg md:text-xl font-lora font-bold leading-[px] md:leading-[24px]">
                          Summary
                        </p>
                        <div className="flex gap-2">
                          {cart.map((product, index) => {
                            return (
                              <div className="w-[60px] h-[60px] relative bg-white rounded-[8px]">
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
                                  className="object-cover"
                                  placeholder="blur"
                                  blurDataURL="/placeholder-image.jpg"
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between h-6 font-lora">
                            <p className="font-[400] leading-[24px] md:leading-[32px]">
                              Total Bill
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-[400]">
                                ${totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between h-6 font-lora">
                            <p className="font-[400] leading-[24px] md:leading-[32px]">
                              Discount
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-[400]">
                                - ${discount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between h-6 font-lora">
                            <p className="font-[400] leading-[24px] md:leading-[32px]">
                              Shipping
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-[400]">($0.00)</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between h-8 font-lora">
                            <p className="leading-[24px] md:leading-[32px] font-bold">
                              Estimated Total
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-bold text-[1.75rem]">
                                ${finalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className="border-t border-[#E8E8DA]" />{" "}
                        <Link href="/checkout" className="w-full">
                          <Button
                            className="w-full bg-gray text-white text-lg font-lora"
                            size="extra-large"
                          >
                            Checkout
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-400 text-center flex justify-center items-center">
                    No items selected.
                  </p>
                )}
              </div>

              <div className="flex flex-col p-6 gap-4 text-gray font-lora bg-[#F5F5F5] rounded-[6px]">
                <h2 className="text-xl leading-6 font-bold">Pay With</h2>
                <div className="flex gap-2 pb-2">
                  {paymentOptions.map((option) => (
                    <div className="w-[40px] h-[24px] relative bg-[#F5F5F5] rounded-[8px]">
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
                <hr className="border-t border-[#E8E8DA]" />{" "}
                <h2 className="text-xl leading-6 font-bold">
                  Buyer protection
                </h2>
                <p>
                  Get a full refund if the item is not as described or not
                  deliverd
                </p>
              </div>
            </div>
          </div>
          <div className="z-10 flex lg:hidden fixed w-full left-0 bottom-0 flex-col p-4 border-[#E1E1E1] rounded-tl-[8px] rounded-tr-[8px] justify-between bg-white border gap-4">
            {cart.length > 0 ? (
              <>
                <div className="flex flex-col text-gray relative">
                  <div className="flex flex-col gap-6">
                    <div
                      className="absolute top-0 w-full flex justify-end"
                      onClick={() => setIsOpenSummary(!isOpenSummary)}
                    >
                      {isOpenSummary ? (
                        <ChevronDown />
                      ) : (
                        <ChevronUp className="mt-2" />
                      )}
                    </div>
                    <div>
                      {isOpenSummary ? (
                        <p className="text-lg md:text-xl font-lora font-bold leading-[32px] md:leading-[24px]">
                          Summary
                        </p>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="font-lora font-bold leading-[32px] md:leading-[24px]">
                            Estimated Total
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="font-bold text-[1.75rem] mr-8 font-lora">
                              ${finalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {isOpenSummary && (
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-2">
                          {cart.map((product, index) => {
                            return (
                              <div className="w-[60px] h-[60px] relative bg-[#F5F5F5] rounded-[8px]">
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
                                  className="object-cover"
                                  placeholder="blur"
                                  blurDataURL="/placeholder-image.jpg"
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between h-6 font-lora">
                            <p className="font-[400] leading-[24px] md:leading-[32px]">
                              Total Bill
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-[400]">
                                ${totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between h-6 font-lora">
                            <p className="font-[400] leading-[24px] md:leading-[32px]">
                              Discount
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-[400]">
                                - ${discount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between h-6 font-lora">
                            <p className="font-[400] leading-[24px] md:leading-[32px]">
                              Shipping
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-[400]">($0.00)</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between h-8 font-lora">
                            <p className="leading-[24px] md:leading-[32px] font-bold">
                              Estimated Total
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="font-bold text-[1.75rem]">
                                ${finalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <hr className="border-t border-[#E8E8DA]" />{" "}
                    <Link href="/checkout" className="w-full">
                      <Button
                        className="w-full bg-gray text-white text-lg font-lora"
                        size="extra-large"
                      >
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-center flex justify-center items-center">
                No items selected.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartItems;
