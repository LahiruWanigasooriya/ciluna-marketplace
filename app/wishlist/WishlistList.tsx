"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/product/ProductCard";
import { useWishlistStore } from "@/store/wishlist";
import Title from "@/components/custom/Title";
import { IProduct } from "@/types/product";

const WishlistClient = ({ cilunaPrice }: { cilunaPrice: number }) => {
  const { wishlist } = useWishlistStore();
  const router = useRouter();

  const navigateToProducts = () => {
    router.push("/product");
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 font-[Arial] text-black">
      {wishlist.length > 0 ? (
        <>
          <Title title="Favorite" className="text-left" />
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:justify-start">
            {wishlist.map((product: IProduct) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center gap-4 text-center md:text-lg lg:text-xl">
          <p className="font-medium text-black">No items in your wishlist.</p>
          <div
            onClick={navigateToProducts}
            className="hover:underline hover:opacity-80 cursor-pointer font-bold"
          >
            Go to Products
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistClient;
