import React from "react";
import Image from "next/image";
import BannerImg from "@/public/assets/wishlist/bannerImg.webp";
import MobBannerImg from "@/public/assets/wishlist/mobBannerImg.webp";
import WishlistList from "./WishlistList";
// import { getCilunaPrice } from "@/lib/cilunaService";
//import toFixed from "@/functions/cilunaPrice";

const WishlistPage = async () => {
  // const price = await getCilunaPrice();
  const cilunaPrice = 0;
  // toFixed(Number(price));
  return (
    <div className="flex flex-col mt-28 md:mt-[120px] lg:mt-[140px] md:gap-12 w-full justify-between">
      <div className="custom-container md:max-w-[1440px] pt-[96px] md:py-0">
        {/* Wishlist Client Component */}
        <WishlistList cilunaPrice={cilunaPrice} />
      </div>

      <div className="mt-5 md:mt-0 w-full h-full custom-container md:max-w-[1440px] md:py-0">
        <Image
          src={BannerImg}
          alt="img"
          className="hidden md:block w-full h-full"
        />
        <Image
          src={MobBannerImg}
          alt="imgm"
          className="block md:hidden w-full h-full"
        />
      </div>
    </div>
  );
};

export default WishlistPage;
