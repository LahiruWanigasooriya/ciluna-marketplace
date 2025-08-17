"use client";
import { useState } from "react";
import ProductDetailsTab from "./ProductDetailsTab";
import Feedback from "./Feedback";
import CozyHat from "@/public/assets/product/Cozy Hat and Sofa Scene.svg";
import ManInBlue from "@/public/assets/product/Portrait of a Man in Blue.svg";
import GirlInHat from "@/public/assets/product/Mysterious Sunset Portrait.svg";
import SizingHat from "@/public/assets/product/image 1.svg";
import Image from "next/image";

interface ProductInfoTabsProps {
  productId: string;
}

export default function ProductInfoTabs({ productId }: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState("Product Details");
  const tabs = ["Product Details", "Ratings & Reviews", "Shipping & Returns"];

  const renderContent = () =>
    ({
      "Product Details": <ProductDetailsTab productId={productId} />,
      "Ratings & Reviews": <Feedback productId={productId} />,
      "Shipping & Returns": <div>Shipping & Returns Content</div>,
    }[activeTab] || null);

  return (
    <div className="mt-32 w-full overflow-hidden items-center">
      <div
        className={`flex gap-4 font-[Arial] transition-all duration-1000 md:px-8 lg:px-[68px] xl:px-[84px] recommend:px-[96px] max-w-[1440px] recommend:mx-auto  ${
          activeTab === "Product Details"
            ? "justify-start"
            : activeTab === "Ratings & Reviews"
            ? "justify-center"
            : "justify-end"
        } md:justify-start`}
      >
        {tabs.map((tab) => (
          <div key={tab} className="relative">
            <button
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold text-[16px] whitespace-nowrap ${
                activeTab === tab ? "text-black" : "text-neutralGray-700"
              }`}
            >
              {tab}
            </button>
            <div
              className={`h-[5px] w-[49px] mx-auto bg-gray rounded-t-[12px] mt-2 ${
                activeTab === tab ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="md:mt-6 custom-container md:py-0">
        <>{renderContent()}</>
        <div
          className={`space-y-[16px] md:space-y-[20px] block md:px-0 mt-5 md:mt-6 ${
            activeTab === "Product Details" ? "block" : "md:hidden"
          }`}
        >
          <div className="h-[196px] md:aspect-[1248/713] w-full md:h-full">
            <Image
              src={CozyHat}
              alt="Celestial Drop Ring"
              className="w-full h-full object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full h-full space-y-[16px] md:space-y-0 md:space-x-[24px]">
            <div className="md:aspect-[612/1064] w-full h-[600px] md:h-full">
              <Image
                src={ManInBlue}
                alt="Image 1"
                className="w-full h-full object-cover object-center rounded-[6px]"
              />
            </div>
            <div className="md:aspect-[612/1064] w-full h-[600px] md:h-full">
              <Image
                src={GirlInHat}
                alt="Image 2"
                className="w-full h-full object-cover object-center rounded-[6px]"
              />
            </div>
          </div>
          <div className="md:aspect-[1248/774] w-full h-[212px] md:h-full">
            <Image
              src={SizingHat}
              alt="Image 3"
              className="w-full h-full md:object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
