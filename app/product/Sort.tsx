"use client";

import { ChevronDown } from "lucide-react";
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
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Name: A to Z", value: "name_a_z" },
  { label: "Price: Z to A", value: "price_z_a" },
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
    <div className="relative w-full md:w-[300px]">
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
            <p className="cursor-pointer text-white leading-[19px] text-base">
              {sort}
            </p>
            <ChevronDown size={24} className="text-blue" />
          </div>
        </div>
      </div>
      {sortPopup && !disabled && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popupVariants}
          ref={modalRef}
          className="absolute w-[200px] md:w-[240px] flex flex-col top-8 left-0 bg-[#FFFFFF]/5 backdrop-blur-md py-4 z-20 text-white rounded-[10px] text-sm"
        >
          {sortOptions.map((option) => (
            <p
              key={option.value}
              className="hover:bg-[#FFFFFF]/10 px-4 leading-[26px] py-1 cursor-pointer"
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
