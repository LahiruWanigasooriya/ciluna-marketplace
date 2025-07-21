"use client";

import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IProduct } from "@/types/product";
import Link from "next/link";
import Rating from "./Ratings";
import { useWishlistStore } from "@/store/wishlist";
import { Skeleton } from "@/components/ui";
import { useEffect, useState } from "react";
// import { toast } from "sonner";
import { updateWishlist } from "@/actions/wishlists/wishlist";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  exp: number;
}

const ProductCard = ({
  product,
  pawPrice,
}: {
  product: IProduct;
  pawPrice: number;
}) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useAuthStore();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }
  }, [token]);

  const isFavorited = wishlist?.some((item) => item._id === product._id);

  const handleFavoriteClick = async (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (userId) {
      if (isFavorited) {
        await updateWishlist({ userId, productIds: [product._id] });
        removeFromWishlist(product._id || "0");
        // toast.error(`${product.name} Removed from wishlist!`);
      } else {
        addToWishlist(product);
        await updateWishlist({ userId, productIds: [product._id] });
        // toast.success(`${product.name} Added to wishlist!`);
      }
    } else {
      if (isFavorited) {
        removeFromWishlist(product._id || "0");
        // toast.error(`${product.name} Removed from wishlist!`);
      } else {
        addToWishlist(product);
        // toast.success(`${product.name} Added to wishlist!`);
      }
    }
  };

  const truncatedName = isLoading
    ? null
    : product.name.length > 72
    ? `${product.name.substring(0, 72)}...`
    : product.name;

  const truncatedDescription = isLoading
    ? null
    : product.description.length > 60
    ? `${product.description.substring(0, 60)}...`
    : product.description;

  useEffect(() => {
    if (product._id !== null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [product._id]);

  return (
    <Link
      key={product._id}
      href={`/product/${product._id}`}
      className="flex flex-col gap-2 p-2 md:p-3 justify-between border border-[#ffffff00] rounded-[0.888rem] bg-[#FFFFFF]/5 hover:border-blue recommend:min-w-[232px] transition-all duration-300 ease-in-out min-w-[160px] sm:w-[calc(33%-0.75rem)] lg:w-[calc(23.33%-0.833rem)] xl:w-[calc(18.33%-0.833rem)] recommend:w-[calc(13.33%-0.833rem)] 2xl:w-[calc(10.33%-0.833rem)]"
    >
      <div className="h-[146px] recommend:h-[212px]">
        {isLoading ? (
          <Skeleton className="h-[146px] w-[160px] md:w-full md:h-[212px]" />
        ) : (
          <div className="relative bg-[#242526] w-full h-[146px] recommend:h-[212px]">
            <Image
             alt={product.name}
             src={product.image}
             fill 
             className="object-cover"
             sizes="(max-width: 768px) 160px, 204px" 
             placeholder="blur" 
             blurDataURL="/placeholder-image.jpg"
            />
            <div className="absolute top-2 right-2 z-10">
              {isLoading ? (
                <Skeleton className="w-5 h-5" />
              ) : isFavorited ? (
                <div className="rounded-full p-1 bg-white">
                  <FaHeart
                    className="text-purple hover:opacity-75 cursor-pointer w-4 h-4"
                    onClick={handleFavoriteClick}
                  />
                </div>
              ) : (
                <div className="rounded-full p-1 bg-white">
                  <FaRegHeart
                    className="text-black hover:opacity-75 cursor-pointer w-4 h-4"
                    onClick={handleFavoriteClick}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <div
            className={`truncate text-xxs flex justify-center items-center leading-[10px] font-semibold rounded-[5px] ${
              product?.category?.name ? "bg-[#6442c2]" : "bg-transparent"
            } text-white p-1 w-fit`}
          >
            {product?.category?.name}
          </div>
        )}
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <>
            <p className="truncate recommend:text-lg md:text-sm text-xs leading-[18px] md:leading-[27px] text-white">
              {truncatedName}
            </p>
            <p className="md:text-xs text-xxs text-gray-400">
              {truncatedDescription}
            </p>
          </>
        )}
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <div className="flex items-center gap-2">
            <Rating rating={product.rating || 0} />
            <p className="text-white md:text-xxs text-xxxs leading-[13px] md:leading-[19px]">
              {product.sold} Sold
            </p>
          </div>
        )}
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <div className="flex items-end ">
            <p className="leading-[14px] mt-3 text-xs md:text-sm recommend:text-base md:leading-[17px] font-bold text-white rounded-[5px]">
              {pawPrice !== null ? (
                `${Math.floor(
                  product.price / pawPrice / 1000
                ).toLocaleString()} PAW`
              ) : (
                <Skeleton className="w-full h-5" />
              )}
            </p>
            <p className="md:text-xxs text-xxxs text-gray-500">
              &nbsp;${product.price}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
