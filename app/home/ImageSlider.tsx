"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { StaticImageData } from "next/image";
import FashionableFrock from "@/public/assets/home/FashionableFrock.webp";
import FrockThumbnail from "@/public/assets/home/FrockThumbnail.webp";
import MobileHairloom from "@/public/assets/home/MobHairloom.webp";
import MobileFrock from "@/public/assets/home/MobileFrock.webp";
import MobScent from "@/public/assets/home/MobScent.webp";
import HairloomThumbnail from "@/public/assets/home/HairloomThumbnail.webp";
import ScentThumbnail from "@/public/assets/home/ScentThumbnail.webp";
import LuxuriousHairloom from "@/public/assets/home/Hairloom.webp";
import SauvageScent from "@/public/assets/home/Scent.webp";
import { Button, Skeleton } from "@/components/ui";

interface HeroItem {
  image: string | StaticImageData;
  mobImg: string | StaticImageData;
  thumbnail: string | StaticImageData;
  title: string;
  subtitle: string;
}

const HEROES_DATA: HeroItem[] = [
  {
    image: FashionableFrock,
    mobImg: MobileFrock,
    thumbnail: FrockThumbnail,
    title: "Fashionable Frock",
    subtitle:
      "Discover the latest trends in frocks that blend style and comfort effortlessly.",
  },
  {
    image: LuxuriousHairloom,
    mobImg: MobileHairloom,
    thumbnail: HairloomThumbnail,
    title: "Luxurious Hairloom",
    subtitle:
      "Discover the exquisite craftsmanship of our luxurious heirlooms, each piece a testament to timeless elegance.",
  },
  {
    image: SauvageScent,
    mobImg: MobScent,
    thumbnail: ScentThumbnail,
    title: "Sauvage Scent",
    subtitle:
      "Fresh and spicy notes create an irresistible allure, perfect for those who dare to be bold.",
  },
];

const HeroImage = ({
  hero,
  index,
  isActive,
  onLoad,
}: {
  hero: HeroItem;
  index: number;
  isActive: boolean;
  onLoad: () => void;
}) => (
  <div className="absolute inset-0">
    {/* Mobile Image */}
    <Image
      src={hero.mobImg}
      alt={hero.title}
      fill
      priority
      sizes="100vw"
      onLoad={index === 0 ? onLoad : undefined}
      className={`md:hidden object-cover transition-opacity duration-500 ease-in-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    />
    {/* Desktop Image */}
    <Image
      src={hero.image}
      alt={hero.title}
      fill
      priority
      sizes="100vw"
      onLoad={index === 0 ? onLoad : undefined}
      className={`hidden md:block object-cover transition-opacity duration-500 ease-in-out ${
        index === 0 ? "object-right" : "object-center"
      } ${isActive ? "opacity-100" : "opacity-0"}`}
    />
  </div>
);

const Thumbnail = ({
  hero,
  isActive,
  onClick,
}: {
  hero: HeroItem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    className={`relative cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
      isActive
        ? "w-[80px] h-[53px] md:w-[120px] md:h-[80px] lg:w-[160px] lg:h-[106px] xl:w-[200px] xl:h-[133px] bg-white"
        : "w-[58px] h-[39px] md:w-[88px] md:h-[59px] lg:w-[117px] lg:h-[78px] xl:w-[146px] xl:h-[98px] bg-white/50"
    }`}
    onClick={onClick}
  >
    <Image
      src={hero.thumbnail}
      alt={hero.title}
      fill
      quality={90}
      className="w-full h-auto object-cover p-[2px] lg:p-[4px] rounded-[9px] "
    />
  </div>
);

export default function Hero() {
  const [currentHero, setCurrentHero] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = (index: number) => {
    // If first image is loaded, show the hero immediately
    if (index === 0) {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HEROES_DATA.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  const handleThumbnailClick = (index: number) => {
    setCurrentHero(index);
  };

  return (
    <div
      className={
        "relative w-full h-[372px] md:h-screen overflow-hidden flex justify-center"
      }
    >
      {HEROES_DATA.map((hero, index) => (
        <HeroImage
          key={index}
          hero={hero}
          index={index}
          isActive={index === currentHero}
          onLoad={() => handleImageLoad(index)}
        />
      ))}
      {!isLoaded && <Skeleton />}
      <div className="absolute hidden md:flex flex-col gap-4 w-full text-white md:top-1/4 lg:top-[12%] px-4 custom-container z-20">
        <h1 className="font-kaiseiBold text-[28px] leading-[32px] md:text-[42px] md:leading-[48px] lg:text-[48px] lg:leading-[48px] xl:text-[58px] recommend:text-[68px] recommend:leading-[60px]">
          Where Grace Becomes Legacy
        </h1>
        <p className="font-[Arial] font-normal text-[16px] text-left leading-[24px] tracking-normal lg:text-[16px] lg:leading-[24px]">
          Luxury heirlooms rooted in Sri Lanka’s royal past, crafted for <br />
          today’s soulful elegance.
        </p>
      </div>

      <div className="absolute flex w-full z-10 bottom-0 md:max-w-full items-center ">
        <div className="absolute bottom-0 w-full h-full blur-banner-hero backdrop-blur-[5px] "></div>
        <div className="flex justify-between w-full z-10 pb-0 md:py-[16px] xl:py-[32px] custom-container items-center">
          <div className="flex flex-col gap-[16px] md:gap-[12px] lg:gap-[18px] xl:gap-[24px] md:max-w-[495px] md:w-[80%] justify-center md:items-start items-center w-full">
            <div className="hidden md:flex flex-col gap-[12px] md:w-[75%] xl:w-[495px] ">
              <h1 className="text-white font-kaiseiBold text-[20px] leading-[26px] tracking-normal md:text-[22px] md:leading-[28px] lg:text-[24px] lg:leading-[30px] xl:text-[28px] xl:leading-[32px]">
                {HEROES_DATA[currentHero].title}
              </h1>
              <p className="text-white font-[Arial] font-normal text-[14px] xl:text-[16px] ">
                {HEROES_DATA[currentHero].subtitle}
              </p>
            </div>
            <div className="md:hidden flex flex-col gap-[8px] w-full text-white text-center items-center px-[16px] max-w-[380px]">
              <p className="font-kaiseiBold text-[28px] leading-[32px] tracking-normal">
                Where Grace
                <br /> Becomes Legacy
              </p>
              <p className="font-[Arial] text-[14px] leading-[20px] tracking-normal text-center">
                Luxury heirlooms rooted in Sri Lanka’s royal past, crafted for
                today’s soulful elegance.
              </p>
            </div>
            <Button className="bg-white text-black !px-[24px] !py-[12px]  w-[131px] h-[44px] rounded-[8px] font-[Arial] font-[400] text-[14px] leading-[20px] tracking-normal cursor-pointer transition-colors duration-300 border-none">
              View Product
            </Button>
            {/* Mobile Thumbnail Indicators */}
            <div className="md:hidden flex gap-2 items-center justify-center mb-2">
              {HEROES_DATA.map((_, index) => (
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
          <div className="hidden md:flex gap-4 items-center overflow-visible z-10">
            {HEROES_DATA.map((hero, index) => (
              <Thumbnail
                key={index}
                hero={hero}
                index={index}
                isActive={index === currentHero}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
