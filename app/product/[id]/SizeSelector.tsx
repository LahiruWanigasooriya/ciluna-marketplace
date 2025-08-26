import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

interface SizeSelectorProps {
  sizes: string[];
  onSizeSelect?: (size: string) => void;
}

const sizeDisplayMap: Record<string, string> = {
  Small: "S",
  Medium: "M",
  Large: "L",
  Xlarge: "XL",
};
const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[1]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (sizes[0]) {
  //     setSelectedSize(sizes[0]);
  //     if (onSizeSelect) {
  //       onSizeSelect(sizes[0]);
  //     }
  //   }
  // }, [sizes, onSizeSelect]);

  useEffect(() => {
    if (sizes.length > 0) {
      setSelectedSize(sizes[0]);
      onSizeSelect?.(sizes[0]);
    }
  }, []); // use the previous use effect in case of dynamic size changes

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  const sizeVariant = {
    selected: {
      backgroundColor: "#252525",
      color: "#ffffff",
      transition: { duration: 0.3 },
    },
    // unselected: {
    //   backgroundColor: "rgba(255, 255, 255, 0.03)",
    //   color: "#ffffff",
    //   transition: { duration: 0.3 },
    // },
    unselected: {
      backgroundColor: "#ffffff", // for testing
      color: "#252525",
      transition: { duration: 0.3 },
      border: "1px solid #252525",
      borderRadius: "8px",
    },
  };

  // const handleScrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({
  //       left: -100, // adjust this value to scroll further or less
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const handleScrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({
  //       left: 100,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <div className="flex flex-col gap-2 text-gray w-full">
      {/* <span className={`text-base ${sizes.length > 3 && "md:pl-8"}`}> */}
      <span className="text-base">
        <span className="font-arial">Size:</span>&nbsp;
        <span className="font-arialBold ">{selectedSize || "N/A"}</span>
      </span>
      <div className="flex items-center gap-2 w-full">
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto w-full md:max-w-[326px] scrollbar-hide"
        >
          {sizes.map(
            (size, index) =>
              size && (
                <motion.div
                  key={index}
                  className="w-[40px] h-[40px] flex-shrink-0 bg-[#FFFFFF]/5 rounded-[10px] flex justify-center items-center cursor-pointer hover:opacity-75"
                  onClick={() => handleSizeClick(size)}
                  variants={sizeVariant}
                  initial="unselected"
                  animate={selectedSize === size ? "selected" : "unselected"}
                >
                  {sizeDisplayMap[size]}
                </motion.div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default SizeSelector;
