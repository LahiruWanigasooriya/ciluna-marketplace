"use client";
import { useState } from "react";
import ProductDetailsTab from "./ProductDetailsTab";

export default function ProductInfoTabs() {
  const [activeTab, setActiveTab] = useState("Product Details");

  const renderContent = () => {
    switch (activeTab) {
      case "Product Details":
        return <ProductDetailsTab />;
      case "Ratings & Reviews":
        return <div>This is content for Ratings & Reviews.</div>;
      case "Shipping & Returns":
        return <div>This is content for Shipping & Returns.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="font-[Arial] space-x-[16px] relative">
        {["Product Details", "Ratings & Reviews", "Shipping & Returns"].map(
          (tab) => (
            <div key={tab} className="relative inline-block">
              <button
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab ? "text-gray" : "text-grayNeutralFg"
                } px-[16px] py-[8px] font-bold text-[18px] leading-[24px]`}
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
      <div className="">{renderContent()}</div>
    </div>
  );
}
