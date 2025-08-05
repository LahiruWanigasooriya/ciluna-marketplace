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
      <div className="absolute flex flex-col top-[5%] left-[45%]">
        <p className="text-[#6B6B65] text-[40px] font-kaisei">Introducing our</p>
        <h1 className="text-[68px] font-kaiseiBold mb-2">New Collection</h1>
        <Link href="/categories">
        <IconButton
          name="Explore Now"
          process="Processing..."
          success="GO!"
          className=" py-[16px] px-[32px] bg-black text-white text-[18px] cursor-pointer hover:scale-105 transition-all duration-1000"
        />
      </Link>
      </div>
    </div>
  );
};

export default NewCollection;
