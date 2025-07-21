import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 


  return (
    <div className="flex items-center gap-1 text-[#FFC41F] text-sm ">
      {[...Array(fullStars)].map((_: any, index: any) => (
        <FaStar className="w-3 h-3" key={index} /> 
      ))}
      {hasHalfStar && <FaStarHalfAlt className="w-3 h-3" />} 
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar className="w-3 h-3" key={index} /> 
      ))}
    </div>
  );
};

export default Rating;
