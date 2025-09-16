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
          i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
        )}
      </div>

      {/* Review */}
      <p className="font-inter text-[14px] lg:text-[16px] text-[#5D5D5D] mb-[17px] leading-[24px]">
        {review}
      </p>
      <p className="font-interSemiBold text-[14px] lg:text-[16px] text-[#252525] leading-[24px]">{name}</p>

      {/* Divider */}
      <hr className="my-[16px] text-[#F5F5F5]" />

      {/* Product */}
      <div className="flex items-center gap-3">
        <Image src={productImage} alt={productName} width={56} height={56} />
        <p className="font-inter text-[14px] lg:text-[16px] text-[#252525]">
          {productName}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
