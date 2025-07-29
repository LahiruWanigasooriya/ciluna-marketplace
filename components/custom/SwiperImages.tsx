import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';


interface SwiperImagesProps {
  images: string[];
}

const SwiperImages: React.FC<SwiperImagesProps> = ({ images }) => {
  return (
    <div className="w-full max-w-[277px] mt-[24px] md:mt-0">
      <div className="rounded-xl overflow-hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-auto object-cover rounded-xl"
              />
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