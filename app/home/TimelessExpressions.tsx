"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Title from "@/components/custom/Title";
import NewInImg from "@/public/assets/home/timeless-exp1.webp";
import OccasionWearImg from "@/public/assets/home/timeless-exp2.webp";
import JewelleryImg from "@/public/assets/home/timeless-exp3.webp";
import ScentsImg from "@/public/assets/home/timeless-exp4.webp";
import { IconButton } from "@/components/custom/IconButton";
import { motion } from "framer-motion";

const TimelessExpressions = () => {
  return (
    <div className="flex flex-col gap-3 items-center custom-container py-[0px] lg:py-[0px]">
      <p className="text-[12px] sm:text-[14px] font-cinzel text-[#C19F32] sm:mb-[5px]">
        Our Collection
      </p>
      <Title title="Timeless Expressions of Elegance" />
      <p className="text-[14px] sm:text-[16px] font-inter text-center text-[#707070] leading-[24px] max-w-[843px] mb-[24px] sm:mb-[48px]">
        {`Each collection is a reflection of feeling—mysterious, graceful, and quietly powerful. Created with care and guided by intention, these pieces are made to resonate with who you are, and who you’re becoming.`}
      </p>

      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-x-[24px] gap-y-[14px] w-full h-[400vw] sm:h-[42vw] recommend:h-[38vw] mb-[48px]">
        {/* New In - Left Column */}
        <div className="flex flex-col w-full sm:w-1/3 h-1/3 sm:h-auto justify-between rounded-lg bg-gradient-to-br from-[#F1EADA] to-[#DBC99B] p-[14px] xl:p-[24px] relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
          <div>
            <h2 className="text-[20px] lg:text-[24px] font-kaiseiBold mb-1">
              New In
            </h2>
            <p className="text-[14px] lg:text-[16px] text-[#252525] font-inter">
              Fresh arrivals, timeless intentions.
            </p>
          </div>
          <div className="absolute top-4 right-4 w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition-all duration-600 z-10">
            <span className="text-[20px]">↗</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-auto w-full h-auto absolute bottom-0 right-0"
          >
            <Image src={NewInImg} alt="New In" className="w-full h-auto" />
          </motion.div>
        </div>

        {/* Middle Column - Stack 2 */}
        <div className="flex flex-col w-full sm:w-1/3 h-1/3 sm:h-auto justify-between gap-4 ">
          {/* Occasion Wear */}
          <div className="flex flex-col h-1/2 justify-between rounded-lg bg-gradient-to-br from-[#F6F4E5] to-[#DEDBA5] p-[14px] xl:p-[24px] relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <div>
              <h2 className="text-[20px] lg:text-[24px] font-kaiseiBold mb-1 w-[70%]">
                Occasion Wear
              </h2>
              <p className="text-[14px] lg:text-[16px] text-[#252525] font-inter w-[80%]">
                For the moments that mean more.
              </p>
            </div>
            <div className="absolute top-4 right-4 w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:scale-105 transition-all duration-600 z-10">
              <span className="text-[20px]">↗</span>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-auto w-full h-full absolute bottom-0"
            >
              <Image
                src={OccasionWearImg}
                alt="Occasion Wear"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Jewellery */}
          <div className="flex flex-col h-1/2 justify-between rounded-lg bg-gradient-to-br from-[#F2F2F2] to-[#D9D9D9] p-[14px] xl:p-[24px] relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <div>
              <h2 className="text-[20px] lg:text-[24px] font-kaiseiBold mb-1">
                Jewellery
              </h2>
              <p className="text-[14px] lg:text-[16px] text-[#252525] font-inter w-[50%]">
                Adorn with Story
              </p>
            </div>
            <div className="absolute top-4 right-4 w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:scale-105 transition-all duration-600 z-10">
              <span className="text-[20px]">↗</span>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-auto w-full h-full absolute bottom-0"
            >
              <Image
                src={JewelleryImg}
                alt="Jewellery"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Scents - Right Column */}
        <div className="flex flex-col w-full sm:w-1/3 h-1/3 sm:h-auto justify-between rounded-lg bg-gradient-to-br from-[#CEDCE9] to-[#7DA1C4] p-[14px] xl:p-[24px] relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
          <div>
            <h2 className="text-[20px] lg:text-[24px] font-kaiseiBold mb-1">
              Scents
            </h2>
            <p className="text-[14px] lg:text-[16px] text-[#252525] font-inter">
              Whispers of Memory
            </p>
          </div>
          <div className="absolute top-4 right-4 w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:scale-105 transition-all duration-600 z-10">
            <span className="text-[20px]">↗</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-auto w-full h-auto absolute bottom-0"
          >
            <Image src={ScentsImg} alt="Scents" className="w-full h-auto" />
          </motion.div>
        </div>
      </div>

      <Link href="/categories">
        <IconButton
          name="Explore all Collection"
          process="Exploring..."
          success="GO!"
          className=" py-[8px] sm:py-[16px] px-[16px] sm:px-[32px] bg-black text-white text-[14px] sm:text-[18px] cursor-pointer hover:scale-105 transition-all duration-1000"
        />
      </Link>
    </div>
  );
};

export default TimelessExpressions;
