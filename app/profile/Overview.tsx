import HeartIcon from "@/public/assets/profile/heart.svg";
import HeartRoundIcon from "@/public/assets/profile/heartround.svg";
import PurseIcon from "@/public/assets/profile/purse.svg";
import CouponIcon from "@/public/assets/profile/coupon.svg";
import ShopCartIcon from "@/public/assets/profile/shopcart.svg";
import TruckIcon from "@/public/assets/profile/truck.svg";
import WalletIcon from "@/public/assets/profile/wallet.svg";
import { FormValues } from "@/types/profile";
import User from "@/public/assets/user.jpeg";
import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import Product1 from "@/public/assets/product/product1.webp";
import Product2 from "@/public/assets/product/product2.webp";
import Product3 from "@/public/assets/product/product3.webp";
import Product4 from "@/public/assets/product/product4.webp";

import Product5 from "@/public/assets/product/product5.webp";
import Arrow from "@/public/assets/profile/arrow.svg";
import { useEffect, useRef, useState } from "react";

interface OverviewProps {
  userData?: FormValues;
}

// Corrected mock data to use the correct structure for the `category` field
const mockProducts: IProduct[] = [
  {
    _id: "1",
    name: "Product 1",
    price: 1000,
    discount: { percentage: 10 },
    image: Product5.src,
    colors: ["Red", "Blue"],
    color: "Red",
    colorCodes: ["#FF0000", "#0000FF"],
    description: "A beautiful product.",
    stock: 10,
    category: { _id: "cat1", name: "Category 1" },
    createdBy: "Admin",
  },
  {
    _id: "2",
    name: "Product 2",
    price: 2000,
    discount: { percentage: 20 },
    image: Product4.src,
    colors: ["Green", "Yellow"],
    color: "Green",
    colorCodes: ["#00FF00", "#FFFF00"],
    description: "Another amazing product.",
    stock: 5,
    category: { _id: "cat2", name: "Category 2" },
    createdBy: "Admin",
  },
  {
    _id: "3",
    name: "Product 3",
    price: 3000,
    discount: { percentage: 15 },
    image: Product3.src,
    colors: ["Black", "White"],
    color: "Black",
    colorCodes: ["#000000", "#FFFFFF"],
    description: "Yet another great product.",
    stock: 8,
    category: { _id: "cat3", name: "Category 3" },
    createdBy: "Admin",
  },
  {
    _id: "4",
    name: "Product 4",
    price: 3000,
    discount: { percentage: 15 },
    image: Product2.src,
    colors: ["Black", "White"],
    color: "Black",
    colorCodes: ["#000000", "#FFFFFF"],
    description: "Yet another great product.",
    stock: 8,
    category: { _id: "cat4", name: "Category 4" },
    createdBy: "Admin",
  },
  {
    _id: "5",
    name: "Product 5",
    price: 3000,
    discount: { percentage: 15 },
    image: Product1.src,
    colors: ["Black", "White"],
    color: "Black",
    colorCodes: ["#000000", "#FFFFFF"],
    description: "Yet another great product.",
    stock: 8,
    category: { _id: "cat5", name: "Category 5" },
    createdBy: "Admin",
  },
];

