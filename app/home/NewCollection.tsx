import React from "react";
import Image from "next/image";
import Link from "next/link";
import slide1 from "@/public/assets/home/new-collection.webp";
import Title from "@/components/custom/Title";
import { IconButton } from "@/components/custom/IconButton";

const NewCollection = () => {
  return (
    <div className="relative w-full">
      <Image src={slide1} alt="slide1" className="w-full" />
      <div className="absolute flex flex-col top-[5%] lg:left-[45%] right-[3%] lg:right-none items-end lg:items-start">
        <p className="text-[#6B6B65] text-[14px] sm:text-[24px] lg:text-[40px] font-kaisei">Introducing our</p>
        <h1 className="text-[24px] sm:text-[44px] lg:text-[68px] font-kaiseiBold mb-2">New Collection</h1>
        <Link href="/categories">
        <IconButton
          name="Explore Now"
          process="Processing..."
          success="GO!"
          className="py-[8px] sm:py-[16px] px-[16px] sm:px-[32px] bg-black text-white text-[14px] sm:text-[18px] cursor-pointer hover:scale-105 transition-all duration-1000"
        />
      </Link>
      </div>
    </div>
  );
};

export default NewCollection;
