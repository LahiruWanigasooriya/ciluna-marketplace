"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleX,
  Trash2,
} from "lucide-react";
import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import QuantitySelector from "@/app/product/[id]/QuantitySelector";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/authStore";
import { clearCart, getCart, updateCartItem } from "@/actions/carts/cart";
import { toast } from "sonner";
import { UpdateCartItemParams } from "@/types/cart";
import { getDiscountedPrice } from "@/utils/getDiscountPrice";
import { Checkbox } from "@/components/ui";
import amex from "@/public/assets/cart/amex.webp";
import visa from "@/public/assets/cart/visa.webp";
import mastercard from "@/public/assets/cart/mastercard.webp";
import applePay from "@/public/assets/cart/applePay.webp";
import { RemoveOne, RemoveAll } from "./RemoveItems";
import Summary from "./Summary";
import useDisableScroll from "@/hooks/useDisableScroll";
import Title from "@/components/custom/Title";
import { IProduct } from "@/types/product";
import Product1 from "@/public/assets/product/product1.webp";
import Product2 from "@/public/assets/product/product2.webp";
import SwiperCards from "@/components/custom/SwiperCards";

const paymentOptions = [visa, mastercard, amex, applePay];

const mockProducts: IProduct[] = [
  {
    _id: "1",
    name: "ChillWave Jersey",
    description:
      "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
    image: Product1.src,
    category: { _id: "cat1", name: "Electronics" },
    rating: 4.5,
    sold: 120,
    price: 5001.95,
    stock: 50,
    createdBy: "user1",
    discount: { percentage: 25 },
    color: "white",
    colorCode: "#E5E1D8",
    colors: ["white", "blue", "black", "red"],
    colorCodes: ["#E5E1D8", "#183B78", "#000000", "#EA0109"],
  },
  {
    _id: "2",
    name: "Sunny Circle Shades",
    description: "Fitness-focused smart watch with heart-rate monitoring.",
    image: Product2.src,
    category: { _id: "cat2", name: "Wearables" },
    rating: 4.2,
    sold: 85,
    price: 1001,
    stock: 40,
    createdBy: "user2",
    discount: { percentage: 25 },
  },
  {
    _id: "3",
    name: "Gaming Mouse",
    description: "High DPI gaming mouse with RGB lighting.",
    image: Product1.src,
    category: { _id: "cat3", name: "Accessories" },
    rating: 4.7,
    sold: 300,
    price: 3499,
    stock: 70,
    createdBy: "user3",
  },
  {
    _id: "4",
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for desk setups.",
    image: Product2.src,
    category: { _id: "cat4", name: "Office" },
    rating: 4.1,
    sold: 60,
    price: 1999,
    stock: 30,
    createdBy: "user4",
    discount: { percentage: 25 },
  },
  {
    _id: "5",
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and waterproof design.",
    image: Product1.src,
    category: { _id: "cat1", name: "Electronics" },
    rating: 4.6,
    sold: 140,
    price: 4999,
    stock: 45,
    createdBy: "user5",
    discount: { percentage: 25 },
  },
  // {
  //   _id: "4",
  //   name: "Laptop Stand",
  //   description: "Adjustable aluminum laptop stand for desk setups.",
  //   image: Product2.src,
  //   category: { _id: "cat4", name: "Office" },
  //   rating: 4.1,
  //   sold: 60,
  //   price: 1999,
  //   stock: 30,
  //   createdBy: "user4",
  //   discount: {percentage: 25},
  // },
];

// Function to calculate totals based on cart items
const calculateTotals = (items: any[]) => {
  const totalPrice = items.reduce(
    (acc, item) =>
      acc +
      getDiscountedPrice(item.priceUSD.original, item.discount) * item.quantity,
    0
  );
  const discount = totalPrice * 0.1; // 10% discount as per your logic
  const finalPrice = totalPrice - discount;

  return { totalPrice, discount, finalPrice };
};

