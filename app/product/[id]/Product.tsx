"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import Rating from "../Ratings";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { Share2 } from "lucide-react";
import { CiCircleQuestion } from "react-icons/ci";
import {
  imageVariants,
  thumbnailVariants,
  containerVariants,
} from "@/utils/animations";
import { motion } from "framer-motion";
// import { ProductWishCountResponse } from "@/types/wishlist";
// import useQuantity from "@/hooks/useQuantity";
import { useCartStore } from "@/store/cart";
import { Skeleton } from "@/components/ui";
// import { ProductVariantCategory } from "@/types/productVariantCategory";
import { IProductVariant } from "@/types/productVariant";
import { useAuthStore } from "@/store/authStore";
import { addToCart, getCart, updateCartItem } from "@/actions/carts/cart";
import { useQuantityStore } from "@/store/quantity";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { UpdateCartItemParams } from "@/types/cart";
import {
  fetchExchangeRate,
  formatPrice,
  getDiscountedPrice,
} from "@/utils/getDiscountPrice";
import ProductImageSlider from "../ProductImageSlider";
import ColorSelector from "./ColorSelector";
import ProductInfoTabs from "./ProductInfoTabs";
import { ReviewSummary } from "@/types/review";
import BackButton from "@/components/custom/BackButton";
import AskQuestions from "./AskQuestions";
import useDisableScroll from "@/hooks/useDisableScroll";
import ShareLink from "./ShareLink";
interface ProductProps {
  product: IProduct;
  variants: IProductVariant;
  reviews?: ReviewSummary;
  availableCombinations: { color: string; size: string }[];
  // wishCount: ProductWishCountResponse;
  // cilunaPrice: number;
}

interface ColorOption {
  name: string;
  code: string;
}

