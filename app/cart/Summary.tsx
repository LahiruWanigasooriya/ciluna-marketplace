import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { getDiscountedPrice } from "@/utils/getDiscountPrice";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import Image from "next/image";

interface SummaryProps {
  text: string;
  to?: string;
  handlePlaceOrder?: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const Summary: React.FC<SummaryProps> = ({ text, to, handlePlaceOrder }) => {
  const { cart, removeFromCart, setCart, updateQuantity } = useCartStore();
  const [isOpenSummary, setIsOpenSummary] = useState(false);

  const { totalPrice, discount, finalPrice } = useMemo(
    () => calculateTotals(cart),
    [cart]
  );

  return (
    <div>
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
                      <p className="font-[400]">${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between h-6 font-lora">
                    <p className="font-[400] leading-[24px] md:leading-[32px]">
                      Discount
                    </p>
                    <div className="flex flex-col items-end">
                      <p className="font-[400]">- ${discount.toFixed(2)}</p>
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
                {to ? (
                  <Link href={`/${to}`} className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-lora"
                      size="extra-large"
                    >
                      {text}
                    </Button>
                  </Link>
                ) : (
                  <div className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-lora"
                      size="extra-large"
                      onPress={() => handlePlaceOrder?.(true)}
                    >
                      {text}
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

      <div className="z-10 flex lg:hidden fixed w-full left-0 bottom-0 flex-col px-4 py-6 border-[#E1E1E1] rounded-tl-[8px] rounded-tr-[8px] justify-between bg-white border gap-4">
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col text-gray relative">
              <div className="flex flex-col gap-5">
                <div
                  className="absolute top-0 w-full flex justify-end"
                  onClick={() => setIsOpenSummary(!isOpenSummary)}
                >
                  {isOpenSummary ? (
                    <ChevronDown />
                  ) : (
                    <ChevronUp className="" />
                  )}
                </div>
                <div>
                  {isOpenSummary ? (
                    <p className="text-lg md:text-xl font-lora font-bold leading-[24px]">
                      Summary
                    </p>
                  ) : (
                    <div className="flex justify-between items-center h-6">
                      <p className="font-lora font-bold leading-[32px] md:leading-[24px]">
                        Estimated Total
                      </p>
                      <div className="flex flex-col items-end">
                        <p className="font-bold text-[1.25rem] mr-8 font-lora leading-6">
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
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between h-5 font-lora">
                        <p className="font-[400] leading-[20px]">
                          Total Bill
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400]">${totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between h-5 font-lora">
                        <p className="font-[400] leading-[20px]">
                          Discount
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400]">- ${discount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between h-5 font-lora">
                        <p className="font-[400] leading-[20px]">
                          Shipping
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400]">($0.00)</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between h-6 font-lora">
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
                {to ? (
                  <Link href={`/${to}`} className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-lora"
                      size="extra-large"
                    >
                      {text}
                    </Button>
                  </Link>
                ) : (
                  <div className="w-full">
                    <Button
                      className="w-full bg-gray text-white text-lg font-lora"
                      size="extra-large"
                      onPress={() => handlePlaceOrder?.(true)}
                    >
                      {text}
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
