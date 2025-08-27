"use client";

import React, { useRef, useState } from "react";
import { ListFilter, Settings2, Settings2Icon, SettingsIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";

interface FilterProps {
  colors?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
}

const FilterComponent: React.FC<FilterProps> = ({
  colors = ["Red", "Blue", "Green", "Black"],
  sizes = ["S", "M", "L", "XL"],
  minPrice = 0,
  maxPrice = 1000,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalData, setModalData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
  const [activeFilters, setActiveFilters] = useState<Record<string, string | number>>({
    color: "",
    size: "",
    minPrice: minPrice,
    maxPrice: maxPrice,
  });

  useClickOutside(modalRef, () => setSelectedCategory(null));

  const filterCategories = ["Color", "Size", "Price Range"];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    if (category === "Color") setModalData(colors);
    if (category === "Size") setModalData(sizes);
  };

  const handleSelect = (item: string) => {
    if (selectedCategory) {
      setActiveFilters((prev) => ({ ...prev, [selectedCategory.toLowerCase()]: item }));
      setSelectedCategory(null);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({ ...prev, [type]: value }));
    setActiveFilters((prev) => ({ ...prev, [type === "min" ? "minPrice" : "maxPrice"]: value }));
  };

  const removeFilter = (key: string) => {
    if (key === "minPrice") setPriceRange((prev) => ({ ...prev, min: minPrice }));
    if (key === "maxPrice") setPriceRange((prev) => ({ ...prev, max: maxPrice }));
    setActiveFilters((prev) => ({ ...prev, [key]: key.includes("Price") ? (key === "minPrice" ? minPrice : maxPrice) : "" }));
  };

  const clearAll = () => {
    setActiveFilters({ color: "", size: "", minPrice: minPrice, maxPrice: maxPrice });
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const filteredData = modalData.filter((i) =>
    i.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-fit">
   
      <div
        className="flex items-center justify-between gap-2 bg-[#FFFFFF]/5 rounded-[10px] cursor-pointer hover:bg-[#FFFFFF]/10 text-black px-4 h-[24px]"
        onClick={() => setSelectedCategory(selectedCategory ? null : "Filters")}
      >
       
       
        <Settings2 size={24} />
          <p className="text-[#252525] font-arial leading-[19px] text-base">Filter</p>&nbsp;
      </div>

      
         <div className="flex gap-2 mt-2 flex-wrap">
        {Object.entries(activeFilters)
          .filter(([_, v]) => v !== "" && v !== minPrice && v !== maxPrice)
          .map(([key, value]) => (
            <div key={key} className="flex items-center gap-1 px-2 py-1 bg-[#ffffff]/5 text-xs rounded">
              <span>{value}</span>
              <X className="cursor-pointer" size={14} onClick={() => removeFilter(key)} />
            </div>
          ))}

      </div>

   
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex justify-center items-start pt-20 bg-black/30 z-50"
        >
          <div
            ref={modalRef}
            className="flex flex-col backdrop-blur-md w-[340px] gap-2 rounded-[10px] z-20 border-black border-2  py-2 px-3 text-black max-h-[400px]"
            
          >
            
            {filterCategories.map((cat) => (
              <p
                key={cat}
                className="hover:bg-[#FFFFFF]/10 px-3 py-1 rounded-sm cursor-pointer"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </p>
            ))}

           
            {["Color", "Size"].includes(selectedCategory) && (
              <>
                <input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent w-full focus:outline-none text-black placeholder:text-xs text-xs  rounded px-2 py-1 mt-2"
                />
                <div className="max-h-[240px] overflow-y-scroll mt-2">
                  {filteredData.length === 0 ? (
                    <p className="text-black text-xs">No data found</p>
                  ) : (
                    filteredData.map((item, idx) => (
                      <p
                        key={idx}
                        className="hover:bg-[#FFFFFF]/5 px-3 py-1 rounded-sm cursor-pointer"
                        onClick={() => handleSelect(item)}
                      >
                        {item}
                      </p>
                    ))
                  )}
                </div>
              </>
            )}

           
            {selectedCategory === "Price Range" && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="w-1/2 border border-[#3f3f3f] rounded px-2 py-1 text-black"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                  />
                  <input
                    type="number"
                    className="w-1/2 border border-[#3f3f3f] rounded px-2 py-1 text-black"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                  />
                </div>
              </div>
            )}
       <button onClick={clearAll} className="text-xs underline px-2 py-1">
          Clear All
        </button>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default FilterComponent;
