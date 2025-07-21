"use client";

import Image from "next/image";
import Title from "@/components/custom/Title";
import { ChevronLeft, Trash2 } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuantitySelector from "@/app/product/[id]/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { IProduct } from "@/types/product";
import Rating from "../product/Ratings";
import { useAuthStore } from "@/store/authStore";
import { clearCart, getCart, updateCartItem } from "@/actions/carts/cart";
import { updateWishlist } from "@/actions/wishlists/wishlist";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { UpdateCartItemParams } from "@/types/cart";

interface DecodedToken {
  userId: string;
  exp: number;
}

interface CartItemsProps {
  pawPrice: number;
}

// Function to calculate totals based on cart items
const calculateTotals = (items: any[]) => {
  const totalPrice = items.reduce(
    (acc, item) =>
      acc +
      (item.price + (item.price * (item.discount || 0)) / 100) * item.quantity,
    0
  );
  const discount = totalPrice * 0.1; // 10% discount as per your logic
  const finalPrice = totalPrice - discount;

  return { totalPrice, discount, finalPrice };
};

const CartItems: React.FC<CartItemsProps> = ({ pawPrice }) => {
  const { cart, removeFromCart, setCart, updateQuantity } = useCartStore(); // Use cart directly from store
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { token } = useAuthStore();
  const [userId, setUserId] = useState("");
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 95;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUserId(decoded.userId);
        } catch (error) {
          console.error("❌ Error fetching wishlist:", error);
        }
      }
    };
    fetchWishlist();
  }, [token]); // Depend on token, not cart

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const visibleOrderItems = useMemo(
    () => cart.filter((item) => !hiddenItems.includes(item._id ?? "")),
    [cart, hiddenItems]
  );

  // Recalculate totals whenever visibleOrderItems changes
  const { totalPrice, discount, finalPrice } = useMemo(
    () => calculateTotals(visibleOrderItems),
    [visibleOrderItems]
  );

  // const toggleWishlist = async (product: any) => {
  //   const productId =
  //     typeof product.productId === "object"
  //       ? product.productId._id
  //       : product.productId;

  //   if (!productId) return;

  //   const isProductInWishlist = wishlist.some((item) => item._id === productId);

  //   if (isProductInWishlist) {
  //     if (token) {
  //       await updateWishlist({ userId, productIds: [productId] });
  //     }
  //     removeFromWishlist(productId);
  //     toast.error(
  //       `${
  //         typeof product.productId === "object"
  //           ? product.productId.name
  //           : product.name
  //       } Removed from wishlist!`
  //     );
  //   } else {
  //     if (token) {
  //       try {
  //         await updateWishlist({ userId, productIds: [productId] });
  //         toast.success(
  //           `${
  //             typeof product.productId === "object"
  //               ? product.productId.name
  //               : product.name
  //           } Added to wishlist!`
  //         );
  //       } catch (error) {
  //         console.log(error, "wish add error");
  //       }
  //     } else {
  //       addToWishlist(product.product);
  //       toast.success(
  //         `${
  //           typeof product.productId === "object"
  //             ? product.productId.name
  //             : product.name
  //         } Added to wishlist!`
  //       );
  //     }
  //   }
  // };

  const toggleCartItemVisibility = (productId: string) => {
    setHiddenItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };


  const handleQuantityUpdate = async (product: any, newQuantity: number) => {
    const updateParams: UpdateCartItemParams = {
      itemId: product._id, // Use cart item ID
      quantity: newQuantity,
      productVariantId: product.productVariantId, // Include if exists
    };

    if (token) {
      try {
        await updateCartItem(updateParams, token);
        const cartResponse = await getCart(token);
        const updatedCart = cartResponse?.cart?.items || [];
        setCart(updatedCart);
      } catch (error) {
        console.error("❌ Error updating cart quantity:", error);
        toast.error("Failed to update quantity.");
      }
    } else {
      updateQuantity(product._id, newQuantity); // Use itemId for local update
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 xl:gap-12 text-white">
      {cart.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 w-full pr-4">
            <div className="col-span-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Link href="/">
                    <ChevronLeft />
                  </Link>
                  <Title title="Cart" />
                </div>
                <div className="text-2xl font-[700]">
                  {visibleOrderItems.length < 10
                    ? `0${visibleOrderItems.length}`
                    : visibleOrderItems.length}
                  /
                  <span className="text-base">
                    {cart.length < 10 ? `0${cart.length}` : cart.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 xl:gap-x-2">
            <div className="col-span-2 pr-2 scrollbar-custom lg:max-h-[434px] overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col gap-3">
                {cart.map((product, index) => {
                  const isFavorited = wishlist.some((item) =>
                    typeof product.productId === "object"
                      ? item?._id === product.productId._id
                      : item?._id === product.productId
                  );

                  // Calculate discounted price for this product
                  const discountedPrice =
                    product.price -
                    (product.price * (product.discount || 0)) / 100;
                  const totalItemPrice = discountedPrice * product.quantity;

                  return (
                    <React.Fragment key={product._id}>
                      <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-y-4 md:gap-x-8 p-2 justify-between border-[#6B709499] rounded-[0.888rem] bg-[#FFFFFF0D]/5 border-t-2 border-l-2 relative transition-all duration-300 ease-in-out hover:border-blue">
                        <div
                          className="absolute top-4 left-4 flex items-center justify-center rounded-full h-4 w-4 cursor-pointer hover:opacity-75 border border-solid border-blue"
                          onClick={() =>
                            product._id && toggleCartItemVisibility(product._id)
                          }
                        >
                          <div
                            className={`rounded-full w-3 h-3 ${
                              hiddenItems.includes(product._id)
                                ? "bg-transparent"
                                : "bg-[#ED0006]"
                            }`}
                          />
                        </div>

                        <Link
                          href={`/product/${
                            typeof product.productId === "object"
                              ? product.productId._id
                              : product.productId
                          }`}
                          className="w-full h-[190px]  recommend:h-[189px] col-span-1 relative"
                        >
                          <Image
                            alt={
                              typeof product.productId === "object"
                                ? product.productId.name
                                : product.name
                            } 
                            src={
                              typeof product.productId === "object"
                                ? product.productId.image
                                : product.image
                            }
                            fill
                            className="rounded-[14px] lg:rounded-[15px] object-cover"
                            sizes="(max-width: 768px) full, 177px" 
                            placeholder="blur"
                            blurDataURL="/placeholder-image.jpg"
                          />
                        </Link>
                        <div className="col-span-3">
                          <div className="grid grid-cols-1 md:grid-cols-7">
                            <div className="col-span-6">
                              <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                  <Link href={`/product/${product._id}`}>
                                    <p className="font-interSemiBold text-base md:text-lg leading-[30px]">
                                      {typeof product.productId === "object"
                                        ? product.productId.name
                                        : product.name}
                                    </p>
                                  </Link>
                                </div>

                                <p className="text-sm md:text-xs xl:text-sm leading-[20px] font-[100]">
                                  {typeof product.productId === "object"
                                    ? isExpanded
                                      ? product.productId.description
                                      : product?.productId?.description?.slice(
                                          0,
                                          charLimit
                                        )
                                    : isExpanded
                                    ? product.description
                                    : product?.description?.slice(0, charLimit)}

                                  {(product?.description?.length > charLimit ||
                                    product?.productId?.description?.length >
                                      charLimit) &&
                                    !isExpanded &&
                                    " ..."}

                                  {(product?.description?.length > charLimit ||
                                    product?.productId?.description?.length >
                                      charLimit) && (
                                    <span
                                      onClick={toggleExpand}
                                      className="font-medium hover:underline ml-1 font-interSemiBold cursor-pointer"
                                    >
                                      {isExpanded ? "Show Less" : "Show More"}
                                    </span>
                                  )}
                                </p>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                                  <div className="flex justify-center gap-4">
                                    <p className="text-base lg:text-lg font-interSemiBold text-blue leading-[18px] lg:leading-[20px]">
                                      {pawPrice !== null &&
                                        Math.floor(
                                          product.price / pawPrice / 1000
                                        ).toLocaleString()}
                                       PAW
                                    </p>
                                    <p className="text-base lg:text-lg font-interSemiBold text-white leading-[18px] lg:leading-[20px]">
                                      ${product.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <Rating rating={product?.rating || 0} />
                                    <p className="font-[400] text-sm">
                                      {product?.sold} Sold
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                  <span className="text-sm font-interSemiBold leading-[20px] md:hidden block">
                                    Availability:{" "}
                                    <span className="text-[#2DB224]">
                                      {product?.isActive
                                        ? "In Stock"
                                        : "Sold out"}
                                    </span>
                                  </span>

                                  <div className="flex items-center md:items-end justify-between pt-2 md:p-0">
                                    <QuantitySelector
                                      productId={product._id}
                                      initialQuantity={product.quantity}
                                      countShow={false}
                                      isCartContext={true}
                                      onQuantityChange={(newQuantity) =>
                                        handleQuantityUpdate(
                                          product,
                                          newQuantity
                                        )
                                      }
                                    />

                                    <div className="flex items-center gap-4 md:hidden">
                                      {isFavorited ? (
                                        <FaHeart className="text-[#ED0006] w-4 h-4" />
                                      ) : (
                                        <FaRegHeart className="text-[#ED0006] w-4 h-4" />
                                      )}
                                      <Trash2
                                        className="cursor-pointer h-4 w-4"
                                        onClick={() => {
                                          if (token) {
                                            clearCart(token);
                                          } else {
                                            removeFromCart(product._id);
                                          }
                                          toast.error(
                                            `${
                                              typeof product.productId ===
                                              "object"
                                                ? product.productId.name
                                                : product.name
                                            } Removed from cart!`
                                          );
                                        }}
                                      />
                                    </div>

                                    <span className="text-sm font-[600] hidden md:block">
                                      Availability: 
                                      <span className="text-[#2DB224]">
                                        In Stock
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="hidden md:flex items-center justify-end gap-4">
                                {isFavorited ? (
                                  <FaHeart className="text-[#ED0006] w-4 h-4" />
                                ) : (
                                  <FaRegHeart className="text-[#ED0006] w-4 h-4" />
                                )}
                                <Trash2
                                  className="cursor-pointer h-4 w-4"
                                  onClick={() => {
                                    if (token) {
                                      removeFromCart(product._id);
                                      clearCart();
                                    } else {
                                      removeFromCart(product._id);
                                    }
                                    toast.error(
                                      `${
                                        typeof product.productId === "object"
                                          ? product.productId.name
                                          : product.name
                                      } Removed from cart!`
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cart.length - 1 && (
                        <hr className="border-t border-[#4A55E2]" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col py-8 xl:py-4 px-6 border-[#6B709499] rounded-[0.888rem] justify-between bg-[#FFFFFF0D]/5 border-t-2 border-l-2 gap-4 w-full">
              {visibleOrderItems.length > 0 ? (
                <>
                  <div className="flex flex-col gap-4">
                    <p className="text-lg md:text-xl font-interSemiBold leading-[32px] md:leading-[43px]">
                      Order Summary
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                          Price
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                            {pawPrice !== null &&
                              Math.floor(
                                totalPrice / pawPrice / 1000
                              ).toLocaleString()}
                             PAW
                          </p>
                          <p className="font-[400] text-xxs">
                            ${totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                          Discount
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                            -
                            {pawPrice !== null &&
                              Math.floor(
                                discount / pawPrice / 1000
                              ).toLocaleString()}
                             PAW
                          </p>
                          <p className="font-[400] text-xxs">
                            ${discount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <hr className="border-t border-[#4A55E2]" />
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                            Shipping Fee
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                              0 PAW
                            </p>
                            <p className="font-[400] text-xxs">($0.00)</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                            Total
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="font-[400] text-sm leading-[24px] md:leading-[32px]">
                              {pawPrice !== null &&
                                Math.floor(
                                  finalPrice / pawPrice / 1000
                                ).toLocaleString()}
                               PAW
                            </p>
                            <p className="font-[400] text-xxs">
                              ${finalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href="/checkout" className="w-full">
                    <Button className="w-full bg-purple">Checkout</Button>
                  </Link>
                </>
              ) : (
                <p className="text-gray-400 text-center flex justify-center items-center">
                  No items selected.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartItems;
