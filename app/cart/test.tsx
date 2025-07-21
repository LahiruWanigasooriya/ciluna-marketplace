"use client";

import Image from "next/image";
import Title from "@/components/custom/Title";
import { ChevronLeft, Trash2 } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuantitySelector from "@/app/product/[id]/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { IProduct } from "@/types/product";
import Rating from "../product/Ratings";

const calculateTotals = (items: any[]) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = totalPrice * 0.1;
  const finalPrice = totalPrice - discount;

  return { totalPrice, discount, finalPrice };
};

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const [hiddenItems, setHiddenItems] = useState<string[]>([]);

  const visibleOrderItems = useMemo(
    () => cartItems.filter((item) => !hiddenItems.includes(item._id ?? "")),
    [cartItems, hiddenItems]
  );
  const { totalPrice, discount, finalPrice } = useMemo(
    () => calculateTotals(visibleOrderItems),
    [visibleOrderItems]
  );

  const toggleWishlist = (product: IProduct) => {
    if (!product._id) return;
    if (wishlist.some((item) => item._id === product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const toggleCartItemVisibility = (productId: string) => {
    setHiddenItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 xl:gap-12 text-white">
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4 pr-2 md:pr-4 scrollbar-custom xl:max-h-[450px] overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-3 w-full">
            <div className="col-span-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Link href="/">
                    <ChevronLeft />
                  </Link>
                  <Title title="Cart" />
                </div>
                <div className="text-2xl font-[700]">
                  {visibleOrderItems.length < 10
                    ? `0${visibleOrderItems.length}`
                    : visibleOrderItems.length}
                  /
                  <span className="text-base">
                    {cartItems.length < 10
                      ? `0${cartItems.length}`
                      : cartItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-x-4">
            <div className="col-span-2">
              <div className="flex flex-col gap-2">
                {cartItems.map((product) => {
                  const isFavorited = wishlist.some(
                    (item) => item._id === product._id
                  );
                  return (
                    <div
                      key={product._id}
                      className="grid grid-cols-1 md:grid-cols-4 items-center gap-y-4 md:gap-x-2 p-2 justify-between border-[#6B709499] rounded-[0.888rem] bg-[#FFFFFF0D]/5 border-t-2 border-l-2 relative"
                    >
                      {product._id && (
                        <div
                          className="absolute top-4 left-4 flex items-center justify-center rounded-full h-4 w-4 cursor-pointer hover:opacity-75 border border-solid border-blue"
                          onClick={() =>
                            product._id && toggleCartItemVisibility(product._id)
                          }
                        >
                          <div
                            className={`rounded-full w-3 h-3 ${
                              hiddenItems.includes(product._id)
                                ? "bg-transparent"
                                : "bg-[#ED0006]"
                            }`}
                          />
                        </div>
                      )}
                      <Link href={`/product/${product._id}`} className="w-full">
                        <Image
                          alt={product.name}
                          src={product.image}
                          width={158}
                          height={177}
                          className="w-full md:w-[158px] md:h-[177px] h-[189.41px] rounded-[0.888rem]"
                        />
                      </Link>
                      <div className="col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-7">
                          <div className="col-span-6">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center justify-between">
                                <Link href={`/product/${product._id}`}>
                                  <p className="font-[700] text-lg">
                                    {product.name}
                                  </p>
                                </Link>
                              </div>

                              <p className="font-[400] text-sm">
                                {product.description}
                              </p>
                              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                                <div className="flex justify-center gap-4">
                                  <p className="text-xl font-[700] text-blue">
                                    {product.price} PAW
                                  </p>
                                  <div className="flex items-center font-[400]">
                                    <p className="text-xl">
                                      {(product.price * 1.1).toFixed(2)} PAW
                                    </p>
                                    <p className="text-xxs">
                                      (${(product.price * 1.1).toFixed(2)})
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <Rating rating={product.rating || 0} />
                                  <p className="font-[400] text-sm">
                                    {product.sold} Sold
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col gap-y-2">
                                <span className="text-sm font-[600] md:hidden block">
                                  Availability:{" "}
                                  <span className="text-[#2DB224]">
                                    {product.isActive ? "In Stock" : "Sold out"}
                                  </span>
                                </span>

                                <div className="flex items-center md:items-start justify-between">
                                  <QuantitySelector
                                    productId={product._id}
                                    initialQuantity={product.quantity}
                                  />

                                  <div className="flex items-center gap-4 md:hidden">
                                    <FaRegHeart
                                      className="h-5 w-5 cursor-pointer text-[#ED0006]"
                                      onClick={() => toggleWishlist(product)}
                                    />
                                    {product._id && (
                                      <Trash2
                                        className="cursor-pointer"
                                        onClick={() =>
                                          product._id &&
                                          removeFromCart(product._id)
                                        }
                                      />
                                    )}
                                  </div>

                                  <span className="text-sm font-[600] hidden md:block">
                                    Availability:&nbsp;
                                    <span className="text-[#2DB224]">
                                      In Stock
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="hidden md:flex items-center justify-end gap-2">
                              {isFavorited ? (
                                <FaHeart
                                  className="text-[#ED0006] hover:opacity-75 cursor-pointer w-5 h-5"
                                  onClick={() => toggleWishlist(product)}
                                />
                              ) : (
                                <FaRegHeart
                                  className="text-[#ED0006] hover:opacity-75 cursor-pointer w-5 h-5"
                                  onClick={() => toggleWishlist(product)}
                                />
                              )}
                              {product._id && (
                                <Trash2
                                  className="cursor-pointer w-5 h-5"
                                  onClick={() =>
                                    product._id && removeFromCart(product._id)
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col p-2 md:p-4 border-[#6B709499] rounded-[0.888rem] justify-between bg-[#FFFFFF0D]/5 border-t-2 border-l-2 gap-6 w-full">
              {visibleOrderItems.length > 0 ? (
                <>
                  <div className="flex flex-col gap-6">
                    <p className="text-xl font-[700]">Order Summary</p>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <p className="font-[400] text-sm">Price</p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400] text-sm">
                            {totalPrice.toFixed(2)} PAW
                          </p>
                          <p className="font-[400] text-xxs">($0.00)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-[400] text-sm">Discount</p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400] text-sm">
                            -{discount.toFixed(2)} PAW
                          </p>
                          <p className="font-[400] text-xxs">($0.00)</p>
                        </div>
                      </div>
                      <div className="bg-blue h-[1.33px] w-full" />
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <p className="font-[400] text-sm">Shipping Fee</p>
                          <div className="flex flex-col items-end">
                            <p className="font-[400] text-sm">0 PAW</p>
                            <p className="font-[400] text-xxs">($0.00)</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-[400] text-sm">Total</p>
                          <div className="flex flex-col items-end">
                            <p className="font-[400] text-sm">
                              {finalPrice.toFixed(2)} PAW
                            </p>
                            <p className="font-[400] text-xxs">($0.00)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </>
              ) : (
                <p className="text-gray-400 text-center flex justify-center items-center">
                  No items selected.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
