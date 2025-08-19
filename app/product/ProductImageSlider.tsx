"use client";
import Image from "next/image";

import { useState } from "react";
import type { StaticImageData } from "next/image";

interface ProductImageSliderProps {
    productImages: string[] | StaticImageData[],
}

const ProductImageSlider: React.FC <ProductImageSliderProps> = ({productImages}) => {
  const [currentImg, setCurrentImg] = useState<number>(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImg(index);
  };

  return (
    <div
      className="relative w-full h-[372px] sm:h-[500px] md:h-[451px] overflow-hidden flex flex-col justify-center rounded-[8px]"
    >
      {/* Background Image */}
      <div className="relative w-full h-full">
        {productImages.map((img, index) => {
          const imgSrc = img;
          return (
            <Image
              key={index}
              src={imgSrc}
              alt="product image"
              fill
              className={` object-cover w-full h-full lg:object-center absolute rounded-[8px] transition-opacity duration-700 ease-in-out md:h-screen  ${
                index === currentImg ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}
      </div>

      <div className="static md:absolute bottom-0 flex justify-center w-full z-10 md:p-[8px] xl:pb-[32px] custom-container items-center">
        <div className="flex flex-col gap-[16px] md:gap-[12px] lg:gap-[24px] md:max-w-[495px] md:w-[80%] justify-center items-center w-full">
          {/* Mobile Thumbnail Indicators */}
          <div className="xl:hidden flex gap-[8px] items-center justify-center mb-[9px]">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`h-[2px] w-[16px] rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentImg
                    ? " bg-gray"
                    : " bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageSlider;
