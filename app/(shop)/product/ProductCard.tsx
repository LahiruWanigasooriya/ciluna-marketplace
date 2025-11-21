"use client";

import Image from "next/image";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import { Skeleton } from "@/components/ui";
import { useEffect, useState } from "react";
import { ColorDot } from "@/components/ui/color-dot";
import { updateWishlist } from "@/backend/actions/wishlists/wishlist";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/store/authStore";
import { addToCart, getCart } from "@/backend/actions/carts/cart";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { formatPrice } from "@/utils/getDiscountPrice";
import { useUserId } from "@/hooks/useUserId";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import cartIcon from "@/public/assets/product/cartIcon.webp";
import { AnimatePresence, motion } from "framer-motion";

interface ProductCardProps {
    product: IProduct;
    onProductClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cart } = useCartStore();
  const quantity = cart.find(item => item.productId?._id === product._id)?.quantity ?? 0;
  const { getToken } = useAuthStore();
  const token = getToken();
  const userId = useUserId();
  const { rate, error } = useExchangeRate();

  {error && console.error("Failed to fetch rate:", error)}

  const [selectedColor, setSelectedColor] = useState(product.colorCode);
  // const [usdPrices, setUsdPrices] = useState({
  //   original: "0.00",
  //   discounted: "0.00",
  // });
  const price = product.price;
  const discount = product.discount?.percentage || null;
  const { addToCartItem, setCart } = useCartStore();
  const discountPrice = getDiscountedPrice(price, discount);

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
        toast.success(`${product.name} Added to wishlist!`);
      }
    } else {
      if (isFavorited) {
        removeFromWishlist(product._id || "0");
        // toast.error(`${product.name} Removed from wishlist!`);
      } else {
        addToWishlist(product);
        toast.success(`${product.name} Added to wishlist!`);
      }
    }
  };

  const handleAddToCart = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    const cartItemId = uuidv4();

    if (token) {
      const cartData = {
        productId: product._id,
        quantity: 1,
        stock: product.stock,
      };

      try {
        await addToCart(cartData);
        const cartResponse = await getCart(token);
        // const rate = await fetchExchangeRate();

        const updatedCart = cartResponse?.cart?.items || [];
        // const updatedCart = (cartResponse?.cart?.items || []).map(
        //   (item: any) => ({
        //     ...item,
        //     priceUSD: getUSDPrices(
        //       item.price,
        //       item.finalTotal,
        //       item.quantity,
        //       rate
        //     ),
        //   })
        // );
        // console.log("fetched cart with USD:", updatedCart);
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
        productId: product,
        name: product.name,
        description: product.description,
        discount: product.discount?.percentage,
        stock: product.stock,
        quantity: 1,
        image: product.image,
        price: price,
        sold: product.sold,
        rating: product.rating,
        isActive: product.isActive,
      };

      console.log("local cart: ", cartData);

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
      onClick={onProductClick}
      className="flex flex-col gap-2 md:gap-5 font-inter border border-[#ffffff00] bg-white min-w-[164px] sm:min-w-[192px] md:min-w-[223px] lg:min-w-[200px] xl:min-w-[260px] recommend:min-w-[294px] transition-all duration-300 ease-in-out sm:w-[calc(33%-0.75rem)] lg:w-[calc(24.45%-0.833rem)] xl:w-[calc(24.5%-0.833rem)] recommend:w-[calc(13.33%-0.833rem)] 2xl:w-[calc(10.33%-0.833rem)]"
    >
      <div className="h-[177px] sm:h-[220px] lg:h-[250px] xl:h-[290px] recommend:h-[317px]">
        {isLoading ? (
          <Skeleton className="h-[146px] w-[160px] md:w-full md:h-[212px]" />
        ) : (
          <div className="relative bg-[#F5F5F5] w-full h-[177px] sm:h-[220px] lg:h-[250px] xl:h-[290px] recommend:h-[317px] rounded-[0.5rem]">
            <Image
              alt={product.name}
              src={product.image}
              fill
              className="object-cover rounded-[0.5rem]"
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
                <div
                  onClick={handleAddToCart}
                  className="rounded-full w-8 xl:w-12 h-8 xl:h-12 bg-[#252525] flex justify-center items-center hover:opacity-90 relative"
                >
                  <Image
                    alt="cart icon"
                    src={cartIcon}
                    className="w-4 h-4 xl:w-6 xl:h-6 text-white"
                    sizes="(max-width: 768px) 164px, 294px"
                    placeholder="blur"
                    blurDataURL="/placeholder-image.jpg"
                  />
                  <AnimatePresence>
                    {quantity > 0 && (
                      <motion.div
                        key={quantity} // re-triggers animation when number changes
                        initial={{ x: 15, opacity: 0, scale: 0.5 }}
                        animate={{ x: 10, opacity: 1, scale: 1 }}
                        exit={{ x: 15, opacity: 0, scale: 0.5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="absolute -top-1/4 right-1/4 xl:right-0 translate-x-1/4 -translate-y-1/4 bg-gray text-white text-xs xl:text-sm font-arial w-4 h-4 xl:w-6 xl:h-6 rounded-full flex items-center justify-center"
                      >
                        {quantity}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              <p className="line-through text-xs md:text-sm tracking-tight md:tracking-normal leading-[20px] text-[#707070] font-arial">
                {formatPrice(price)} <span className="ml-[2px]">LKR</span>
              </p>
              <p className="text-[0.875rem] md:text-[1rem] text-[#252525] font-arialBold leading-[20px] md:leading-[24px]">
                {formatPrice(discountPrice)}{" "}
                <span className="ml-[2px]">LKR</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="line-through text-xs md:text-sm tracking-tight md:tracking-normal leading-[20px] text-[#707070] font-arial">
                {formatPrice(price / rate)}{" "}
                <span className="ml-[2px]">USD</span>
              </p>
              <p className="text-[0.875rem] md:text-[1rem] text-[#252525] font-arialBold leading-[20px] md:leading-[24px]">
                {formatPrice(discountPrice / rate)}{" "}
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
              const code = product.colorCodes?.[idx] || "#000";
              const color = product.colors?.[idx] || "White";

              return (
                <div key={clr} className="relative z-10">
                  {selectedColor === color ? (
                    <div
                      className="w-[22px] h-[22px] rounded-full flex items-center justify-center bg-white"
                      style={{
                        borderColor: "#BEBEBE",
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
