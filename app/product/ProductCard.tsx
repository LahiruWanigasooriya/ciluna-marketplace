"use client";

import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import { Skeleton } from "@/components/ui";
import { useEffect, useState } from "react";
import { ColorDot } from "@/components/ui/color-dot";
import { updateWishlist } from "@/actions/wishlists/wishlist";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/store/authStore";
import { useQuantityStore } from "@/store/quantity";
import { addToCart, getCart } from "@/actions/carts/cart";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { fetchExchangeRate, formatPrice } from "@/utils/getDiscountPrice";

import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  exp: number;
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useAuthStore();
  const [userId, setUserId] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colorCode);
  const [usdPrices, setUsdPrices] = useState({
    original: "0.00",
    discounted: "0.00",
  });
  const price = product.price
  const discount = product.discount?.percentage || null;
  const { quantity } = useQuantityStore();
  const { addToCartItem, setCart } = useCartStore();
  const discountPrice = getDiscountedPrice(price, discount);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const rate = await fetchExchangeRate();
        const originalUSD = product.price / rate;
        const discountedUSD =
          getDiscountedPrice(product.price, product.discount?.percentage || 0) /
          rate;

        setUsdPrices({
          original: formatPrice(originalUSD),
          discounted: formatPrice(discountedUSD),
        });
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
        setUsdPrices({
          original: formatPrice(product.price / 300),
          discounted: formatPrice(
            getDiscountedPrice(
              product.price,
              product.discount?.percentage || 0
            ) / 300
          ),
        });
      }
    };

    fetchPrices();
  }, [product.price, product.discount?.percentage]);

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

  // const isFavorited = false;
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

  const handleAddToCart = async (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const cartItemId = uuidv4();

    if (token) {
      const cartData = {
        productId: product._id,
        quantity: quantity,
      };

      try {
        await addToCart(cartData);
        const cartResponse = await getCart(token);
        const updatedCart = cartResponse?.cart?.items || [];
        setCart(updatedCart);
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        console.error("❌ Error adding to cart:", error);
        toast.error("Failed to add product to cart.");
      }
    } else {
      const cartData = {
        _id: cartItemId,
        product,
        productId: product._id,
        name: product.name,
        description: product.description,
        discount: product.discount?.percentage,
        stock: product.stock,
        quantity: quantity,
        image: product.image,
        price: price,
        priceUSD: usdPrices,
        sold: product.sold,
        rating: product.rating,
        isActive: product.isActive,
      };

      // Add to local storage (Zustand store)
      await addToCartItem(cartData);

      // Show success toast
      toast.success(`${product.name} added to cart!`);
    }
  };

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

  function getDiscountedPrice(price: number, discount: number | null): number {
    if (discount) {
      const discounted = price - (price * discount) / 100;
      return parseFloat(discounted.toFixed(2));
    }
    return price;
  }

  function handleSelectedColor(color: string) {
    setSelectedColor(color);
  }

  return (
    <Link
      key={product._id}
      href={`/product/${product._id}`}
      className="flex flex-col gap-2 md:gap-5 font-inter border border-[#ffffff00] bg-white recommend:min-w-[294px] transition-all duration-300 ease-in-out min-w-[164px] sm:w-[calc(33%-0.75rem)] lg:w-[calc(23.33%-0.833rem)] xl:w-[calc(18.33%-0.833rem)] recommend:w-[calc(13.33%-0.833rem)] 2xl:w-[calc(10.33%-0.833rem)]"
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
              className="object-cover rounded-[1.5rem]"
              sizes="(max-width: 768px) 164px, 294px"
              placeholder="blur"
              blurDataURL="/placeholder-image.jpg"
            />
            <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
              {isLoading ? (
                <Skeleton className="w-6 h-6" />
              ) : isFavorited ? (
                <div className="rounded-full">
                  <RiHeart3Fill
                    className="text-[#252525] hover:opacity-75 cursor-pointer w-[21.5px] h-5"
                    onClick={handleFavoriteClick}
                  />
                </div>
              ) : (
                <div className="rounded-full">
                  <RiHeart3Line
                    className="text-black hover:opacity-75 cursor-pointer w-[21.5px] h-5"
                    onClick={handleFavoriteClick}
                  />
                </div>
              )}
            </div>
            <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
              {isLoading ? (
                <Skeleton className="w-6 h-6" />
              ) : product.discount ? (
                <div className="rounded-[0.5rem] text-white py-[2px] md:py-1 px-2 bg-[#252525] flex">
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
                  <FaCartPlus
                    className="w-4 h-4 md:w-6 md:h-6 text-white"
                    onClick={handleAddToCart}
                  />
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
                {formatPrice(price)} <span className="ml-[2px]">LKR</span>
              </p>
              <p className="text-[0.875rem] md:text-[1rem] text-[#252525] font-bold leading-[20px] md:leading-[24px]">
                {formatPrice(discountPrice)}{" "}
                <span className="ml-[2px]">LKR</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="line-through text-[0.75rem] tracking-tight md:tracking-normal leading-[20px] text-[#909090]">
                {usdPrices.original} <span className="ml-[2px]">USD</span>
              </p>
              <p className="text-[0.875rem] md:text-[1rem] text-[#252525] font-bold leading-[20px] md:leading-[24px]">
                {usdPrices.discounted} <span className="ml-[2px]">USD</span>
              </p>
            </div>
          </div>
        )}
        {isLoading ? (
          <Skeleton className="w-full h-5" />
        ) : (
          <div className="flex items-center gap-3 md:mt-1">
            {product.colors?.map((clr, idx) => {
              const code = product.colorCodes?.[idx] || "#000";
              const color = product.colors?.[idx] || "White";

              return (
                <div key={clr} className="relative z-10">
                  {selectedColor === color ? (
                    <div
                      className="w-[22px] h-[22px] rounded-full flex items-center justify-center bg-white"
                      style={{
                        borderColor: code,
                        borderStyle: "solid",
                        borderWidth: "1px",
                      }}
                    >
                      <ColorDot
                        code={code}
                        onClick={() => handleSelectedColor(color)}
                      />
                      {/* <div
                        className="w-[14px] h-[14px] rounded-full"
                        style={{ backgroundColor: code }}
                      /> */}
                    </div>
                  ) : (
                    <ColorDot
                      code={code}
                      onClick={() => handleSelectedColor(color)}
                    />
                    // <div
                    //   className="w-[14px] h-[14px] rounded-full border border-gray-400"
                    //   style={{ backgroundColor: code }}
                    // />
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
