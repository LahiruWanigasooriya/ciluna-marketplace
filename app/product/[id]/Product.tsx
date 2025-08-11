"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import Rating from "../Ratings";
import { IProduct } from "@/types/product";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  imageVariants,
  thumbnailVariants,
  containerVariants,
} from "@/utils/animations";
import { motion } from "framer-motion";
import { ProductWishCountResponse } from "@/types/wishlist";
import useQuantity from "@/hooks/useQuantity";
import { useCartStore } from "@/store/cart";
import { Skeleton } from "@/components/ui";
import { ProductVariantCategory } from "@/types/productVariantCategory";
import { IProductVariant } from "@/types/productVariant";
import { useAuthStore } from "@/store/authStore";
import { addToCart, getCart } from "@/actions/carts/cart";
import { useQuantityStore } from "@/store/quantity";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface ProductProps {
  product: IProduct;
  variants: IProductVariant;
  wishCount: ProductWishCountResponse;
  cilunaPrice: number;
}

const Product: React.FC<ProductProps> = ({
  product,
  variants,
  wishCount,
  cilunaPrice,
}) => {
  // Combine the main image and additional images
  const initialImages = useRef<string[]>([
    ...new Set([product.image, ...(product.images || [])]),
  ]);
  const [mainImageUrl, setMainImageUrl] = useState<string>(product.image);
  const [allImages, setAllImages] = useState<string[]>(initialImages.current);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // For color variant selection
  const [selectColor, setSelectColor] = useState<string[]>();
  const [selectSize, setSelectSize] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>(selectSize[0] || "");
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [rating, setRating] = useState();
  const { token } = useAuthStore();
  const [price, setPrice] = useState<number>(product.price);
  const [discount, setDiscount] = useState<number | null>(
    product.discount?.percentage || null
  );
  const [sold, setSold] = useState();
  const [variantId, setVariantId] = useState("");
  const [isActive, setIsActive] = useState();

  const [thumbnails, setThumbnails] = useState(
    allImages.filter((img) => img !== mainImageUrl)
  );

  // const thumbnails = allImages.filter((img) => img !== mainImageUrl);

  const [stock, setStock] = useState<number>(product.stock);

  const { quantity } = useQuantityStore();

  const { cart, addToCartItem, setCart } = useCartStore();

  // const addToCartItem = useCartStore((state) => state.addToCart);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const charLimit = 380;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const sizeCategory: any = product?.productVariantCategories?.find(
      (category: any) => category.name === "Size"
    );

    if (sizeCategory) {
      const sizes = sizeCategory.subCategories.map((sub: any) => sub.value);
      setSelectSize(sizes);
    }
  }, [product]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleImageClick = (img: string, index: number) => {
    if (img !== mainImageUrl) {
      setMainImageUrl(img);
      setCurrentImageIndex(index);
      setAllImages((prevImages) => {
        const newImages = new Set(prevImages);
        newImages.delete(img);
        newImages.add(mainImageUrl);
        return Array.from(newImages);
      });
    }
  };

  const handleColorSelect = (color: any) => {
    setSelectColor(color);

    const variant: any = variants.find(
      (v: any) =>
        v.subCategoryIds.some((sub: any) => sub.value === color) &&
        v.subCategoryIds.some((sub: any) => sub.value === selectedSize)
    );

    if (variant) {
      setVariantId(variant._id);
      setSelectedVariant(variant);
      setPrice(variant.price);
      setDiscount(variant.discount?.percentage || null);
      setStock(variant.stock);
      setMainImageUrl(variant.images[0]);
      setThumbnails(variant.images);
      setRating(variant.rating);
      setIsActive(variant.isActive);
    }
  };

  useEffect(() => {
    if (product._id !== null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [product._id]);

  const displayInitialImagesCount = (): string => {
    const length = initialImages.current.length;
    return length < 10 ? `0${length}` : length.toString();
  };

  const calculateDiscountedPrice = (price: number, discount: number | null) => {
    if (discount) {
      return price - (price * discount) / 100;
    }
    return price;
  };

  const discountedPrice = calculateDiscountedPrice(price, discount);

  const stockStatus = stock > 1 ? "In Stock" : "Stock Out";

  const handleWishCount = () => {
    // Implement wish count functionality here
  };

  const handleAddToCart = async () => {
    const cartItemId = uuidv4();

    if (token) {
      const cartData = variantId
        ? {
            productId: product._id,
            productVariantId: variantId,
            quantity: quantity,
          }
        : {
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
      const cartData = variantId
        ? {
            _id: cartItemId,
            product,
            productId: product._id,
            name: product.name,
            description: product.description,
            productVariantId: variantId,
            discount: discount,
            stock: stock,
            quantity: quantity,
            image: mainImageUrl,
            price: discountedPrice,
            rating: rating,
            sold: sold,
            isActive: isActive,
          }
        : {
            _id: cartItemId,
            product,
            productId: product._id,
            name: product.name,
            description: product.description,
            discount: product.discount?.percentage,
            stock: product.stock,
            quantity: quantity,
            image: product.image,
            price: discountedPrice,
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

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-[24px] lg:gap-[48px] xl:gap-[64px] recommend:gap-[72px] items-start md:items-center text-white">
      <div className="flex flex-col gap-[12px] lg:gap-4 w-full">
        <div className="flex md:hidden items-center gap-4 justify-start text-white text-sm font-[400] pb-[12px]">
          <Link href="/product">
            <ChevronLeft className="hover:opacity-75 cursor-pointer" />
          </Link>
          {isLoading ? (
            <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-sm leading-[16px]">{product?.category?.name}</p>
          )}
          {isLoading ? (
            <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-sm leading-[16px]">
              {product?.subcategory?.name}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-[10px]  md:hidden">
          {isLoading ? (
            <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-2xl lg:text-large font-interSemiBold text-center leading-[30px]">
              {product.name}
            </p>
          )}
          {isLoading ? (
            <Skeleton className="w-1/2 h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-sm leading-[20px]">
              Availability:&nbsp;
              <span className="text-[#2DB224]">In Stock</span>
            </p>
          )}
        </div>

        <div className="w-full relative">
          <div className="w-full md:h-[380px] xl:h-[426px] h-[180px] sm:h-[240px] bg-transparent">
            <motion.div
              key={mainImageUrl}
              variants={imageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.1 }}
              className="w-full h-full overflow-hidden"
            >
              <Image
                src={mainImageUrl}
                alt={product.name}
                fill
                className="w-full h-full rounded-[14px]"
              />
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute flex items-center top-[7px] md:top-auto md:-bottom-6 left-[7px] md:left-4 recommend:left-[30px] gap-[3px] sm:gap-[5px] md:gap-4 xl:gap-6 recommend:gap-[24px]"
            >
              {thumbnails.map((img, index) => (
                <motion.div
                  key={img}
                  className="w-[47px] md:w-[52px] md:h-[52px] xl:w-[72px] h-[47px] sm:h-[56px] sm:w-[56px] xl:h-[72px] border-2 lg:border-4 border-[#FFFFFF]/35 rounded-[2px] md:rounded-[3px]"
                  onClick={() => handleImageClick(img, index)}
                  variants={thumbnailVariants}
                >
                  <Image
                    src={img}
                    alt="MinProImg"
                    width={200}
                    height={100}
                    sizes="(max-width: 468px) 42px, 42px"
                    className="rounded-[3px] w-full h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={imageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute top-2 md:top-4 right-3 md:right-4 flex flex-col gap-4 z-10"
            >
              <div className="h-[72px] w-[72px] bg-[#FFFFFF]/5 rounded-[10px] hidden md:flex items-center justify-center font-interSemiBold text-2xl">
                <div className="flex items-end">
                  <div>
                    {currentImageIndex + 1 < 10
                      ? `0${currentImageIndex + 1}`
                      : currentImageIndex + 1}
                    /
                  </div>
                  <div className="text-sm pb-1">
                    {displayInitialImagesCount()}
                  </div>
                </div>
              </div>
              <div className="h-[46px] md:h-[72px] w-[47px] md:w-[72px] bg-[#FFFFFF]/5 rounded-[10px] flex items-center justify-center font-interSemiBold text-2xl">
                <div className="flex flex-col gap-1 items-center">
                  <FaRegHeart
                    className="w-4 h-4 md:h-5 md:w-5"
                    onClick={handleWishCount}
                  />
                  <p className="text-xs md:text-base font-[400]">
                    {wishCount.wishCount}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:gap-4 gap-3 items-start w-full">
        <div className="hidden md:flex items-center gap-4 text-sm font-[400]">
          <Link href="/product">
            <ChevronLeft className="hover:opacity-75 cursor-pointer" />
          </Link>
          {isLoading ? (
            <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-sm leading-[16px]">{product?.category?.name}</p>
          )}
          {isLoading ? (
            <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-sm leading-[16px]">
              {product?.subcategory?.name}
            </p>
          )}
        </div>
        <div className="hidden md:flex justify-between items-center w-full">
          {isLoading ? (
            <Skeleton className="w-1/2 h-7 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-lg xl:text-xl recommend:text-large font-interSemiBold">
              {product.name}
            </p>
          )}
          {isLoading ? (
            <Skeleton className="w-1/4 h-5 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-xxs lg:text-sm leading-[20px] hidden md:flex">
              Availability:&nbsp;
              <span
                className={`${
                  stockStatus === "In Stock" ? "text-[#2DB224]" : "text-red-500"
                }`}
              >
                {stockStatus}
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-y-3 xl:flex-row items-start xl:items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Use the variant price if available */}
            {isLoading ? (
              <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
            ) : (
              <p className="text-xl font-interSemiBold text-[#8640FF]">
                {cilunaPrice !== null &&
                  Math.floor(
                    discountedPrice / cilunaPrice / 1000
                  ).toLocaleString()}
                &nbsp;CILUNA
              </p>
            )}
            {isLoading ? (
              <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
            ) : (
              <p className="text-xl font-interSemiBold text-white">
                ${discountedPrice}
              </p>
            )}
            {/* {isLoading ? (
              <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
            ) : (
              <div className="flex items-end line-through decoration-1">
                <p className="text-xl font-[400] leading-[24px]">
                  {cilunaPrice !== null &&
                    Math.floor(price / cilunaPrice / 1000).toLocaleString()}
                  &nbsp;CILUNA
                </p>
                <p className="text-sm">
                  (${selectedVariant ? selectedVariant.price : product.price})
                </p>
              </div>
            )} */}
            {isLoading ? (
              <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
            ) : (
              <p className="text-sm font-interBold leading-[17px]">
                {discount}%&nbsp;off
              </p>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
          ) : (
            <div className="flex items-center gap-2">
              <Rating rating={product.rating || 0} />
              <span className="text-xs ml-2">{product.sold} Sold</span>
            </div>
          )}
        </div>
        <hr className="hidden md:block border-dashed text-white w-full" />
        <div className="flex flex-col gap-2 w-full">
          <p className="text-base font-interSemiBold leading-[19px]">
            Description:
          </p>
          {isLoading ? (
            <Skeleton className="w-full h-10 bg-[#FFFFFF]/10" />
          ) : (
            <p className="text-sm md:text-xs xl:text-sm leading-[24px] font-[100]">
              {isExpanded
                ? product.description
                : product?.description?.slice(0, charLimit)}
              {product.description &&
                product.description.length > charLimit &&
                !isExpanded &&
                " ..."}
              {product.description &&
                product.description.length > charLimit && (
                  <span
                    onClick={toggleExpand}
                    className="font-medium hover:underline ml-1 font-interSemiBold cursor-pointer"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </span>
                )}
            </p>
          )}
        </div>
        <div className="flex flex-row items-start justify-between gap-3 lg:gap-4 w-full">
          <div className="flex flex-col gap-3">
            <span className="text-base leading-[19px]">
              <span className="font-interSemiBold">Color:</span>&nbsp;
              {selectColor || "N/A"}
            </span>
            <div className="flex items-center gap-2 w-full">
              {product.productVariantCategories
                ?.find((category: any) => category.name === "Color")
                ?.subCategories.map((colorSubCategory: any) => (
                  <div
                    key={colorSubCategory._id}
                    onClick={() => handleColorSelect(colorSubCategory.value)}
                    className={`w-[27px] h-[27px] rounded-full cursor-pointer hover:opacity-90 `}
                    style={{ backgroundColor: colorSubCategory.value }}
                  />
                ))}
            </div>
          </div>
          <div className="block xl:hidden">
            <QuantitySelector
              initialQuantity={1}
              productId={product._id}
              isCartContext={false}
            />
          </div>
          <div className="hidden xl:block">
            <SizeSelector sizes={selectSize} onSizeSelect={handleSizeSelect} />
          </div>
        </div>
        <div className="block xl:hidden w-full">
          <SizeSelector sizes={selectSize} onSizeSelect={handleSizeSelect} />
        </div>
        <div className="flex flex-col lg:flex-row items-end justify-between gap-4 w-full">
          <div className="hidden xl:block w-full">
            <QuantitySelector
              initialQuantity={1}
              productId={product._id}
              isCartContext={false}
            />
          </div>
          <div className="flex items-center gap-4 w-full pt-2 xl:pt-0 justify-end">
            <Link href="/checkout" className="w-full md:w-[150px] xl:w-[182px]">
              <button className="w-full md:w-[150px] xl:w-[182px] bg-[#FFFFFF]/5 h-10 rounded-[10px] hover:bg-[#FFFFFF]/10 text-sm">
                Checkout Now
              </button>
            </Link>

            <Button
              className="w-full md:w-[150px] xl:w-[182px] bg-purple"
              onPress={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
