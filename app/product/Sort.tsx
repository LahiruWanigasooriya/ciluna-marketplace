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
          
          <div
            className={`flex items-center ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:opacity-75"
            }`}
            onClick={handleSort}
          >
          <ArrowDownNarrowWide size={24} className="text-black" />
          <p className="text-[#252525] font-arial leading-[19px] text-base">Sort by</p>&nbsp;

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
          <button
            key={option.value}
            type="button"
            className={`w-full text-left px-4 leading-[26px] py-1 cursor-pointer 
              ${sort === option.label 
                ? "bg-slate-400 font-medium text-black " 
                : "hover:bg-slate-600"
              }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Sort;