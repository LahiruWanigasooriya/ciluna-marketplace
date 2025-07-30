"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/app/product/ProductCard";
import { useWishlistStore } from "@/store/wishlist";
import Title from "@/components/custom/Title";

const WishlistClient = ({pawPrice}: {pawPrice: number}) => {
  const { wishlist } = useWishlistStore();
  const router = useRouter();

  const navigateToProducts = () => {
    router.push("/product");
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 xl:gap-12">
      <div className="flex flex-col lg:space-y-5 space-y-4">
        {wishlist.length > 0 ? (
          <>
            <Title title="Favorite" className="text-white" />
            <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
              {wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center gap-4 text-center">
            <p className="text-lg font-medium text-white">
              No items in your wishlist.
            </p>
            <div
              onClick={navigateToProducts}
              className="text-blue hover:underline hover:opacity-75 cursor-pointer"
            >
              Go to Products
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistClient;