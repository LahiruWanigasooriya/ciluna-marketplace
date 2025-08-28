"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Slide1Desktop from "@/public/assets/home/new-collection-desk.webp";
import Slide2Desktop from "@/public/assets/home/new-collection-desk.webp";
import Slide1Mobile from "@/public/assets/home/new-collection-mobile.webp";
import Slide2Mobile from "@/public/assets/home/new-collection-mobile.webp";

import { IconButton } from "@/components/custom/IconButton";

const NewCollection = () => {
  return (
    <div className="px-[16px]  py-[20px] md:px-[32px] lg:px-[68px] xl:px-[96px]">
      {/* Desktop Slider */}
      <div className="hidden md:block w-full bg-[#F2F2F2] rounded-lg overflow-hidden relative">
        <Swiper
          modules={[Autoplay]}
          speed={1200}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {[Slide1Desktop, Slide2Desktop].map((img, index) => (
            <SwiperSlide key={index} className="">
              <Image
                src={img}
                alt={`desktop-slide-${index}`}
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute flex flex-col top-[5%] lg:left-[45%] right-[3%] items-end lg:items-start z-10">
          <p className="text-[#6B6B65] text-[14px] sm:text-[24px] lg:text-[32px] xl:text-[37px] recommend:text-[40px] font-kaisei">
            Introducing our
          </p>
          <h1 className="text-[24px] sm:text-[44px] lg:text-[50px] xl:text-[60px] recommend:text-[68px] font-cinzel mb-2 whitespace-nowrap">
            New Collection
          </h1>
          <Link href="/categories">
            <IconButton
              name="Explore Now"
              process="Exploring..."
              success="GO!"
              className="py-[8px] sm:py-[16px] px-[16px] sm:px-[32px] bg-black text-white text-[14px] sm:text-[18px] cursor-pointer hover:scale-105 transition-all duration-1000"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden w-full bg-[#F2F2F2] rounded-lg overflow-hidden  mt-0  relative">
        <Swiper
          modules={[Autoplay]}
          speed={1200}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {[Slide1Mobile, Slide2Mobile].map((img, index) => (
            <SwiperSlide key={index} className="">
              <Image
                src={img}
                alt={`mobile-slide-${index}`}
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute flex flex-col top-[5%] right-[3%] items-end lg:items-start z-10">
          <p className="text-[#6B6B65] text-[14px] sm:text-[24px] lg:text-[40px] font-kaisei">
            Introducing our
          </p>
          <h1 className="text-[24px] sm:text-[44px] lg:text-[68px] font-kaiseiBold mb-2">
            New Collection
          </h1>
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
    </div>
  );
};

export default NewCollection;
