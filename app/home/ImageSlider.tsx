"use client";
import Image from "next/image";
import FashionableFrock from "@/public/assets/home/20250522_1610_Elegant Pink Gown_remix_01jvvs6wr3fx99gx4gz2szyjp2 1.svg";
import Frock from "@/public/assets/home/Frame 37.svg";
import MobileHairloom from "@/public/assets/home/MobileHairloom.svg";
import MobileFrock from "@/public/assets/home/MobileFrock.svg";
import MobScent from "@/public/assets/home/MobScent.webp";
import Hairloom from "@/public/assets/home/Hairloom.svg";
import Scent from "@/public/assets/home/Scent.svg";
import LuxuriousHairloom from "@/public/assets/home/20250523_1205_Elegant Jewelry Display_remix_01jvxxjztyephsby89bvp3mawc 1.svg";
import SauvageScent from "@/public/assets/home/20250523_1226_Desert Fragrance Display_remix_01jvxysvc8egva22er1rqeb9tg 1.svg";

import { useState, useEffect } from "react";
import { Button } from "react-aria-components";
import { useMediaQuery } from "@/components/ui";
import type { StaticImageData } from "next/image";
import { useAuthStore } from "@/store/authStore";

interface HeroItem {
  image: string | StaticImageData;
  mobImg: string | StaticImageData;
  thumbnail: string | StaticImageData;
  title: string;
  subtitle: string;
  className?: string;
  thumbnailClassName?: string;
}

export default function Hero() {
  const [currentHero, setCurrentHero] = useState<number>(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const heroes: HeroItem[] = [
    {
      image: FashionableFrock,
      mobImg: MobileFrock,
      thumbnail: Frock,
      title: "Fashionable Frock",
      subtitle:
        "Discover the latest trends in frocks that blend style and comfort effortlessly.",
      className: "object-right object- lg:object-right",
    },
    {
      image: LuxuriousHairloom,
      mobImg: MobileHairloom,
      thumbnail: Hairloom,
      title: "Luxurious Hairloom",
      subtitle:
        "Discover the exquisite craftsmanship of our luxurious heirlooms, each piece a testament to timeless elegance.",
      className: "object-right md:object-center",
    },
    {
      image: SauvageScent,
      mobImg: MobScent,
      thumbnail: Scent,
      title: "Sauvage Scent",
      subtitle:
        "Fresh and spicy notes create an irresistible allure, perfect for those who dare to be bold.",
      className: "object-right md:object-center",
    },
  ];

  const handleThumbnailClick = (index: number) => {
    setCurrentHero(index);
  };
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroes.length]);

  return (
    <div
      className={`relative w-full h-[372px] md:h-screen overflow-hidden flex justify-center md:mt-0 ${
        mounted && isAuthenticated ? "mt-0" : "mt-[40px] md:mt-0"
      }`}
    >
      {/* Background Image */}
      <div className="relative w-full h-full">
        {heroes.map((hero, index) => {
          const imgSrc = isMobile ? hero.mobImg : hero.image;
          return (
            <Image
              key={index}
              src={imgSrc}
              alt={hero.title}
              fill
              className={`${
                hero.className ? hero.className + " " : ""
              } object-cover w-full h-full lg:object-center absolute transition-opacity duration-700 ease-in-out md:h-screen  ${
                index === currentHero ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
      </div>

      <div className="absolute hidden md:flex flex-col gap-[8px] w-full text-white text-left top-0 z-9 h-fit md:top-1/4 lg:top-[10%] items-start px-[16px] custom-container">
        <p className="font-kaisei text-[28px] leading-[32px] tracking-normal md:text-[42px] md:leading-[48px] lg:text-[48px] lg:leading-[48px] xl:text-[58px] recommend:text-[68px] recommend:leading-[60px]">
          Where Grace Becomes Legacy
        </p>
        <p className="font-[Arial] font-normal text-[16px] text-left leading-[24px] tracking-normal lg:text-[16px] lg:leading-[24px]">
          Luxury heirlooms rooted in Sri Lanka’s royal past, crafted for today’s
          <br />
          soulful elegance.
        </p>
      </div>

      <div className="absolute flex justify-between w-full z-10 bottom-0  md:pb-[16px] xl:pb-[32px] md:pt-0 custom-container items-center md:backdrop-blur-sm">
        <div className="flex flex-col gap-[16px] mb-[-24px] md:mb-0 md:gap-[12px] lg:gap-[24px] md:max-w-[495px] md:w-[80%] justify-center md:items-start items-center w-full">
          <div className="hidden md:flex flex-col gap-[12px] md:w-[75%] xl:w-[495px] ">
            <h1 className="text-white font-kaisei text-[20px] leading-[26px] tracking-normal md:text-[22px] md:leading-[28px] lg:text-[24px] lg:leading-[30px] xl:text-[28px] xl:leading-[32px]">
              {heroes[currentHero].title}
            </h1>
            <p className="text-white font-[Arial] font-normal text-[14px] xl:text-[16px] ">
              {heroes[currentHero].subtitle}
            </p>
          </div>
          <div className="md:hidden flex flex-col  gap-[8px] w-full text-white text-center items-center px-[16px] max-w-[380px]">
            <p className="font-kaisei text-[28px] leading-[32px] tracking-normal">
              Where Grace
              <br /> Becomes Legacy
            </p>
            <p className="font-[Arial] text-[14px] leading-[20px] tracking-normal text-center">
              Luxury heirlooms rooted in Sri Lanka’s royal past, crafted for
              today’s soulful elegance.
            </p>
          </div>
          <Button className="bg-white text-lightBlack px-[24px] py-[12px] w-fit rounded-lg font-normal font-[Arial] text-[14px] leading-[20px] tracking-normal cursor-pointer transition-colors border border-transparent hover:bg-transparent hover:border hover:border-white hover:text-white duration-300">
            View Product
          </Button>
          {/* Mobile Thumbnail Indicators */}
          <div className="md:hidden flex gap-[8px] items-center justify-center mb-[9px]">
            {heroes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`h-[2px] w-[16px] rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentHero
                    ? " bg-white"
                    : " bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Desktop Thumbnail Indicators */}
        <div className="hidden md:flex gap-[16px] items-center overflow-visible z-10">
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
                className="w-full h-auto object-cover p-[2px] lg:p-[4px] rounded-[9px] "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
