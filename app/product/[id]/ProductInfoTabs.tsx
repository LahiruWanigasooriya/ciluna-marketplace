"use client";
import { useState } from "react";
import ProductDetailsTab from "./ProductDetailsTab";
import Feedback from "./Feedback";
import CozyHat from "@/public/assets/product/Cozy Hat and Sofa Scene.svg";
import ManInBlue from "@/public/assets/product/Portrait of a Man in Blue.svg";
import GirlInHat from "@/public/assets/product/Mysterious Sunset Portrait.svg";
import SizingHat from "@/public/assets/product/image 1.svg";
import Image from "next/image";
import ShippingReturns from "@/components/custom/product/ShippingReturns";

interface ProductInfoTabsProps {
  productId: string;
  productVariantId: string;
  overview: {description: string; images: string[]}
}

export default function ProductInfoTabs({ productId, overview, productVariantId }: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState("Product Details");
  const tabs = ["Product Details", "Ratings & Reviews", "Shipping & Returns"];

  const renderContent = () =>
    ({
      "Product Details": <ProductDetailsTab productId={productId} overview={overview}/>,
      "Ratings & Reviews": <Feedback productId={productId} productVariantId={productVariantId}/>,
      "Shipping & Returns": <ShippingReturns/>,
    }[activeTab] || null);

  return (
    <div className="w-full overflow-hidden items-center">
      <div
        className={`flex gap-4 font-[Arial] transition-all duration-1000 ${
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
      <div className="md:mt-6 md:py-0">
        <>{renderContent()}</>
      </div>
    </div>
  );
}
