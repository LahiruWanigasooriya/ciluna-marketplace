import React from "react";
import Image from "next/image";
import Img from "@/public/assets/wishlist/img.png";
import ImgM from "@/public/assets/wishlist/imgm.jpg";
import WishlistList from "./WishlistList";
// import { getCilunaPrice } from "@/lib/cilunaService";
import toFixed from "@/functions/cilunaPrice";

const WishlistPage = async () => {
  // const price = await getCilunaPrice();
  const cilunaPrice = 0
  // toFixed(Number(price));
  return (
    <div className="flex flex-col gap-6 md:gap-8 xl:gap-12">
      {/* Wishlist Client Component */}
      <WishlistList cilunaPrice={cilunaPrice} />

      {/* Image Section */}
      <div>
        <Image src={Img} alt="img" className="hidden md:block" />
        <Image src={ImgM} alt="imgm" className="block md:hidden" />
      </div>
    </div>
  );
};

export default WishlistPage;
