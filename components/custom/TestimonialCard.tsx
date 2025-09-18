import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

type TestimonialCardProps = {
  rating: number;
  review: string;
  name: string;
  productImage: StaticImageData;
  productName: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  review,
  name,
  productImage,
  productName,
}) => {
  return (
    <div className="bg-white rounded-xl p-[16px] md:p-[24px] w-full flex flex-col justify-between">
      {/* Stars */}
      <div className="flex gap-[8px] text-[#252525] mb-[12px]">
        {[...Array(5)].map((_, i) =>
          i < rating ? <FaStar key={i} size={18} /> : <FaRegStar key={i} size={18} />
        )}
      </div>

      {/* Review */}
      <p className="font-arial text-[14px] lg:text-[16px] text-[#5D5D5D] mb-[24px] sm:mb-[16px] leading-[20px] sm:leading-[24px]">
        {review}
      </p>
      <p className="font-arial text-[14px] lg:text-[16px] text-[#252525] leading-[20px] sm:leading-[24px]">{name}</p>

      {/* Divider */}
      <hr className="my-[16px] text-[#F5F5F5]" />

      {/* Product */}
      <div className="flex items-center gap-[16px]">
        <Image src={productImage} alt={productName} className="w-[56px] h-[56px]" />
        <p className="font-arial text-[14px] lg:text-[16px] text-[#252525] leading-[20px] sm:leading-[24px]">
          {productName}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