const Overview: React.FC<OverviewProps> = ({ userData }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      if (scrollWidth <= clientWidth) {
        setCanScrollLeft(false);
        setCanScrollRight(false);
        return;
      }

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateScrollButtons();
    };

    window.addEventListener("resize", handleResize);

    updateScrollButtons();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get profile image with fallback
  const profileImage = userData?.profileImage || User;

  // Get full name with fallback
  const fullName =
    userData?.firstName && userData?.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : userData?.nickName || "User";

  return (
    <>
      {/* Profile Card */}
      <section className="flex  flex-col items-center mb-[16px] rounded-xl bg-white px-[16px] py-[16px] border-custom  md:min-w-[530px] md:flex-row md:justify-between md:px-[24px]">
        <div className="flex items-center gap-[16px]">
          {" "}
          {/* Profile Image */}
          <img
            src={
              typeof profileImage === "string" ? profileImage : profileImage.src
            }
            alt="Profile"
            className="h-[52px] w-[52px] rounded-full object-cover"
          />
          {/* Name */}
          <div className="py-[14px]">
            <div className="font-kaiseiBold text-[16px]">{fullName}</div>
            <div className="font-lora text-[14px] lg:text-[14px]  md:text-[12px] lg:min-w-[200px] text-gray-400">
              Last login : Yesterday 11.39am
            </div>
          </div>
        </div>

        <div className="font-loraBold flex w-full max-w-[400px] justify-between px-[2px] text-center text-[16px] text-neutral-900 md:max-w-[800px] md:justify-end md:px-0">
          {/* Item 1 */}
          <div className="flex cursor-pointer hover:opacity-70 flex-col items-center gap-1 px-[10px] py-[16px] sm:px-[15px] md:px-[10px] lg:px-[20px] xl:px-[30px]">
            <img
              src={HeartIcon.src}
              alt="Heart"
              className="h-[24px] w-[24px]"
            />
            Wish List
          </div>

          {/* Divider */}
          <div className="mx-0 h-[80px] w-px bg-gray-200 self-center" />

          {/* Item 2 */}
          <div className="flex cursor-pointer hover:opacity-70 flex-col items-center gap-1 px-[10px] py-[16px] sm:px-[15px]  md:px-[10px] lg:px-[20px] xl:px-[30px]">
            <img
              src={WalletIcon.src}
              alt="Wallet"
              className="h-[24px] w-[24px]"
            />
            Ciluna Wallet
          </div>

          {/* Divider */}
          <div className="mx-0 h-[80px] w-px bg-gray-200 self-center" />

          {/* Item 3 */}
          <div className="flex cursor-pointer hover:opacity-70 flex-col items-center gap-1 px-[10px] py-[16px] sm:px-[15px]  md:px-[10px] lg:px-[20px] xl:px-[30px]">
            <img
              src={CouponIcon.src}
              alt="CouponIcon"
              className="h-[24px] w-[24px]"
            />
            Coupons
          </div>
        </div>
      </section>
      {/* Orders Card */}
      <section className="rounded-xl border-custom  bg-white px-[16px] text-[#1E1E1E]  md:px-[24px]">
        <div className="flex items-center justify-between border-b border-gray-200 py-[16px]">
          <div className="font-kaiseiBold text-[18px]">My Orders</div>
          <button className="font-lora cursor-pointer text-[16px] hover:underline">
            View All
          </button>
        </div>
        <div className="grid grid-cols-2  font-loraBold justify-between gap-y-[32px] divide-gray-200 py-[16px] text-center md:flex md:gap-y-0 md:divide-x ">
          <div className="flex-1 border-r flex justify-center border-gray-200 py-[14px]">
            <div className="max-w-[140px] hover:opacity-70 flex flex-col items-center justify-center">
              <span className="mb-1 flex cursor-pointer items-center justify-center">
                <img
                  src={PurseIcon.src}
                  alt="Purse"
                  className="w-[24px] h-[24px]"
                />
              </span>
              <div className="cursor-pointer  font-medium">Unpaid</div>
            </div>
          </div>

          <div className="flex-1 flex justify-center py-[14px]">
            <div className="max-w-[140px]  hover:opacity-70 flex flex-col items-center justify-center">
              <span className="mb-1 flex  cursor-pointer items-center justify-center">
                <img
                  src={ShopCartIcon.src}
                  alt="Cart"
                  className="w-[24px]  h-[24px]"
                />
              </span>
              <div className="cursor-pointer font-medium">To be Shipped</div>
            </div>
          </div>

          {/* Horizontal divider for mobile view only */}
          <div className="col-span-2 my-0.5 h-px w-full bg-gray-200 md:hidden"></div>

          <div className="flex-1 flex justify-center border-r border-gray-200 py-[14px]">
            <div className="max-w-[140px] hover:opacity-70 flex flex-col items-center justify-center">
              <span className="mb-1  flex items-center cursor-pointer   justify-center">
                <img
                  src={TruckIcon.src}
                  alt="Truck"
                  className="w-[24px] h-[24px]"
                />
              </span>
              <div className="cursor-pointer   font-medium ">Shipped</div>
            </div>
          </div>

          <div className="flex-1 flex justify-center py-[14px]">
            <div className="max-w-[140px] flex   hover:opacity-70 flex-col items-center justify-center">
              <span className="mb-1 flex items-center justify-center">
                <img
                  src={HeartRoundIcon.src}
                  alt="Round Heart"
                  className="w-[24px] h-[24px]"
                />
              </span>
              <div className="cursor-pointer font-medium">To be reviewed</div>
            </div>
          </div>
        </div>
      </section>
      {/* More to love */}
      <section className="flex flex-col mb-[158px] mt-[48px] gap-[12px] overflow-hidden">
        <div className="font-kaiseiBold text-[24px] text-[#252525] flex items-center justify-between">
          <div>
            <span className="hidden md:block">More to love</span>
            <span className="md:hidden">Recent Viewed</span>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`flex items-center justify-center w-8 h-8 rounded-[8px] bg-transparent border-[1px]  border-[#3D3D3D] ${
                !canScrollLeft ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <img
                src={Arrow.src}
                alt="Previous"
                className="w-4 rotate-180 h-4"
              />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`flex items-center justify-center w-8 h-8 rounded-[8px] bg-transparent border-[1px]  border-[#3D3D3D] ${
                !canScrollRight ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <img src={Arrow.src} alt="Next" className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-[16px] font-lora text-[#5D5D5D]">
          A fleeting collection of rare beauty.
        </div>
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="grid grid-cols-2 sm:flex sm:overflow-x-auto no-scrollbar gap-y-[32px] gap-x-[16px] sm:gap-[16px] md:gap-[24px] pt-[12px] w-full min-w-0"
        >
          {mockProducts.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Overview;