const Product: React.FC<ProductProps> = ({
  product,
  variants,
  reviews,
  availableCombinations,
  // wishCount,
  // cilunaPrice,
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
  // const [selectColor, setSelectColor] = useState<string[]>([product.colorCode || ""]);
  const [selectColor, setSelectColor] = useState<ColorOption[]>(
    product.color && product.colorCode
      ? [{ name: product.color, code: product.colorCode }]
      : []
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    selectColor[0]?.name || ""
  );
  const [selectSize, setSelectSize] = useState<string[]>([product.size || ""]);

  console.log(product);

  const availableSizes = availableCombinations
    .filter((c) => c.color === selectedColor)
    .map((c) => c.size);

  const [selectedSize, setSelectedSize] = useState<string>(selectSize[0] || "");
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [rating, setRating] = useState();
  const { token } = useAuthStore();
  const [price, setPrice] = useState<number>(product.price);
  const [discount, setDiscount] = useState<number | null>(
    product.discount?.percentage || null
  );
  const [sold, setSold] = useState(product.sold);
  const [variantId, setVariantId] = useState("");
  const [isActive, setIsActive] = useState();

  const discountPrice = getDiscountedPrice(price, discount);
  const [usdPrices, setUsdPrices] = useState({
    original: "0.00",
    discounted: "0.00",
  });

  const [thumbnails, setThumbnails] = useState(
    allImages.filter((img) => img !== mainImageUrl)
  );

  // const thumbnails = allImages.filter((img) => img !== mainImageUrl);

  const [stock, setStock] = useState<number>(product.stock);

  const { quantity, setQuantity } = useQuantityStore();

  const { cart, addToCartItem, setCart, updateQuantity } = useCartStore();

  // const addToCartItem = useCartStore((state) => state.addToCart);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const charLimit = 300;

  const [isAskingQuestion, setIsAskingQuestion] = useState<boolean>(false);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [link, setLink] = useState("");

  useDisableScroll(isAskingQuestion);
  useDisableScroll(isShare);

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

    const colorCategory: any = product?.productVariantCategories?.find(
      (category: any) => category.name === "Color"
    );

    if (colorCategory) {
      const colors: ColorOption[] = colorCategory.subCategories.map(
        (sub: any) => ({name:sub.value, code: sub.subValue})
      );
      setSelectColor(colors);
    }
  }, [product]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);

    const variant: any = variants.find(
      (v: any) =>
        v.subCategoryIds.some((sub: any) => sub.value === size) &&
        v.subCategoryIds.some((sub: any) => sub.value === selectedColor)
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
    const fetchPrices = async () => {
      try {
        const rate = await fetchExchangeRate();
        const originalUSD = price / rate;
        const discountedUSD = getDiscountedPrice(price, discount || 0) / rate;

        setUsdPrices({
          original: formatPrice(originalUSD),
          discounted: formatPrice(discountedUSD),
        });
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
        setUsdPrices({
          original: formatPrice(price / 300),
          discounted: formatPrice(
            getDiscountedPrice(price, discount || 0) / 300
          ),
        });
      }
    };

    fetchPrices();
  }, [price, discount]);

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
    setSelectedColor(color);

    let variant: any

    if(selectedSize){
      variant = variants.find(
        (v: any) =>
          v.subCategoryIds.some((sub: any) => sub.value === color) &&
          v.subCategoryIds.some((sub: any) => sub.value === selectedSize)
      );
    }else{
      variant = variants.find(
        (v: any) =>
        v.subCategoryIds.some((sub: any) => sub.value === color)
      );
    }

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

  useEffect(() => {
    if (!availableSizes.includes(selectedSize) && availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, availableSizes, selectedSize]);

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
            color: selectedColor,
            size: selectedSize,
          }
        : {
            productId: product._id,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
          };

      console.log("cart data to add in prouct: ", cartData);

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
            priceUSD: usdPrices,
            rating: rating,
            sold: sold,
            isActive: isActive,
            color: selectedColor,
            size: selectedSize,
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
            priceUSD: usdPrices,
            sold: product.sold,
            rating: product.rating,
            isActive: product.isActive,
            color: selectedColor,
            size: selectedSize,
          };

      // Add to local storage (Zustand store)
      await addToCartItem(cartData);

      // Show success toast
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleQuantityUpdate = async (product: any, newQuantity: number) => {
    const cartItem = cart.find((item) => item.productId === product._id);
    setQuantity(newQuantity);

    if (!cartItem) {
      console.log("Product is not in cart yet");
      return;
    }
    const updateParams: UpdateCartItemParams = {
      itemId: cartItem._id, // Use cart item ID
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
      updateQuantity(cartItem._id, newQuantity); // Use itemId for local update
    }
  };

  const handleShare = () => {
    const currentLink = window.location.href;
    setLink(currentLink);
    setIsShare(true);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col px-4 md:px-8 lg:px-[68px] xl:px-[84px] recommend:px-[96px] max-w-[1440px] recommend:mx-auto mt-[74px] md:mt-[132px]">
        <div className="md:pb-6 flex">
          <BackButton to="/product" className="hidden sm:flex" text="Back"/>
        </div>
        <div className="flex flex-col md:flex-row font-arial justify-between gap-3 md:gap-[24px] lg:gap-[25px] items-start text-gray h-full">
          <div className="flex flex-col md:gap-[12px] lg:gap-4 w-full xl:w-auto">
            {/* images of the product */}
            <div className="">
              <div className="hidden xl:flex flex-row-reverse gap-6 min-w-[343px] md:h-[380px] xl:h-[426px] h-[353px] sm:h-[240px]">
                <motion.div
                  key={mainImageUrl}
                  variants={imageVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.1 }}
                  className="w-full h-full md:w-[506px] xl:h-[609px] overflow-hidden relative"
                >
                  <Image
                    src={mainImageUrl}
                    alt={product.name}
                    fill
                    className="w-full h-full rounded-[8px]"
                  />
                  <div className="absolute bottom-2 right-2">
                    {isLoading ? (
                      <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
                    ) : (
                      <>
                        {discount && (
                          <p className="text-sm font-arial hidden xl:block recommend:hidden leading-[17px] bg-gray text-white px-2 py-1 rounded-[8px]">
                            -{discount}%
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center gap-[3px] sm:gap-[5px] md:gap-4 xl:gap-4 xl:h-[609px]"
                >
                  {thumbnails.slice(0, 3).map((img, index) => (
                    <motion.div
                      key={img}
                      className="w-[47px] md:w-[52px] md:h-[52px] xl:w-[188px] h-[47px] sm:h-[56px] sm:w-[56px] xl:h-[193px] rounded-[2px] md:rounded-[3px] relative"
                      onClick={() => handleImageClick(img, index)}
                      variants={thumbnailVariants}
                    >
                      <Image
                        src={img}
                        alt="MinProImg"
                        fill
                        // width={200}
                        // height={100}
                        // sizes="(max-width: 468px) 42px, 42px"
                        // sizes="(max-width: 640px) 47px, (max-width: 768px) 56px, (max-width: 1024px) 52px, 188px"
                        className="rounded-[8px] w-full h-full"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="flex xl:hidden w-full relative">
                <ProductImageSlider
                  productImages={[mainImageUrl, ...thumbnails.slice(0, 3)]}
                />
                <div className="absolute bottom-[51px] md:bottom-2 right-2">
                  {isLoading ? (
                    <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
                  ) : (
                    <>
                      {discount && (
                        <p className="text-sm font-arial block recommend:hidden leading-[17px] bg-gray text-white px-2 py-1 rounded-[8px]">
                          -{discount}%
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* reviews and name in mobile */}
            <div className="flex flex-col items-start md:hidden mb-[12.5px]">
              {isLoading ? (
                <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
              ) : (
                <p className="text-sm leading-[20px] mb-1">
                  {product?.category?.name}
                </p>
              )}
              {isLoading ? (
                <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
              ) : (
                <p className="text-sm leading-[16px] mb-1">
                  {product?.subcategory?.name}
                </p>
              )}
              {isLoading ? (
                <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
              ) : (
                <p className="text-2xl lg:text-large font-arialBold text-center leading-[32px] mb-1">
                  {product.name}
                </p>
              )}
              {isLoading ? (
                <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
              ) : (
                <div className="flex items-center gap-2">
                  <Rating rating={reviews?.avgRating || 0} />
                  <span className="text-sm ml-2 text-[#707070]">
                    {" "}
                    {reviews?.totalReviews || 0} {reviews?.totalReviews === 1 ? 'Review' : 'Reviews'} | {sold}+ Sold
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col xl:h-[609px] justify-between items-start w-full">
            <div className="flex flex-col gap-3">
              <div className="hidden md:flex flex-col items-start gap-2 text-sm font-[400]">
                <div className="flex items-center gap-4 text-sm font-[400]">
                  {isLoading ? (
                    <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
                  ) : (
                    <p className="text-sm leading-[20px] text-gold-600">
                      {product?.category?.name}
                    </p>
                  )}
                  {isLoading ? (
                    <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
                  ) : (
                    <p className="text-sm leading-[16px]">
                      {product?.subcategory?.name}
                    </p>
                  )}
                </div>
                {isLoading ? (
                  <Skeleton className="w-1/2 h-7 bg-[#FFFFFF]/10" />
                ) : (
                  <p className="text-2xl recommend:text-[1.75rem] font-arialBold leading-[32px]">
                    {product.name}
                  </p>
                )}
                {isLoading ? (
                  <Skeleton className="w-1/3 h-5 bg-[#FFFFFF]/10" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Rating rating={reviews?.avgRating || 0} />
                    <span className="text-sm ml-2 text-[#707070]">
                      {" "}
                      {reviews?.totalReviews || 0} {reviews?.totalReviews === 1 ? 'Review' : 'Reviews'} | {sold}+ Sold
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-y-3 xl:flex-row items-start xl:items-center justify-between w-full">
                <div className="flex items-center gap-2 h-7">
                  {isLoading ? (
                    <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
                  ) : (
                    <div className="flex flex-col xl:flex-row xl:gap-2 gap-1">
                      <div className="flex gap-1 recommend:gap-2 h-6 recommend:h-7">
                        {discount ? (
                          <>
                            <p className="line-through flex items-center text-sm xl:text-xs recommend:text-sm tracking-tight md:tracking-normal leading-[20px] text-[#909090]">
                              {formatPrice(price)}{" "}
                              <span className="ml-[2px]">LKR</span>
                            </p>
                            <p className="text-lg recommend:text-xl text-[#252525] font-arialBold leading-[20px] md:leading-[24px]">
                              {formatPrice(discountPrice)}{" "}
                              <span className="ml-[2px]">LKR</span>
                            </p>
                          </>
                        ) : (
                          <p className="text-lg recommend:text-xl text-[#252525] font-arialBold leading-[20px] md:leading-[24px]">
                            {formatPrice(price)}{" "}
                            <span className="ml-[2px]">LKR</span>
                          </p>
                        )}
                      </div>
                      <span className="hidden xl:block">|</span>
                      <div className="flex gap-1 recommend:gap-2 h-6 recommend:h-7">
                        {discount ? (
                          <>
                            <p className="line-through flex items-center text-sm xl:text-xs recommend:text-sm tracking-tight md:tracking-normal leading-[20px] text-[#909090]">
                              {usdPrices.original}{" "}
                              <span className="ml-[2px]">USD</span>
                            </p>
                            <p className="text-lg recommend:text-xl text-[#252525] font-arialBold leading-[20px] md:leading-[24px]">
                              {usdPrices.discounted}{" "}
                              <span className="ml-[2px]">USD</span>
                            </p>
                          </>
                        ) : (
                          <p className="text-lg recommend:text-xl text-[#252525] font-arialBold leading-[20px] md:leading-[24px]">
                            {usdPrices.original}{" "}
                            <span className="ml-[2px]">USD</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {isLoading ? (
                    <Skeleton className="w-full h-5 bg-[#FFFFFF]/10" />
                  ) : (
                    <>
                      {discount && (
                        <p className="text-sm font-arial hidden recommend:block leading-[17px] bg-gray text-white px-2 py-1 rounded-[8px]">
                          -{discount}%
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {isLoading ? (
                  <Skeleton className="w-full h-10 bg-[#FFFFFF]/10" />
                ) : (
                  <div className="flex flex-col gap-4 mt-3 md:mt-0">
                    <p className="text-sm xl:text-[1rem] leading-[24px] font-[100]">
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
                    <div
                      onClick={() => setIsAskingQuestion(true)}
                      className="flex gap-2 items-center h-6 hover:opacity-70 cursor-pointer w-fit"
                    >
                      <CiCircleQuestion size={24} strokeWidth={0.5} />{" "}
                      <span className="text-sm">Ask Questions</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start justify-between gap-3 lg:gap-4 w-full">
                <div className="block xl:hidden mb-2">
                  <ColorSelector
                    colors={selectColor}
                    onColorSelect={handleColorSelect}
                  />
                </div>
                <div className="block xl:hidden mb-2">
                  <QuantitySelector
                    initialQuantity={1}
                    productId={product._id}
                    isCartContext={false}
                  />
                </div>
              </div>
              <div className="block xl:hidden w-full">
                <SizeSelector
                  sizes={selectSize}
                  selectedSize={selectedSize}
                  onSizeSelect={handleSizeSelect}
                  availableSizes={availableSizes}
                />
              </div>
              <div className="flex flex-col items-start justify-between gap-5 w-full">
                <div className="hidden xl:block">
                  <ColorSelector
                    colors={selectColor}
                    onColorSelect={handleColorSelect}
                  />
                </div>
                <div className="hidden xl:block">
                  <QuantitySelector
                    initialQuantity={1}
                    productId={product._id}
                    isCartContext={true}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityUpdate(product, newQuantity)
                    }
                  />
                </div>
                <div className="hidden xl:block">
                  <SizeSelector
                    sizes={selectSize}
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                    availableSizes={availableSizes}
                  />
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-3 w-full pt-2 xl:pt-0 justify-start">
              <Button
                className="w-full bg-gray text-white text-lg font-arial"
                size="extra-large"
                onPress={handleAddToCart}
              >
                Add To Cart
              </Button>
              <Link href="/cart" className="w-full">
                <Button
                  className="w-full bg-gray text-white text-lg font-arial"
                  size="extra-large"
                  onPress={handleAddToCart}
                >
                  Buy Now
                </Button>
              </Link>

              <button
                onClick={handleShare}
                className="border border-gray h-14 w-14 shrink-0 flex justify-center items-center rounded-[8px] hover:opacity-70"
              >
                <Share2 />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex xl:hidden items-center gap-3 w-full pt-4 xl:pt-0 justify-start">
          <Button
            className="w-full bg-gray text-white text-lg font-arial"
            size="extra-large"
            onPress={handleAddToCart}
          >
            Add To Cart
          </Button>
          <Link href="/cart" className="w-full">
            <Button
              className="w-full bg-gray text-white text-lg font-arial"
              size="extra-large"
              onPress={handleAddToCart}
            >
              Buy Now
            </Button>
          </Link>

          <button className="border border-gray h-14 w-14 shrink-0 flex justify-center items-center rounded-[8px] hover:opacity-70">
            <Share2 />
          </button>
        </div>
        <div className="pt-6 md:pt-16">
          <ProductInfoTabs
            productId={product._id}
            productVariantId={variantId}
            overview={product.overview || { description: "", images: [] }}
          />
        </div>
      </div>

      {isAskingQuestion && (
        <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
          <AskQuestions onClose={() => setIsAskingQuestion(false)} />
        </div>
      )}
      {isShare && (
        <div className="bg-black/50 backdrop-blur-sm fixed h-full w-full inset-0 z-30 flex justify-center items-center px-4">
          <ShareLink onClose={() => setIsShare(false)} link={link}/>
        </div>
      )}
    </div>
  );
};

export default Product;
