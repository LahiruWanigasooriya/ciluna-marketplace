"use client";

import React, { useRef } from "react";
//import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import Product1 from "@/public/assets/product/product1.webp";
import Product2 from "@/public/assets/product/product2.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCards, {
  SwiperCardsHandle,
} from "@/components/custom/SwiperCards";

const BestSelling = () => {
  const swiperRef = useRef<SwiperCardsHandle>(null);

  const mockProducts: IProduct[] = [
    {
      _id: "1",
      name: "ChillWave Jersey",
      description:
        "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
      image: Product1.src,
      category: { _id: "cat1", name: "Electronics" },
      rating: 4.5,
      sold: 120,
      price: 5001.95,
      stock: 50,
      createdBy: "user1",
      discount: { percentage: 25 },
      color: "white",
      colorCode: "#E5E1D8",
      colors: ["white", "blue", "black", "red"],
      colorCodes: ["#E5E1D8", "#183B78", "#000000", "#EA0109"],
    },
    {
      _id: "2",
      name: "Sunny Circle Shades",
      description: "Fitness-focused smart watch with heart-rate monitoring.",
      image: Product2.src,
      category: { _id: "cat2", name: "Wearables" },
      rating: 4.2,
      sold: 85,
      price: 1001,
      stock: 40,
      createdBy: "user2",
      discount: { percentage: 25 },
    },
    {
      _id: "3",
      name: "Gaming Mouse",
      description: "High DPI gaming mouse with RGB lighting.",
      image: Product1.src,
      category: { _id: "cat3", name: "Accessories" },
      rating: 4.7,
      sold: 300,
      price: 3499,
      stock: 70,
      createdBy: "user3",
    },
    {
      _id: "4",
      name: "Laptop Stand",
      description: "Adjustable aluminum laptop stand for desk setups.",
      image: Product2.src,
      category: { _id: "cat4", name: "Office" },
      rating: 4.1,
      sold: 60,
      price: 1999,
      stock: 30,
      createdBy: "user4",
      discount: { percentage: 25 },
    },
    {
      _id: "5",
      name: "Bluetooth Speaker",
      description: "Portable speaker with deep bass and waterproof design.",
      image: Product1.src,
      category: { _id: "cat1", name: "Electronics" },
      rating: 4.6,
      sold: 140,
      price: 4999,
      stock: 45,
      createdBy: "user5",
      discount: { percentage: 25 },
    },
    // {
    //   _id: "4",
    //   name: "Laptop Stand",
    //   description: "Adjustable aluminum laptop stand for desk setups.",
    //   image: Product2.src,
    //   category: { _id: "cat4", name: "Office" },
    //   rating: 4.1,
    //   sold: 60,
    //   price: 1999,
    //   stock: 30,
    //   createdBy: "user4",
    //   discount: {percentage: 25},
    // },
  ];

  return (
    <div className="custom-container py-[24px] sm:py-[32px] lg:py-[96px]">
      <div className="flex flex-col gap-1  ">
        <p className="text-[12px] sm:text-[14px] font-cinzel text-[#C19F32] sm:mb-[5px]">
          Jewellery
        </p>
        <div className="flex flex-col gap-3">
          <h2 className="text-[24px] sm:text-[40px] lg:text-[52px] font-kaiseiBold text-gray-900 mb-[12px]">
            Best Seller
          </h2>
          <div className="flex justify-between h-5 lg:h-6 relative">
            <p className="text-[14px] sm:text-[16px] text-[#707070] font-inter leading-relaxed md:mb-4 -mt-3">
              A fleeting collection of rare beauty.
            </p>
            <div className="lg:flex gap-6 absolute right-0 bottom-0 hidden">
              <button
                onClick={() => swiperRef.current?.scrollPrev()}
                className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
              >
                <ChevronLeft
                  className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                  size={40}
                />
              </button>
              <button
                onClick={() => swiperRef.current?.scrollNext()}
                className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
              >
                <ChevronRight
                  className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                  size={40}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[48px]">
        <SwiperCards ref={swiperRef} products={mockProducts} />
      </div>

    </div>
  );
};

export default BestSelling;
