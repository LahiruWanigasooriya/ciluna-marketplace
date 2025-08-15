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
  const id = productId;

  const renderContent = () => {
    switch (activeTab) {
      case "Product Details":
        return <ProductDetailsTab productId={id} />;
      case "Ratings & Reviews":
        return <Feedback productId={id} />;
      case "Shipping & Returns":
        return <div>This is content for Shipping & Returns.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full mt-40 md:mt-20">
      <div className="font-[Arial] space-x-[16px] relative">
        {["Product Details", "Ratings & Reviews", "Shipping & Returns"].map(
          (tab) => (
            <div key={tab} className="relative inline-block">
              <button
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab ? "text-gray" : "text-grayNeutralFg"
                } px-[16px] py-[8px] font-bold text-[16px] md:text-[18px] leading-[24px]`}
              >
                {tab}
              </button>
              <div
                className={`h-[5px] w-[49px] mx-auto bg-gray rounded-t-[12px] ${
                  activeTab === tab ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              />
            </div>
          )
        )}
      </div>
      <div className="mt-5 md:mt-6 px-[16px] md:px-0">{renderContent()}</div>

      <div className="space-y-[16px] md:space-y-[20px] md:hidden px-[16px] md:px-0 mt-5 md:mt-6">
        <div className="h-[196px] md:aspect-[1248/713] w-full md:h-full">
          <img
            src={CozyHat.src}
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
  );
}
