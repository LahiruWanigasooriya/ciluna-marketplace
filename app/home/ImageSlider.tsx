"use client";
import Image from "next/image";
import FashionableFrock from "@/public/assets/home/20250522_1610_Elegant Pink Gown_remix_01jvvs6wr3fx99gx4gz2szyjp2 1.svg";
import Frock from "@/public/assets/home/Frame 37.svg";
import Hairloom from "@/public/assets/home/Hairloom.svg";
import Scent from "@/public/assets/home/Scent.svg";
import LuxuriousHairloom from "@/public/assets/home/20250523_1205_Elegant Jewelry Display_remix_01jvxxjztyephsby89bvp3mawc 1.svg";
import SauvageScent from "@/public/assets/home/20250523_1226_Desert Fragrance Display_remix_01jvxysvc8egva22er1rqeb9tg 1.svg";

import { useState, useEffect } from "react";
import { Button } from "react-aria-components";

interface HeroItem {
  image: string;
  thumbnail: string;
  title: string;
  subtitle: string;
}

export default function Hero() {
  const [currentHero, setCurrentHero] = useState<number>(0);
  const heroes: HeroItem[] = [
    {
      image: Frock,
      thumbnail: Frock,
      title: "Fashionable Frock",
      subtitle:
        "Discover the latest trends in frocks that blend style and comfort effortlessly.",
    },
    {
      image: Hairloom,
      thumbnail: Hairloom,
      title: "Luxurious Hairloom",
      subtitle:
        "Discover the exquisite craftsmanship of our luxurious heirlooms, each piece a testament to timeless elegance.",
    },
    {
      image: Scent,
      thumbnail: Scent,
      title: "Sauvage Scent",
      subtitle:
        "Fresh and spicy notes create an irresistible allure, perfect for those who dare to be bold.",
    },
  ];

  const handleThumbnailClick = (index: number) => {
    setCurrentHero(index);
    setCurrentHero((prev) => prev % heroes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroes.length]);

  return (
    <div className="relative w-full h-screen max-h-[940px overflow-hidden flex justify-center">
      <div className="relative w-full h-full">
        {heroes.map((hero, index) => (
          <Image
            key={index}
            src={hero.image}
            alt={hero.title}
            fill
            className={`object-cover object-center absolute transition-opacity duration-700 ease-in-out ${
              index === currentHero ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute flex justify-between w-full z-10 bottom-0 md:py-[16px] lg:py-[32px] custom-container items-center">
        <div className="flex flex-col md:gap-[12px] lg:gap-[24px] ">
          <div className="flex flex-col gap-[12px] md:w-[75%] xl:w-[495px] ">
            <h1 className="text-white font-kaiseiBold font-bold text-[20px] leading-[26px] tracking-normal md:text-[22px] md:leading-[28px] lg:text-[24px] lg:leading-[30px] xl:text-[28px] xl:leading-[32px]">
              {heroes[currentHero].title}
            </h1>
            <p className="text-white font-interw text-lg ">
              {heroes[currentHero].subtitle}
            </p>
          </div>
          <Button className="bg-white text-lightBlack px-[24px] py-[12px] w-fit rounded-lg font-normal font-[Arial] text-[14px] leading-[20px] tracking-normal cursor-pointer transition-colors duration-300">
            View Product
          </Button>
        </div>

        {/* Thumbnail Navigation */}
        <div className=" flex gap-[16px] items-center overflow-visible z-10">
          {heroes.map((hero, index) => (
            <div
              key={index}
              className={`relative cursor-pointer overflow-visible transition-all duration-300 rounded-[8px] ${
                index === currentHero
                  ? "w-[80px] h-[53px] md:w-[120px] md:h-[80px] lg:w-[160px] lg:h-[106px] xl:w-[200px] xl:h-[133px] bg-white"
                  : "w-[58px] h-[39px] md:w-[88px] md:h-[59px] lg:w-[117px] lg:h-[78px] xl:w-[146px] xl:h-[98px] bg-white/50"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={hero.thumbnail}
                alt={hero.subtitle}
                fill
                className="w-full h-auto object-cover p-[4px] rounded-[9px] "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
