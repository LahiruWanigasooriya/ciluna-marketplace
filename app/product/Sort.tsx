"use client";

import { ArrowDownNarrowWide } from "lucide-react";
import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";
import { motion } from "framer-motion";
import { popupVariants } from "@/utils/animations";

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: SortOption[] = [
  { label: "Default Sorting", value: "default" },
  { label: "Newest First", value: "latest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Popularity", value: "popularity" },
  { label: "Best Sellers", value: "bestsellers" },
];

interface SortProps {
  disabled?: boolean;
}

const Sort: React.FC<SortProps> = ({ disabled = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [sortPopup, setSortPopup] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(
    sortOptions.find((opt) => opt.value === searchParams.get("sortBy"))
      ?.label || sortOptions[0].label
  );

  useClickOutside(modalRef, () => setSortPopup(false));

  const handleSort = () => {
    if (!disabled) setSortPopup(!sortPopup);
  };

  const handleSelect = (option: SortOption) => {
    if (disabled) return;
    setSort(option.label);
    setSortPopup(false);

    const currentParams = new URLSearchParams(searchParams.toString());
    if (option.value === "default") {
      currentParams.delete("sortBy");
    } else {
      currentParams.set("sortBy", option.value);
    }
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="relative w-full ">
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center">
          <p className="text-white leading-[19px] text-base">Sort by:</p>&nbsp;
          <div
          
            className={`flex items-center ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:opacity-75"
            }`}
            onClick={handleSort}
          >

            <ArrowDownNarrowWide size={24} className="text-black" />
          </div>
        </div>
      </div>
      {sortPopup && !disabled && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popupVariants}
          ref={modalRef}
          className="absolute w-[200px] md:w-[240px] flex flex-col top-8 right-0  bg-[#FFFFFF]/5 border-black border-2 backdrop-blur-md py-4 z-20 text-[#252525] rounded-[10px] text-sm"
        >
          {sortOptions.map((option) => (
          <p
            key={option.value}
            className={`px-4 leading-[26px] py-1 cursor-pointer 
              ${sort === option.label 
                ? "bg-[#FFFFFF]/20 font-medium text-black rounded-md"  
                : "hover:bg-[#FFFFFF]/10"
              }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </p>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Sort;
