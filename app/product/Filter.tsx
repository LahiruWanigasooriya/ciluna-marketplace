// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import {   ListFilter } from "lucide-react";
// import { motion } from "framer-motion";
// import { popupVariants } from "@/utils/animations";
// import useClickOutside from "@/hooks/useClickOutside";
// import { Skeleton } from "@/components/ui";
// import { useRouter, useSearchParams } from "next/navigation";

// interface FilterItem {
//   label: string;
//   data: string[];
// }

// interface BrandProps {
//   _id: string;
//   name: string;
//   logo?: string;
//   description?: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ModelProps {
//   _id: string;
//   name: string;
//   brand: string[];
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface FilterProps {
//   brands: BrandProps[];
//   modals: ModelProps[]; // Assuming "modals" should be "models"
// }

// const filterItems: FilterItem[] = [
//   { label: "Model", data: [] },
//   { label: "Brand", data: [] },
// ];

// const FilterComponent: React.FC<FilterProps> = ({ brands, modals }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const filterItemsClass =
//     "flex items-center justify-center gap-2 bg-[#FFFFFF]/5 rounded-[10px] cursor-pointer hover:bg-[#FFFFFF]/10 text-black px-[17px] h-[49px] text-sm leading-[20px]";
//   const [selectedItem, setSelectedItem] = useState<string | null>(null);
//   const [modalData, setModalData] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [searchQuery, setSearchQuery] = useState<string>("")
//   const [selectedModel, setSelectedModel] = useState<string | null>(
//     searchParams.get("model") || null
//   );
//   const [selectedBrand, setSelectedBrand] = useState<string | null>(
//     searchParams.get("brand") || null
//   );

//   useClickOutside(modalRef, () => setSelectedItem(null));

//   // Populate filter data
//   useEffect(() => {
//     const brandFilter = filterItems.find((item) => item.label === "Brand");
//     const modelFilter = filterItems.find((item) => item.label === "Model");

//     if (brandFilter && brands) {
//       brandFilter.data = ["None", ...brands.map((brand) => brand.name)];
//     }
//     if (modelFilter && modals) {
//       modelFilter.data = ["None", ...modals.map((modal) => modal.name)];
//     }
//   }, [brands, modals]);

//   useEffect(() => {
//     if (modalData.length > 0) {
//       setIsLoading(false);
//     }
//   }, [modalData]);

//   const handleItemClick = (item: FilterItem) => {
//     setSelectedItem(item.label);
//     setModalData(item.data);
//     setIsLoading(true);
//     setSearchQuery("")
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     const originalData =
//       selectedItem === "Brand"
//         ? ["None", ...brands.map((b) => b.name)]
//         : ["None", ...modals.map((m) => m.name)];
//     const filteredData = query
//       ? originalData.filter((item) =>
//           item.toLowerCase().includes(query.toLowerCase())
//         )
//       : originalData;
//     setModalData(filteredData);
//   };

//   const handleSelect = (item: string) => {
//     const currentParams = new URLSearchParams(searchParams.toString());

//     if (selectedItem === "Model") {
//       if (item === "None") {
//         setSelectedModel(null);
//         currentParams.delete("model");
//       } else {
//         setSelectedModel(item);
//         currentParams.set("model", item);
//       }
//     } else if (selectedItem === "Brand") {
//       if (item === "None") {
//         setSelectedBrand(null);
//         currentParams.delete("brand");
//       } else {
//         setSelectedBrand(item);
//         currentParams.set("brand", item);
//       }
//     }
//     setSelectedItem(null);

//     router.push(`?${currentParams.toString()}`);
//   };

//   const modalOverlay =
//     "fixed inset-0 flex justify-center items-center py-4 bg-fg/30 z-50";

//   return (
//     <div className="relative">
//       <div
//         id="filter-items-container"
//         className="flex items-center space-x-2 overflow-x-auto max-w-[370px] sm:max-w-[620px] scrollbar-hide md:max-w-full"
//       >
//         {filterItems.map((item, index) => (
//           <div
//             key={index}
//             className={filterItemsClass}
//             onClick={() => handleItemClick(item)}
//           >
//             <p>
//               {item.label === "Model" && selectedModel
//                 ? selectedModel
//                 : item.label === "Brand" && selectedBrand
//                 ? selectedBrand
//                 : item.label}
//             </p>
//             <div>
//               <ListFilter className="text-black" size={20} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedItem && (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={popupVariants}
//           className={modalOverlay}
//         >
//           <div
//             ref={modalRef}
//             className="flex flex-col backdrop-blur-md w-[340px] gap-2 rounded-[10px] z-20 border border-solid border-[#3f3f3f] py-2 px-3 text-black min-h-[200px] max-h-[400px]"
//           >
//             <div className="flex justify-center items-center rounded-[10px] bg-[#2d2d2d] px-3 py-2 min-w-fit border border-solid border-[#3f3f3f]">
//               <input
//                 placeholder="Search..."
//                 type="text"
//                 className="bg-transparent w-full focus:outline-none text-black placeholder:text-xs text-xs"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="text-xs max-h-[340px] overflow-y-scroll scrollbar-custom">
//               {isLoading ? (
//                 <Skeleton className="w-full h-5" />
//               ) : modalData.length === 0 ? (
//                 <p className="text-black text-xs">No data available</p>
//               ) : (
//                 modalData.map((item, index) => (
//                   <p
//                     key={index}
//                     className="hover:bg-[#FFFFFF]/10 px-3 py-1 rounded-sm leading-[26px] cursor-pointer"
//                     onClick={() => handleSelect(item)}
//                   >
//                     {item}
//                   </p>
//                 ))
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FilterComponent;
"use client";

import React, { useRef, useState } from "react";
import { ListFilter, X } from "lucide-react";
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
       
       
        <ListFilter size={24} />
      </div>

      
      {/* <div className="flex gap-2 mt-2 flex-wrap"> */}
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
