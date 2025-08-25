"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Title from "@/components/custom/Title";
import { IOrderHistory } from "@/types/history";
import { Skeleton } from "@/components/ui";

const OrderCard = ({ order }: { order: IOrderHistory }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Cancelled":
        return { border: "1px solid #ED0006" };
      case "Shipped":
        return { border: "1px solid #007BFF" };
      case "Delivered":
        return { border: "1px solid #28A745" };
      default:
        return { border: "1px solid #6B7094" };
    }
  };

  useEffect(() => {
    if (order._id !== null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [order._id]);

  const statusStyles = getStatusStyles(order.status);

  return (
    <div
      key={order._id}
      className="flex flex-col lg:flex-row md:justify-between gap-[15px] sm:gap-[12px] md:gap-[15px] recommend:gap-[38px] p-[14px] xl:p-[18px] recommend:p-[22px] border-t border-l bg-[#FFFFFF]/5 border-solid border-[#6B709499] rounded-[9px]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-[18px] sm:gap-[14px] md:gap-[18px]">
        {isLoading ? (
          <Skeleton className="w-[114px] h-[112px]" />
        ) : (
          <Image
            alt={order.title}
            src={order.imageUrl}
            className="rounded-[7px] w-full min-h-[112px] "
            width={104}
            height={112}
          />
        )}

        <div className="flex flex-col gap-[16px] sm:gap-[12px] md:gap-[12px] lg:hidden">
          <div className="flex justify-end">
            {isLoading ? (
              <Skeleton className="w-[95px] h-[27px]" />
            ) : (
              <div
                style={{
                  ...statusStyles,
                  borderStyle: "solid",
                }}
                className={`flex items-center border border-solid px-[17.5px] py-[4.5px] rounded-[6px] text-white text-xs font-interSemiBold sm:text-xxs md:text-xs`}
              >
                {order.status}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between gap-[12px] sm:gap-[4px]">
              {isLoading ? (
                <Skeleton className="w-full h-5" />
              ) : (
                <p className="leading-[17px] sm:leading-[15px] md:leading-[17px] text-blue text-sm sm:text-xs md:text-sm font-interSemiBold">
                  {order.cilunaPrice}&nbsp;CILUNA
                </p>
              )}

              <div className="flex items-end line-through decoration-1 text-white">
                {isLoading ? (
                  <Skeleton className="w-full h-5" />
                ) : (
                  <p className="text-sm leading-[17px] sm:leading-[15px] md:leading-[17px] sm:text-xs md:text-sm">
                    {order.originalCilunaPrice}&nbsp;CILUNA
                  </p>
                )}
                {isLoading ? (
                  <Skeleton className="w-full h-5" />
                ) : (
                  <p className="text-xxs sm:text-[8px]">(${order.price})</p>
                )}
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="w-full h-5" />
            ) : (
              <p className="leading-[14px] text-xs sm:text-xxs md:text-xs text-white">
                <span className="font-interSemiBold">Qty:</span>&nbsp;
                {order.quantity}
              </p>
            )}
            {isLoading ? (
              <Skeleton className="w-full h-5" />
            ) : (
              <p className="leading-[14px] text-xs sm:text-xxs md:text-xs text-white">
                <span className="font-interSemiBold">Color:</span>&nbsp;
                {order.color}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[6px] sm:gap-[8px] md:gap-[12px] w-full text-white">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="w-1/2 h-5" />
          ) : (
            <Title
              title={order.title}
              className="leading-[30px] text-lg sm:text-base md:text-lg"
            />
          )}
          {isLoading ? (
            <Skeleton className="w-[95px] h-5" />
          ) : (
            <div
              style={{
                ...statusStyles,
                borderStyle: "solid",
              }}
              className={`hidden lg:flex items-center  px-[17.5px] py-[4.5px] rounded-[6px] text-white text-xs font-interSemiBold`}
            >
              {order.status}
            </div>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <p className="leading-[20px] text-sm sm:text-xs md:text-sm lg:text-xs xl:text-sm">
            {order.description}
          </p>
        )}

        <div className="hidden lg:flex items-center justify-between w-full">
          {isLoading ? (
            <Skeleton className="w-1/3 h-5" />
          ) : (
            <div className="flex items-center justify-between gap-[10px] recommend:gap-[12px]">
              <p className="leading-[20px] text-blue text-sm xl:text-lg font-interSemiBold">
                {order.cilunaPrice}&nbsp;CILUNA
              </p>

              <div className="flex items-end line-through decoration-1">
                <p className="text-sm xl:text-lg leading-[18px] xl:leading-[20px]">
                  {order.originalCilunaPrice}&nbsp;CILUNA
                </p>

                <p className="text-xxs">($123)</p>
              </div>
            </div>
          )}
          {isLoading ? (
            <Skeleton className="w-1/3 h-5" />
          ) : (
            <div className="flex items-center justify-between gap-[10px] recommend:gap-[12px]">
              <p className="leading-[20px] text-xs">
                <span className="font-interSemiBold">Qty:</span>&nbsp;
                {order.quantity}
              </p>

              <p className="leading-[20px] text-xs">
                <span className="font-interSemiBold">Color:</span>&nbsp;
                {order.color}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
