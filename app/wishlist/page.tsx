import React from "react";
import Image from "next/image";
import Img from "@/public/assets/wishlist/img.webp";
import ImgM from "@/public/assets/wishlist/imgm.webp";
import WishlistList from "./WishlistList";
import { getCilunaPrice } from "@/lib/pawService";
import toFixed from "@/functions/pawPrice";

const WishlistPage = async () => {
  const price = await getCilunaPrice();
  const cilunaPrice = toFixed(Number(price));
  return (
    <div className="flex flex-col gap-6 md:gap-8 xl:gap-12">
      {/* Wishlist Client Component */}
      <WishlistList pawPrice={cilunaPrice} />

      {/* Image Section */}
      <div>
        <Image src={Img} alt="img" className="hidden md:block" />
        <Image src={ImgM} alt="imgm" className="block md:hidden" />
      </div>
    </div>
  );
};

export default WishlistPage;
