import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface SwiperCardsProps {
  products?: IProduct[];
}

export interface SwiperCardsHandle {
  scrollNext: () => void;
  scrollPrev: () => void;
}

const SwiperCards = forwardRef<SwiperCardsHandle, SwiperCardsProps>(
  ({ products }, ref) => {
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

    useImperativeHandle(ref, () => ({
      scrollNext,
      scrollPrev,
    }));

    return (
      <div className="flex flex-col items-center gap-4">
        <div
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar gap-4 recommend:gap-[15px] w-full"
        >
          {products?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    );
  }
);

export default SwiperCards;
