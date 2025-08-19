import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 


  // return (
  //   <div className="flex items-center gap-1 text-neutralGray-100 text-sm ">
  //     {[...Array(fullStars)].map((_: any, index: any) => (
  //       <FaStar className="w-3 h-3 text-[#E4A70A]" key={index} /> 
  //     ))}
  //     {hasHalfStar && <FaStarHalfAlt className="w-3 h-3" />} 
  //     {[...Array(emptyStars)].map((_, index) => (
  //       <FaStar className="w-3 h-3 text-neutralGray-100" key={index} /> 
  //     ))}
  //     <span className="text-gray font-arialBold">{rating}</span>
  //   </div>
  // );
  return (
  <div className="flex items-center gap-1 text-neutralGray-100 text-sm ">
    {Array.from({ length: Math.max(0, Number(fullStars) || 0) }).map((_, index) => (
      <FaStar className="w-3 h-3 text-[#E4A70A]" key={index} /> 
    ))}
    {hasHalfStar && <FaStarHalfAlt className="w-3 h-3" />} 
    {Array.from({ length: Math.max(0, Number(emptyStars) || 0) }).map((_, index) => (
      <FaStar className="w-3 h-3 text-neutralGray-100" key={index} /> 
    ))}
    <span className="text-gray font-arialBold">{rating}</span>
  </div>
);
};

export default Rating;
