"use client";

import { IOrderHistory } from "@/types/history";
import OrderCard from "../OrderCard";
import StateChanger from "./StateChanger";
import { useState } from "react";

const orders = [
  {
    _id: "ordercan1",
    title: "Mac 12 Pro",
    cilunaPrice: "18",
    originalCilunaPrice: "21",
    quantity: 1,
    color: "Royal Brown",
    description:
      "2020 Apple MacBook 12 Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
    imageUrl: "/assets/product/lap.webp",
    status: "Cancelled",
    price: "123",
  },
  {
    _id: "ordercan2",
    title: "MacBook Air 13",
    cilunaPrice: "15",
    originalCilunaPrice: "18",
    quantity: 2,
    color: "Silver",
    description:
      "Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver",
    imageUrl: "/assets/product/lap.webp",
    status: "Shipped",
    price: "123",
  },
  {
    _id: "ordercan3",
    title: "MacBook Air 13",
    cilunaPrice: "15",
    originalCilunaPrice: "18",
    quantity: 2,
    color: "Silver",
    description:
      "Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver",
    imageUrl: "/assets/product/lap.webp",
    status: "Delivered",
    price: "123",
  },
  {
    _id: "ordercan4",
    title: "Mac 12 Pro",
    cilunaPrice: "18",
    originalCilunaPrice: "21",
    quantity: 1,
    color: "Royal Brown",
    description:
      "2020 Apple MacBook 12 Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
    imageUrl: "/assets/product/lap.webp",
    status: "Cancelled",
    price: "123",
  },
  {
    _id: "ordercan5",
    title: "MacBook Air 13",
    cilunaPrice: "15",
    originalCilunaPrice: "18",
    quantity: 2,
    color: "Silver",
    description:
      "Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver",
    imageUrl: "/assets/product/lap.webp",
    status: "Delivered",
    price: "123",
  },
  {
    _id: "ordercan6",
    title: "MacBook Air 13",
    cilunaPrice: "15",
    originalCilunaPrice: "18",
    quantity: 2,
    color: "Silver",
    description:
      "Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver",
    imageUrl: "/assets/product/lap.webp",
    status: "Shipped",
    price: "123",
  },
];

export default function HistoryPage() {
  const [selectedState, setSelectedState] = useState<string>("All");

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedState === "All") return true;
    return order.status.toLowerCase() === selectedState.toLowerCase();
  });

  return (
    <div className="flex flex-col gap-[24px] md:gap-[26px] lg:gap-[28px] xl:gap-[30px] recommend:gap-[32px] p-[12px] md:p-[14px] lg:p-[16px] recommend:p-[20px] border-t border-l bg-[#FFFFFF]/5 border-solid border-[#6B709499] rounded-[9px]">
      <div>
        <StateChanger onstateSelect={handleStateSelect} />
      </div>
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredOrders.map((order: IOrderHistory) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center text-center text-xl text-white py-24">
          <span role="img" aria-label="sad-face" className="mr-2">
            😞
          </span>
          <p>No orders found in your history.</p>
        </div>
      )}
    </div>
  );
}
