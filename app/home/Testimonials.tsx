"use client";

import React from "react";
import Link from "next/link";
import Title from "@/components/custom/Title";
import TestimonialCard from "@/components/custom/TestimonialCard";
import NecklaceImg from "@/public/assets/home/necklaceimg.webp";
import RingImg from "@/public/assets/home/ringimg.webp";
import PerfumeImg from "@/public/assets/home/perfumeimg.webp";
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
      "The scent I chose from LUMINA enveloped me in an aura of elegance, leaving a lasting impression that felt both magical and timeless.",
    name: "Anika Rathnayake",
    productImage: PerfumeImg,
    productName: "VERSACE Eros",
  },
];

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center bg-[#F5F5F5] py-[32px] lg:py-[96px]">
      <p className="text-[12px] sm:text-[14px] font-kaiseiBold text-[#C19F32] tracking-[0.25em] sm:mb-[5px]">
        TESTIMONIALS
      </p>
      <Title title="What Our Clients Say" />
      <p className="text-[14px] sm:text-[16px] font-inter text-center text-[#707070] leading-[24px] max-w-[843px] ">
        {`The elegance we create finds its meaning in your moments. These are the whispers of those who carry a piece of our soul.`}
      </p>

      <div className=" py-[48px] w-full">
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

      <Link href="/testimonials">
        <IconButton
          name="Explore all Testimonials"
          process="Exploring..."
          success="GO!"
          className=" py-[8px] sm:py-[16px] px-[16px] sm:px-[32px] bg-black text-white text-[14px] sm:text-[18px] cursor-pointer hover:scale-105 transition-all duration-1000"
        />
      </Link>
    </div>
  );
};

export default Testimonials;
