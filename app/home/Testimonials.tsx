"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Title from "@/components/custom/Title";
import TestimonialCard from "@/components/custom/TestimonialCard";
import NecklaceImg from "@/public/assets/home/necklaceimg.webp";
import RingImg from "@/public/assets/home/ringimg.webp";
import PerfumeImg from "@/public/assets/home/perfumeimg.webp";
import BgImg from "@/public/assets/home/testimonials-bg.png";
import { Button } from "react-aria-components";
import { IconButton } from "@/components/custom/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";

const testimonials = [
  {
    rating: 4,
    review:
      "The necklace I wore on my engagement day was from CILUNA — I’ve never felt more timeless and radiant.",
    name: "Anika Rathnayake",
    productImage: NecklaceImg,
    productName: "Moonlit Pearl Necklace",
  },
  {
    rating: 4,
    review:
      "The ring I selected from LUMINA was stunning, it made me feel truly elegant and unforgettable.",
    name: "Anika Rathnayake",
    productImage: RingImg,
    productName: "Starlight Quartz Ring",
  },
  {
    rating: 4,
    review:
      "The scent I chose from LUMINA enveloped me in an aura of elegance,  lasting impression that felt both magical and timeless.",
    name: "Anika Rathnayake",
    productImage: PerfumeImg,
    productName: "VERSACE Eros",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#F5F5F5] py-[0px]  sm:mt-0 relative">
      <div className="flex flex-col items-center custom-container py-[24px] sm:py-[32px] lg:py-[96px] z-10">
        <p className="text-[12px] sm:text-[14px] text-[#C19F32] font-kaiseiBold leading-[20px] tracking-[0.2em] uppercase">
          Testimonials
        </p>
        <Title title="What Our Clients Say" />
        <p className="text-[14px] sm:text-[16px] font-arial mt-[7px] text-center text-[#707070] leading-[20px] max-w-[750px] ">
          {`The elegance we create finds its meaning in your moments. These are the whispers of those who carry a piece of our soul.`}
        </p>

        <div className=" py-[24px] md:py-[48px] w-full z-10">
          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <TestimonialCard key={index} {...item} />
            ))}
          </div>

          {/* Mobile & Tablet */}
          <div className="block lg:hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".custom-swiper-pagination",
              }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
              }}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard {...item} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Pagination container */}
            <div className="custom-swiper-pagination text-center"></div>
          </div>
        </div>

       
          <Button className="bg-black text-white px-[32px] py-[16px] w-fit rounded-lg font-normal font-[Arial] text-[16px] sm:text-[18px] leading-[22px] tracking-normal cursor-pointer transition-colors border border-transparent hover:bg-transparent hover:border hover:border-black hover:text-black duration-300">
            Explore all Testimonials
          </Button>
       
      </div>
      <Image
        src={BgImg}
        alt="BG Image"
        className="absolute hidden md:block w-[20%] h-auto object-cover rounded-2xl top-0 left-0 z-0 max-w-[290px]"
        placeholder="blur"
      />

      <Image
        src={BgImg}
        alt="BG Image"
        className="absolute hidden md:block w-[20%] h-auto object-cover rounded-2xl top-0 right-0 -scale-x-100 z-0 max-w-[290px]"
        placeholder="blur"
      />
    </div>
  );
};

export default Testimonials;
