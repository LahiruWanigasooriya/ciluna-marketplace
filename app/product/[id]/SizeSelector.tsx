import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SizeSelectorProps {
  sizes: string[];
  onSizeSelect?: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sizes[0]) {
      setSelectedSize(sizes[0]);
      if (onSizeSelect) {
        onSizeSelect(sizes[0]);
      }
    }
  }, [sizes, onSizeSelect]);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  const sizeVariant = {
    selected: {
      backgroundColor: "#4A55E2",
      color: "#ffffff",
      transition: { duration: 0.3 },
    },
    unselected: {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      color: "#ffffff",
      transition: { duration: 0.3 },
    },
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100, // adjust this value to scroll further or less
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 text-white w-full">
      <span className={`text-base ${sizes.length > 3 && 'md:pl-8'}`}>
        <span className="font-interSemiBold">Size:</span>&nbsp;{selectedSize}
      </span>
      <div className="flex items-center gap-2 w-full">
        {sizes.length > 3 && (
          <ChevronLeft
            onClick={handleScrollLeft}
            className="p-1 cursor-pointer hover:opacity-75"
          />
        )}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto w-full md:max-w-[326px] scrollbar-hide"
        >
          {sizes.map((size, index) => (
            <motion.div
              key={index}
              className="w-[101px] h-[40px] flex-shrink-0 bg-[#FFFFFF]/5 rounded-[10px] flex justify-center items-center text-sm cursor-pointer hover:opacity-75"
              onClick={() => handleSizeClick(size)}
              variants={sizeVariant}
              initial="unselected"
              animate={selectedSize === size ? "selected" : "unselected"}
            >
              {size}
            </motion.div>
          ))}
        </div>
        {sizes.length > 3 && (
          <ChevronRight
            onClick={handleScrollRight}
            className="p-1 cursor-pointer hover:opacity-75"
          />
        )}
      </div>
    </div>
  );
};

export default SizeSelector;
