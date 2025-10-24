import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { calculateTotals, getDiscountedPrice } from "@/utils/getDiscountPrice";
import { ChevronDown, ChevronUp, PencilLine } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useCheckoutStore } from "@/store/checkout";

interface SummaryProps {
  text: string;
  to?: string;
  handlePlaceOrder?: React.Dispatch<React.SetStateAction<boolean>>;
  editCart?: boolean;
  isSubmitting?: boolean;
}

const Summary: React.FC<SummaryProps> = ({ text, to, editCart, isSubmitting }) => {
  const { cart } = useCartStore();
  const [isOpenSummary, setIsOpenSummary] = useState(false);
    const { rate, error } = useExchangeRate();

  {error && console.error("Failed to fetch rate:", error)}

  const { totalPrice, discount, finalPrice } = useMemo(
    () => calculateTotals(cart, rate),
    [cart]
  );

  return (
    <div>
      <div className="hidden lg:flex flex-col p-6 rounded-[6px] justify-between bg-[#F5F5F5] gap-4">
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col text-gray">
              <div className="flex flex-col gap-6 ">
                <div className="flex justify-between">
                  <p className="text-xl font-arialBold font-bold leading-[px] md:leading-[24px]">
                    Summary
                  </p>
                  <Link href="/cart" className="w-6 h-6 hover:opacity-70">
                    {editCart && <PencilLine color="black" size={20} />}
                  </Link>
                </div>
                <div className="flex gap-2">
                  {cart.map((product, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[60px] h-[60px] relative bg-white rounded-[8px]"
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
                          className="object-cover rounded-[8px]"
                          placeholder="blur"
                          blurDataURL="/placeholder-image.jpg"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between h-6 font-arial">
                    <p className="font-[400] leading-[24px] md:leading-[32px]">
                      Total Bill
                    </p>
                    <div className="flex flex-col items-end">
                      <p className="font-[400]">${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between h-6 font-arial">
                    <p className="font-[400] leading-[24px] md:leading-[32px]">
                      Discount
                    </p>
                    <div className="flex flex-col items-end">
                      <p className="font-[400]">- ${discount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between h-6 font-arial">
                    <p className="font-[400] leading-[24px] md:leading-[32px]">
                      Shipping
                    </p>
                    <div className="flex flex-col items-end">
                      <p className="font-[400]">($0.00)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between h-8 font-arialBold">
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
                {to ? (
                  <Link href={`/${to}`} className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-arial"
                      size="extra-large"
                    >
                      {text}
                    </Button>
                  </Link>
                ) : (
                  <div className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-arial"
                      size="extra-large"
                      type="submit"
                      // onPress={() => handlePlaceOrder?.(true)}
                      onPress={(e) => {
                        // Don't prevent default - let the form handle submission
                        console.log("Button clicked - form will submit");
                      }}
                    >
                      {text}{" "}
                      {isSubmitting && (
                        <span className="ml-2 inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center flex justify-center items-center">
            No items selected.
          </p>
        )}
      </div>

      <div className="z-20 flex lg:hidden fixed w-full left-0 bottom-0 flex-col px-4 py-6 border-[#E1E1E1] rounded-tl-[8px] rounded-tr-[8px] justify-between bg-white border gap-4">
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col text-gray relative">
              <div className="flex flex-col gap-5">
                <div
                  className="absolute -mt-3 flex justify-center w-full"
                  onClick={() => setIsOpenSummary(!isOpenSummary)}
                >
                  {/* {isOpenSummary ? <ChevronDown /> : <ChevronUp className="" />} */}
                  <div className="w-[44px] h-[3px] bg-black inline-block rounded-full p-[1.5px]"></div>
                </div>
                <div>
                  {isOpenSummary ? (
                    <div className="flex justify-between">
                      <p className="text-xl font-arialBold leading-[24px]">
                        Summary
                      </p>
                      <Link href="/cart" className="w-6 h-6 hover:opacity-70">
                        {editCart && <PencilLine color="black" size={20} />}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center h-6">
                      <p className="font-arial font-bold leading-[32px] md:leading-[24px]">
                        Estimated Total
                      </p>
                      <div className="flex flex-col items-end">
                        <p className="font-bold text-[1.25rem] font-arialBold leading-6">
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
                              className="object-cover rounded-[8px]"
                              placeholder="blur"
                              blurDataURL="/placeholder-image.jpg"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between h-5 font-arial">
                        <p className="font-[400] leading-[20px] text-sm">
                          Total Bill
                        </p>
                        <div className="flex flex-col items-end text-sm">
                          <p className="font-[400]">${totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between h-5 font-arial">
                        <p className="font-[400] leading-[20px] text-sm">
                          Discount
                        </p>
                        <div className="flex flex-col items-end text-sm">
                          <p className="font-[400]">- ${discount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between h-5 font-arial">
                        <p className="font-[400] leading-[20px] text-sm">
                          Shipping
                        </p>
                        <div className="flex flex-col items-end text-sm">
                          <p className="font-[400]">($0.00)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between h-6 font-arial">
                        <p className="leading-[24px] md:leading-[32px] font-bold">
                          Estimated Total
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="font-arialBold font-bold text-[1.25rem]">
                            ${finalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {to ? (
                  <Link href={`/${to}`} className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-arial"
                      size="extra-large"
                    >
                      {text}
                    </Button>
                  </Link>
                ) : (
                  <div className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-arial"
                      size="extra-large"
                      type="submit"
                      // onPress={() => handlePlaceOrder?.(true)}
                      onPress={(e) => {
                        console.log("Button clicked - form will submit");
                      }}
                    >
                      {text}{" "}
                      {isSubmitting && (
                        <span className="ml-2 inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                    </Button>
                  </div>
                )}
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
  );
};

export default Summary;