const CartItems = () => {
  const { cart, removeFromCart, setCart, updateQuantity } = useCartStore();
  const { token } = useAuthStore();
  const [deleteCartItems, setDeleteCartItems] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [removeProduct, setRemoveProduct] = useState<any>();
  const [removeAll, setIsRemoveAll] = useState(false);

  useDisableScroll(removeProduct);
  useDisableScroll(removeAll);

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

  const handleDeleteItems = () => {
    let i = 0;
    while (i <= deleteCartItems.length) {
      removeFromCart(deleteCartItems[i]);
      i++;
    }

    setDeleteCartItems([]);
    setIsRemoveAll(false);
  };

  const handleItemDelete = (product: any) => {
    if (token) {
      removeFromCart(product._id);
      clearCart();
    } else {
      removeFromCart(product._id);
      setDeleteCartItems(
        deleteCartItems.filter((item) => item !== product._id)
      );
    }

    setRemoveProduct(null);
    toast.error(
      `${
        typeof product.productId === "object"
          ? product.productId.name
          : product.name
      } Removed from cart!`
    );
  };

  return (
    <div>
      {/* cart and summary */}
      <div className="flex flex-col gap-6 md:gap-8 xl:gap-12 text-white">
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-6">
              <div className="relative h-fit overflow-x-hidden w-full bg-[#F5F5F5] recommend:min-w-[823px] p-4 md:p-6 rounded-[6px]">
                <div className="pb-4 flex items-center justify-between font-arial gap-2">
                  <div className="flex gap-2">
                    <Checkbox
                      isSelected={isAllSelected}
                      onChange={(isSelected: boolean) => {
                        if (isSelected) {
                          setIsAllSelected(true);
                          setDeleteCartItems([...cart.map((item) => item._id)]);
                        } else {
                          setIsAllSelected(false);
                          setDeleteCartItems([]);
                        }
                      }}
                    />
                    <h2 className="text-[1rem] lg:text-lg text-[#1E1E1E] font-arialBold font-bold">
                      Product ({deleteCartItems.length})
                    </h2>
                  </div>
                  <div
                    onClick={() => {
                      if (deleteCartItems.length !== 0) {
                        setIsRemoveAll(true);
                      } else {
                        toast.error("No items selected");
                      }
                    }}
                    className="hover:cursor-pointer group flex items-center gap-2 h-6"
                  >
                    <div className="w-6 h-6 flex items-center justify-center group-hover:opacity-50">
                      <Trash2 color="#A70000" size={24} />
                    </div>
                    <p className="text-[0.875rem] text-[#A70000] underline font-bold group-hover:opacity-70">
                      Delete Items
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  {cart.map((product, index) => {
                    const isSelected =
                      deleteCartItems.find((item) => item === product._id) !==
                      undefined;

                    return (
                      <React.Fragment key={product._id}>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-y-6 md:gap-x-8 py-4 justify-between bg-[#FFFFFF0D]/5 border-t-[1px] border-[#E8E8DA] relative transition-all duration-300 ease-in-out">
                          <div className="flex flex-col md:flex-row gap-[14px] md:gap-[10px]">
                            <div className="text-black">
                              <Checkbox
                                isSelected={isAllSelected || isSelected}
                                onChange={(isSelected: boolean) => {
                                  if (isSelected) {
                                    setDeleteCartItems([
                                      ...deleteCartItems,
                                      product._id,
                                    ]);
                                    if (
                                      deleteCartItems.length ===
                                      cart.length - 1
                                    ) {
                                      setIsAllSelected(true);
                                    }
                                  } else {
                                    setDeleteCartItems(
                                      deleteCartItems.filter(
                                        (item) => item !== product._id
                                      )
                                    );
                                    setIsAllSelected(false);
                                  }
                                }}
                              />
                            </div>

                            <div className="flex gap-5">
                              <Link
                                href={`/product/${
                                  typeof product.productId === "object"
                                    ? product.productId._id
                                    : product.productId
                                }`}
                                className="w-[100px] h-[100px] relative bg-white rounded-[8px]"
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

                              <div className="col-span-2 font-arial">
                                <div className="grid grid-cols-1 md:grid-cols-7">
                                  <div className="col-span-7">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center justify-between">
                                        <Link href={`/product/${product._id}`}>
                                          <p className="font-bold text-base leading-[24px] text-[#1E1E1E]">
                                            {typeof product.productId ===
                                            "object"
                                              ? product.productId.name
                                              : product.name}
                                          </p>
                                        </Link>
                                      </div>

                                      {product.color && product.size && (
                                        <div className="flex text-gray">
                                          <h2>
                                            {product.color} | {product.size}
                                          </h2>
                                          <ChevronRight />
                                        </div>
                                      )}

                                      <div className="flex flex-col items-start justify-between">
                                        <div className="flex justify-center items-center gap-4">
                                          <p className="text-[0.75rem] lg:text-[0.75rem] text-[#909090] line-through leading-[18px] lg:leading-[20px]">
                                            {product.price.toFixed(2)}LKR
                                          </p>
                                          <p className="text-base text-[#252525] font-arialBold font-bold leading-[24px]">
                                            {getDiscountedPrice(
                                              product.price,
                                              product.discount
                                            ).toFixed(2)}
                                            LKR
                                          </p>
                                        </div>
                                        <div className="flex justify-center items-center gap-4">
                                          <p className="text-[0.75rem] text-[#909090] line-through leading-[18px] lg:leading-[20px]">
                                            {product.priceUSD.original}USD
                                          </p>
                                          <p className="text-base text-[#252525] font-arialBold font-bold leading-[24px]">
                                            {product.priceUSD.discounted}
                                            USD
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-8 md:p-0">
                              <QuantitySelector
                                productId={product._id}
                                initialQuantity={product.quantity}
                                countShow={false}
                                isCartContext={true}
                                onQuantityChange={(newQuantity) =>
                                  handleQuantityUpdate(product, newQuantity)
                                }
                              />

                              <div className="hidden md:flex items-center justify-end gap-4">
                                <CircleX
                                  color="black"
                                  strokeWidth={1}
                                  className="cursor-pointer h-6 w-6 hover:opacity-70"
                                  onClick={() => setRemoveProduct(product)}
                                />
                              </div>

                              <div className="flex items-center gap-4 md:hidden">
                                <CircleX
                                  color="black"
                                  className="cursor-pointer h-6 w-6"
                                  onClick={() => setRemoveProduct(product)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                {removeProduct && (
                  <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                    <RemoveOne
                      removeOne={handleItemDelete}
                      setIsRemoveProduct={setRemoveProduct}
                      product={removeProduct}
                    />
                  </div>
                )}
                {removeAll && (
                  <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
                    <RemoveAll
                      removeAll={handleDeleteItems}
                      setIsRemoveAll={setIsRemoveAll}
                      product={removeProduct}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full lg:max-w-[320px] recommend:max-w-[400px] gap-3">
                <Summary to="checkout" text="Checkout" />

                <div className="flex flex-col py-6 px-4 md:p-6 gap-4 text-gray font-arial bg-[#F5F5F5] rounded-[6px]">
                  <h2 className="text-xl leading-6 font-arialBold ">Pay with</h2>
                  <div className="flex gap-2 pb-2">
                    {paymentOptions.map((option, index) => (
                      <div
                        className="w-[40px] h-[24px] relative bg-[#F5F5F5] rounded-[8px]"
                        key={index}
                      >
                        <Image
                          alt="option"
                          src={option.src}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL="/placeholder-image.jpg"
                        />
                      </div>
                    ))}
                  </div>
                  <hr className="border-t border-[#E8E8DA]" />{" "}
                  <h2 className="text-xl leading-6 font-arialBold">
                    Buyer protection
                  </h2>
                  <p>
                    Get a full refund if the item is not as described or not
                    deliverd
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-400">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* recommended products */}

      <div className="py-8 md:py-20">
        <SwiperCards
          products={mockProducts}
          section={{
            category: "Jewellery",
            title: "Recommended Products",
            description: "A fleeting collection of rare beauty.",
          }}
        />
      </div>
    </div>
  );
};

export default CartItems;
