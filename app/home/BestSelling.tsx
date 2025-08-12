import Title from "@/components/custom/Title";
import React from "react";
import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import Product1 from "@/public/assets/product/product1.webp";
import Product2 from "@/public/assets/product/product2.webp";

const BestSelling = async () => {

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
      discount: {percentage: 25},
      color:"white",
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
      discount: {percentage: 25},
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
    // {
    //   _id: "5",
    //   name: "Bluetooth Speaker",
    //   description: "Portable speaker with deep bass and waterproof design.",
    //   image: Product1.src,
    //   category: { _id: "cat1", name: "Electronics" },
    //   rating: 4.6,
    //   sold: 140,
    //   price: 4999,
    //   stock: 45,
    //   createdBy: "user5",
    //   discount: {percentage: 25},
    // },
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
    <div className="flex flex-col gap-3 text-black ">
      <div className="flex-1 text-center md:text-start">
        <p className="text-[12px] sm:text-[14px] font-kaiseiBold text-[#C19F32] tracking-[0.25em] sm:mb-[5px]">JEWELLERY</p>
        <h2 className="text-[24px] sm:text-[40px] lg:text-[52px] font-kaiseiBold text-gray-900 mb-6">
          Best Seller
        </h2>
        <p className="text-[14px] sm:text-[16px] text-[#707070] font-inter leading-relaxed md:mb-4">
          Chosen again and again for elegance that endures.
        </p>
      </div>
      <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 recommend:gap-[15px] pt-3 w-full">
        {mockProducts?.map((product: IProduct) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
