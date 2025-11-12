import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/app/(shop)/product/ProductCard";
import { IProduct } from "@/types/product";
import { cn } from "../ui/primitive";

interface SwiperImagesProps {
  images?: string[];
  products?: IProduct[];
}

const SwiperImages: React.FC<SwiperImagesProps> = ({ images, products }) => {
  const productsBreakpoints = {
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1920: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  };

  const imagesBreakpoints = {
    375: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };
  return (
    <div
      className={cn("w-full mt-[24px] md:mt-0", images && "sm:max-w-[277px]")}
    >
      <div className="rounded-xl overflow-hidden">
        <Swiper
          modules={[Pagination,Autoplay]}
          speed={1000}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          breakpoints={products ? productsBreakpoints : imagesBreakpoints}
        >
          {images &&
            images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-[217px] sm:h-auto object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}

          {products &&
            products.map((product: IProduct, index) => (
              <SwiperSlide key={index}>
                <ProductCard key={product._id} product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Custom pagination container */}
      <div className="custom-pagination mt-4"></div>

      <style>{`
        .custom-pagination {
          display: flex;
          justify-content: center;
          margin-top: 16px; /* Adjust spacing below the image */
        }
        .custom-bullet {
          width: 24px;
          height: 4px;
          background-color: #e5e7eb; /* gray-200 */
          border-radius: 4px;
          margin: 0 4px;
          transition: all 0.3s;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          background-color: #111827; /* gray-900 */
          width: 28px;
        }
      `}</style>
    </div>
  );
};

export default SwiperImages;
