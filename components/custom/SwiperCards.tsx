"use client";
import ProductCard from "@/app/(shop)/product/ProductCard";
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
    if (containerRef.current) {
      const isMobile = window.innerWidth < 640; // sm breakpoint is 640px
      
      if (isMobile) {
        // For mobile: find the mobile container and scroll by its width (full 2x2 grid)
        const mobileContainer = containerRef.current.querySelector('.sm\\:hidden');
        if (mobileContainer) {
          const containerWidth = mobileContainer.scrollWidth / Math.ceil((products?.length || 0) / 4);
          mobileContainer.scrollBy({ left: containerWidth, behavior: "smooth" });
        }
      } else {
        // For larger screens: scroll by one card width
        const desktopContainer = containerRef.current.querySelector('.hidden.sm\\:flex');
        if (desktopContainer && desktopContainer.firstElementChild instanceof HTMLElement) {
          const cardWidth = desktopContainer.firstElementChild.offsetWidth;
          desktopContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const isMobile = window.innerWidth < 640; // sm breakpoint is 640px
      
      if (isMobile) {
        // For mobile: find the mobile container and scroll by its width (full 2x2 grid)
        const mobileContainer = containerRef.current.querySelector('.sm\\:hidden');
        if (mobileContainer) {
          const containerWidth = mobileContainer.scrollWidth / Math.ceil((products?.length || 0) / 4);
          mobileContainer.scrollBy({ left: -containerWidth, behavior: "smooth" });
        }
      } else {
        // For larger screens: scroll by one card width
        const desktopContainer = containerRef.current.querySelector('.hidden.sm\\:flex');
        if (desktopContainer && desktopContainer.firstElementChild instanceof HTMLElement) {
          const cardWidth = desktopContainer.firstElementChild.offsetWidth;
          desktopContainer.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className={cn("flex flex-col gap-[27px] md:gap-[68px] max-w-[1440px] recommend:mx-auto", className)}>
        {section && (
          <div className="flex flex-col w-full">
            <p className="text-[12px] sm:text-[14px] text-center sm:text-left text-[#C19F32] pb-0 md:pb-4 font-kaiseiBold leading-[20px] tracking-[0.2em] uppercase">
              {section.category}
            </p>
            <div className="flex flex-col gap-0">
              <h2
                className={cn(
                  "text-[24px] sm:text-[40px] lg:text-[52px] text-center sm:text-left font-kaiseiBold text-gray-900 leading-8 sm:leading-[60px] text-[#252525]",
                  titleClassName
                )}
              >
                {section.title}
              </h2>
              <div className="hidden sm:flex items-end w-full justify-between ">
                <p className="text-[14px] sm:text-[16px] text-left text-[#707070] font-arial leading-5 sm:leading-6">
                  {section.description}
                </p>
                <div className="flex items-start gap-[24px]">
                  <button
                    onClick={scrollPrev}
                    className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
                  >
                    <ChevronLeft
                      className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                      size={44}
                    />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="bg-gray-300 rounded-[8px] border border-[#3D3D3D] hover:border-[#B4B4B4]"
                  >
                    <ChevronRight
                      className="text-[#3D3D3D] hover:text-[#B4B4B4] p-[10px]"
                      size={44}
                    />
                  </button>
                </div>
              </div>
              {/* Mobile description */}
              <p className="text-[14px] sm:text-[16px] text-center sm:hidden text-[#707070] font-inter leading-5 md:leading-6">
                {section.description}
              </p>
            </div>
          </div>
        )}

        <div className="relative">
          <div
            ref={containerRef}
            className="sm:flex overflow-x-hidden no-scrollbar gap-x-4 recommend:gap-[15px] w-full"
          >
            {/* swiper in mobile view */}
            <div className="sm:hidden flex overflow-x-auto no-scrollbar w-full">
              {products &&
                Array.from(
                  { length: Math.ceil(products.length / 4) },
                  (_, pageIndex) => (
                    <div
                      key={pageIndex}
                      className="grid grid-cols-2 grid-rows-2 gap-y-5 gap-x-4 min-w-full h-fit"
                    >
                      {products
                        .slice(pageIndex * 4, (pageIndex + 1) * 4)
                        .map((product, index) => (
                          <ProductCard
                            product={product}
                            key={pageIndex * 4 + index}
                          />
                        ))}
                    </div>
                  )
                )}
            </div>

            {/* swiper in desktop view */}
            <div className="hidden sm:flex overflow-x-auto no-scrollbar gap-4 recommend:gap-6 w-full">
              {products?.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          </div>

          {/* mobile nav */}
          <div className="flex gap-[16px] sm:hidden mt-5 justify-center">
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
