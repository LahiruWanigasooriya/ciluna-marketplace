import Title from "@/components/custom/Title";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import Image from "next/image";
import { Check, ChevronRight, CircleX } from "lucide-react";
import { useCartStore } from "@/store/cart";
import Card from "@/public/assets/checkout/card.png";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout";
import { maskDigits } from "@/utils/maskDigits";
import { getDiscountedPrice } from "@/utils/getDiscountPrice";

interface OrderDetailsProps {
  onCancel: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ onCancel }) => {
  // const currentDate = new Date()
  //   .toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "long",
  //     year: "numeric",
  //   })
  //   .replace(",", "");

  const rewardPoints = "10";
  const tax = "$0";
  const shipping = "$0";

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Format comes as "22 September 2025", so insert the comma
  const formattedDate = currentDate.replace(" ", ", ");

  const calculateTotals = (items: any[]) => {
    const totalPrice = items.reduce(
      (acc, item) =>
        acc +
        getDiscountedPrice(item.priceUSD.original, item.discount) *
          item.quantity,
      0
    );
    const discount = totalPrice * 0.1; // 10% discount as per your logic
    const finalPrice = totalPrice - discount;

    return { totalPrice, discount, finalPrice };
  };

  const { cart } = useCartStore();
  const { values: order } = useCheckoutStore();

  console.log("ordaer: ", order);

  const { totalPrice, discount, finalPrice } = useMemo(
    () => calculateTotals(cart),
    [cart]
  );

  return (
    <div className="bg-white w-full max-w-[1310px] relative rounded-[12px]">
      <div className="absolute top-0 right-0 p-2 z-10">
        <CircleX
          fill="#ffffff"
          color="#252525"
          strokeWidth={2}
          className="cursor-pointer h-5 w-5 hover:opacity-70"
          onClick={() => onCancel()}
        />
      </div>
      <div className="max-h-[95vh] md:h-[794px] overflow-y-auto p-4 md:p-6 md:pt-7 flex flex-col lg:flex-row gap-6">
        {/* view order and order details */}
        <div className="flex flex-col gap-6 w-full items-center lg:items-start">
          <div className="w-[56px] md:w-[70px] h-[56px] md:h-[70px] shrink-0 rounded-full bg-[#338A92] flex justify-center items-center">
            <Check color="white" size={32} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center lg:items-start">
              <Title
                title="Thank you for your purchase"
                className="text-lg md:!text-2xl !leading-8 font-arialBold"
              />
              <p className="text-center lg:text-left text-neutralGray-700 text-sm md:text-lg font-arial">
                We’ve received your order will ship 5-7 business days. Your
                order tracking number is #B6CT3
              </p>
            </div>
            <Button
              className="w-full md:max-w-[154px] text-white bg-gray text-lg font-arial"
              size="extra-large"
            >
              View Order
            </Button>
          </div>
          <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-3 w-full">
            <Title
              title="Order Details"
              className="!text-lg md:!text-xl text-left !leading-6 font-arialBold text-[#000000]"
            />
            <div className="mt-3 flex flex-col gap-3">
              {[
                { label: "date", value: formattedDate },
                { label: "reward points", value: rewardPoints },
                { label: "payment method", value: order.paymentMethod },
                { label: "total bill", value: `$${totalPrice.toFixed(2)}` },
                { label: "tax (VAT)", value: tax },
                { label: "discount", value: `- $${discount.toFixed(2)}` },
                { label: "shipping", value: shipping },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <p className="capitalize font-arial">{item.label}</p>
                    <p>{item.value}</p>
                  </div>
                  <div className="h-[1px] borer-none bg-neutralGray-100" />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center h-6">
              <p className="md:font-arialBold text-sm md:text-base">
                Estimated Total
              </p>
              <p className="font-arialBold text-lg md:text-xl">
                {`$${finalPrice.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>

        {/* customer details and product list */}
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
            <Title
              title="Customer Details"
              className="text-lg md:!text-xl text-left font-arialBold !leading-6"
            />
            <div>
              <p className="text-sm font-arialBold mb-2 leading-5">Shipping Address</p>
              <p className="mb-1">
                <span className="font-arialBold">{order.contactName}</span> |{" "}
                <span className="font-arial text-sm">{order.mobileNumber}</span>
              </p>
              <p className="text-xs leading-4 font-arial">{order.street}</p>
              <p className="text-xs leading-4 font-arial">
                {order.town}, {order.province}, {order.country}, {order.zip}
              </p>
            </div>
            {order.cardNumber && (
              <>
                <div className="h-[1px] border-none bg-neutralGray-100"/>
                <div className="font-bold">
                  <p className="text-sm font-arialBold">Payment Details</p>
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
                      <p className="font-arialBold">{maskDigits(order.cardNumber, 6, 6)}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-[#F5F5F5] p-4 md:p-6 rounded-[6px] flex flex-col gap-4">
            <h1 className="text-lg md:text-xl font-arialBold">
              Product Details ({cart.length})
            </h1>
            <div className="flex flex-col gap-4">
              {cart.map((product, index) => {
                console.log("cart in order: ", cart);
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex gap-5">
                      <div className="w-[60px] h-[60px] flex-shrink-0 relative bg-white rounded-[8px]">
                        <Image
                          // alt="product"
                          // src={product.image}
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
                      <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                        <div>
                          <p className="font-bold">{product.productId.name}</p>
                          {(product.color || product.size) && (
                            <div className="flex text-gray">
                              <h2 className="text-sm">
                                {[product.color, product.size]
                                  .filter(Boolean)
                                  .join(" | ")}
                              </h2>
                              <ChevronRight />
                            </div>
                          )}
                        </div>
                        <div className="font-bold flex flex-col lg:items-end text-sm md:text-base">
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
