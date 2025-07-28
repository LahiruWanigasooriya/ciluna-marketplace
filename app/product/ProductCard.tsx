"use client";

import Image from "next/image";
import { FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa6";
import { IProduct } from "@/types/product";
import Link from "next/link";
// import { useWishlistStore } from "@/store/wishlist";
import { Skeleton } from "@/components/ui";
import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { updateWishlist } from "@/actions/wishlists/wishlist";
// import { useAuthStore } from "@/store/authStore";
// import { jwtDecode } from "jwt-decode";

// interface DecodedToken {
//   userId: string;
//   exp: number;
// }

const ProductCard = ({
  product,
}: {
  product: IProduct;
}) => {
  // const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const { token } = useAuthStore();
  // const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const decoded: DecodedToken = jwtDecode(token);
  //       setUserId(decoded.userId);
  //     } catch (error) {
  //       console.error("❌ Error fetching data:", error);
  //     }
  //   }
  // }, [token]);

  const isFavorited = false;
  // const isFavorited = wishlist?.some((item) => item._id === product._id);

  // const handleFavoriteClick = async (event: React.MouseEvent<SVGElement>) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   if (userId) {
  //     if (isFavorited) {
  //       await updateWishlist({ userId, productIds: [product._id] });
  //       removeFromWishlist(product._id || "0");
  //       // toast.error(`${product.name} Removed from wishlist!`);
  //     } else {
  //       addToWishlist(product);
  //       await updateWishlist({ userId, productIds: [product._id] });
  //       // toast.success(`${product.name} Added to wishlist!`);
  //     }
  //   } else {
  //     if (isFavorited) {
  //       removeFromWishlist(product._id || "0");
  //       // toast.error(`${product.name} Removed from wishlist!`);
  //     } else {
  //       addToWishlist(product);
  //       // toast.success(`${product.name} Added to wishlist!`);
  //     }
  //   }
  // };

  const truncatedName = isLoading
    ? null
    : product.name.length > 72
    ? `${product.name.substring(0, 72)}...`
    : product.name;

  useEffect(() => {
    if (product._id !== null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [product._id]);

  function getDiscountedPrice(price: number, discount: number): number {
    const discounted = price - (price * discount) / 100;
    return parseFloat(discounted.toFixed(2)); // rounded to 2 decimal places
  }

  const finalPrice = getDiscountedPrice(
    product.price,
    product.discount ? product.discount?.percentage : 0
  );

  function formatPrice(price: number): string {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function convertLKRtoUSD(amountLKR: number): string {
    const rate = 300; // 300 LKR = 1 USD
    return formatPrice(+(amountLKR / rate).toFixed(2));
  }

  return (
    <Link
      key={product._id}
      href={`/product/${product._id}`}
      className="flex flex-col gap-2 md:gap-5 font-lora border border-[#ffffff00] bg-white hover:border-blue recommend:min-w-[294px] transition-all duration-300 ease-in-out min-w-[164px] sm:w-[calc(33%-0.75rem)] lg:w-[calc(23.33%-0.833rem)] xl:w-[calc(18.33%-0.833rem)] recommend:w-[calc(13.33%-0.833rem)] 2xl:w-[calc(10.33%-0.833rem)]"
    >
      <div className="h-[177px] recommend:h-[317px]">
        {isLoading ? (
          <Skeleton className="h-[146px] w-[160px] md:w-full md:h-[212px]" />
        ) : (
          <div className="relative bg-[#F5F5F5] w-full h-[177px] recommend:h-[317px] rounded-[1.5rem]">
            <Image
              alt={product.name}
              src={product.image}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 164px, 294px"
              placeholder="blur"
              blurDataURL="/placeholder-image.jpg"
            />
            <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
              {isLoading ? (
                <Skeleton className="w-6 h-6" />
              ) : isFavorited ? (
                <div className="rounded-full p-1 ">
                  <FaHeart
                    className="text-[#252525] hover:opacity-75 cursor-pointer w-4 h-4"
                    // onClick={handleFavoriteClick}
                  />
                </div>
              ) : (
                <div className="rounded-full p-1">
                  <FaRegHeart
                    className="text-black hover:opacity-75 cursor-pointer w-4 h-4"
                    // onClick={handleFavoriteClick}
                  />
                </div>
              )}
            </div>
            <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
              {isLoading ? (
                <Skeleton className="w-6 h-6" />
              ) : product.discount ? (
                <div className="rounded-[0.5rem] py-[2px] md:py-1 px-2 bg-[#252525] flex">
                  {product.discount.percentage}%{" "}
                  <span className="hidden md:block ml-1"> Off</span>
                </div>
              ) : (
                <div className="rounded-full p-1"></div>
              )}
            </div>
            <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-10">
              {isLoading ? (
                <Skeleton className="w-6 h-6" />
              ) : (
                <div className="rounded-full w-8 md:w-12 h-8 md:h-12 p-2 md:p-3 bg-[#252525] flex justify-center items-center">
                  <FaCartPlus className="w-4 h-4 md:w-6 md:h-6"/>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <>
            <p className="truncate recommend:text-[1rem] leading-[24px] text-[#252525]">
              {truncatedName}
            </p>
          </>
        )}
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <div>
            <div className="flex items-center gap-1">
              <p className="line-through text-[0.75rem] tracking-tight md:tracking-normal leading-[20px] text-[#909090]">
                {formatPrice(product.price)}{" "}
                <span className="ml-[2px]">LKR</span>
              </p>
              <p className="text-[0.875rem] md:text-[1rem] text-[#252525] font-bold leading-[20px] md:leading-[24px]">
                {formatPrice(finalPrice)} <span className="ml-[2px]">LKR</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="line-through text-[0.75rem] tracking-tight md:tracking-normal leading-[20px] text-[#909090]">
                {convertLKRtoUSD(product.price)}{" "}
                <span className="ml-[2px]">USD</span>
              </p>
              <p className="text-[0.875rem] md:text-[1rem] text-[#252525] font-bold leading-[20px] md:leading-[24px]">
                {convertLKRtoUSD(finalPrice)}{" "}
                <span className="ml-[2px]">USD</span>
              </p>
            </div>
          </div>
        )}
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <div className="flex items-center gap-3 md:mt-1">
            {product.colors?.map((clr, idx) => {
              const isMain = product.color?.toLowerCase() === clr.toLowerCase();
              const code = product.colorCodes?.[idx] || "#000";

              return (
                <div key={clr}>
                  {isMain ? (
                    <div
                      className="w-[22px] h-[22px] rounded-full flex items-center justify-center bg-white"
                      style={{
                        borderColor: code,
                        borderStyle: "solid",
                        borderWidth: "1px",
                      }}
                    >
                      <div
                        className="w-[14px] h-[14px] rounded-full"
                        style={{ backgroundColor: code }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-[14px] h-[14px] rounded-full border border-gray-400"
                      style={{ backgroundColor: code }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
