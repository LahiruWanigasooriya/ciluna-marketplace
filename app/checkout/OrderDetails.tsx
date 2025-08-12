import Title from "@/components/custom/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { Check, CircleX } from "lucide-react";
import { useCartStore } from "@/store/cart";
import Card from "@/public/assets/checkout/card.png";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout";
import { maskDigits } from "@/utils/maskDigits";

interface OrderDetailsProps {
  rewardPoints: string;
  total: string;
  tax: string;
  discount: string;
  shipping: string;
  estimatedTotal: string;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  rewardPoints,
  total,
  tax,
  discount,
  shipping,
  estimatedTotal,
  onCancel,
}) => {
  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");

  const { cart } = useCartStore();
  const { values: order } = useCheckoutStore();

  return (
    <div className="bg-white w-full max-w-[1310px] relative rounded-[12px]">
      <div className="absolute top-0 right-0 p-2 z-10">
        <CircleX
          fill="#ffffff"
          color="#252525"
          strokeWidth={2}
          className="cursor-pointer h-5 w-5 hover:opacity-70"
          onClick={() => onCancel(false)}
        />
      </div>
      <div className="max-h-[90vh] overflow-y-auto p-4 md:p-6 md:pt-7 flex flex-col lg:flex-row gap-6">
        {/* view order and order details */}
        <div className="flex flex-col gap-6 w-full items-center lg:items-start">
          <div className="w-[70px] h-[70px] shrink-0 rounded-full bg-[#338A92] flex justify-center items-center">
            <Check color="white" size={32} />
          </div>
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <Title
              title="Thank you for your purchase"
              className="text-lg md:text-2xl"
            />
            <p className="mb-3 text-center lg:text-left text-[#707070] text-sm md:text-lg">
              We’ve received your order will ship 5-7 business days. Your order
              tracking number is #B6CT3
            </p>
            <Button
              className="w-full md:max-w-[154px] text-white bg-gray text-lg"
              size="extra-large"
            >
              View Order
            </Button>
          </div>
          <div className="bg-[#F5F5F5] p-6 rounded-[6px] flex flex-col gap-3 w-full">
            <Title title="Order Details" className="!text-lg md:!text-xl" />
            <div className="mt-3 flex flex-col gap-3">
              {[
                { label: "date", value: currentDate },
                { label: "reward points", value: rewardPoints },
                { label: "payment method", value: order.paymentMethod },
                { label: "total bill", value: total },
                { label: "tax (VAT)", value: tax },
                { label: "discount", value: discount },
                { label: "shipping", value: shipping },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <p className="capitalize">{item.label}</p>
                    <p>{item.value}</p>
                  </div>
                  <hr className="border-t border-[#E8E8DA]" />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="md:font-bold text-sm md:text-base">
                Estimated Total
              </p>
              <p className="font-bold text-lg md:text-xl">{estimatedTotal}</p>
            </div>
          </div>
        </div>

        {/* customer details and product list */}
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-[#F5F5F5] p-6 rounded-[6px] flex flex-col gap-4">
            <Title title="Customer Details" className="text-lg md:!text-xl" />
            <div>
              <p className="text-sm font-bold mb-2">Shipping Address</p>
              <p className="mb-1">
                <span className="font-bold">{order.contactName}</span> |{" "}
                {order.mobileNumber}
              </p>
              <p className="text-xs">{order.street}</p>
              <p className="text-xs">
                {order.town}, {order.province}, {order.country}, {order.zip}
              </p>
            </div>
            {order.cardNumber && (
              <>
                <hr className="border-t border-[#E8E8DA]" />
                <div className="font-bold">
                  <p className="text-sm">Payment Details</p>
                  <div className="flex gap-2 mt-2">
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
                    {order.cardNumber && (
                      <p>{maskDigits(order.cardNumber, 6, 6)}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-[#F5F5F5] p-6 rounded-[6px] flex flex-col gap-4">
            <h1 className="text-lg md:text-xl font-bold">
              Product Details ({cart.length})
            </h1>
            <div className="flex flex-col gap-4">
              {cart.map((product, index) => {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-5">
                      <div className="w-[60px] h-[60px] relative bg-white rounded-[8px]">
                        <Image
                          alt="product"
                          src={product.image}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL="/placeholder-image.jpg"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                        <div>
                          <p className="font-bold">{product.name}</p>
                          <p className="text-sm">Blue | XL</p>
                        </div>
                        <div className="font-bold flex flex-col lg:items-end">
                          <p>{product.price} LKR</p>
                          <p>{product.priceUSD.original} USD</p>
                        </div>
                      </div>
                    </div>
                    <hr
                      className={cn(
                        "border-t border-[#E8E8DA]",
                        index + 1 === cart.length ? "hidden" : ""
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
