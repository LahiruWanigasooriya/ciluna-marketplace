"use client";
import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwiperCardsProps {
  products?: IProduct[];
  className?: string;
  titleClassName?: string;
  section?: {
    category?: string;
    title: string;
    description: string;
  };
}

const SwiperCards = ({ products, className, titleClassName, section }: SwiperCardsProps) => {
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
      <div className={cn("flex flex-col gap-[27px] md:gap-[68px] max-w-[1440px] recommend:mx-auto", className)}>
        {section && (
          <div className="flex flex-col w-full">
            <p className="text-[12px] sm:text-[14px] text-center md:text-left font-cinzel text-[#C19F32] pb-0 md:pb-4 leading-5">
              {section.category}
            </p>
            <div className="flex flex-col gap-3">
              <h2 className={cn("text-[24px] sm:text-[40px] lg:text-[52px] text-center md:text-left font-kaiseiBold text-gray-900 leading-8 md:leading-[60px]", titleClassName)}>
                {section.title}
              </h2>
              <div className="hidden md:flex items-end w-full justify-between ">
                <p className="text-[14px] sm:text-[16px] text-left text-[#707070] font-inter leading-5 md:leading-6">
                  {section.description}
                </p>
                <div className="flex items-start gap-[24px]">
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
              {/* Mobile description */}
              <p className="text-[14px] sm:text-[16px] text-center md:hidden text-[#707070] font-inter leading-5 md:leading-6">
                {section.description}
              </p>
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
