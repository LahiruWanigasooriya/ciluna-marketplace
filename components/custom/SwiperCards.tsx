"use client";
import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwiperCardsProps {
  products?: IProduct[];
  section?: {
    category: string;
    title: string;
    description: string;
  };
}

const SwiperCards = ({ products, section }: SwiperCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (
      containerRef.current &&
      containerRef.current.firstElementChild instanceof HTMLElement
    ) {
      const cardWidth = containerRef.current.firstElementChild.offsetWidth;
      containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (
      containerRef.current &&
      containerRef.current.firstElementChild instanceof HTMLElement
    ) {
      const cardWidth = containerRef.current.firstElementChild.offsetWidth;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-[27px] md:gap-[68px] max-w-[1440px] recommend:mx-auto">
        {section && (
          <div className="flex flex-col w-full">
            <p className="text-[12px] sm:text-[14px] font-cinzel text-[#C19F32] pb-1 md:pb-4 leading-5">
              {section.category}
            </p>
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] sm:text-[40px] lg:text-[52px] font-kaiseiBold text-gray-900 leading-8 md:leading-[60px]">
                {section.title}
              </h2>
              <div className="flex justify-between items-end h-5 lg:h-6 relative">
                <p className="text-[14px] sm:text-[16px] text-[#707070] font-inter leading-5 md:leading-6 -mt-3">
                  {section.description}
                </p>
                {/* desktop nav */}
                <div className="md:flex gap-[24px] absolute right-0 bottom-0 hidden">
                  <button
                    onClick={scrollPrev}
                    className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
                  >
                    <ChevronLeft
                      className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                      size={40}
                    />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
                  >
                    <ChevronRight
                      className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                      size={40}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <div
            ref={containerRef}
            className="flex overflow-x-hidden no-scrollbar gap-4 recommend:gap-[15px] w-full"
          >
            {products?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>

          {/* mobile nav */}
          <div className="flex gap-[16px] md:hidden mt-5 justify-center">
            <button
              onClick={scrollPrev}
              className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
            >
              <ChevronLeft
                className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                size={40}
              />
            </button>
            <button
              onClick={scrollNext}
              className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
            >
              <ChevronRight
                className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                size={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperCards;
