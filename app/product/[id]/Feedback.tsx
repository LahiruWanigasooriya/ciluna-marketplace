import React from "react";
import { getProductReviewSummary } from "@/actions/reviews/action";
import Rating from "../Ratings";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ThumbsUp } from "lucide-react";

interface ReviewData {
  avgRating?: number;
  totalReviews?: number;
  ratingCounts?: Record<number, number>;
}

const Feedback: React.FC<{ productId: string }> = async ({ productId }) => {
  const result = await getProductReviewSummary(productId);
  const reviewsData: ReviewData = result.data ?? {};
  const avgRating = reviewsData.avgRating ?? 0;

  return (
    <div className="flex flex-col xl:flex-row xl:justify-between gap-4 items-center">
      <div className="flex flex-col gap-3 w-full">
        <p className="text-base font-[700] text-white text-center md:text-start">
          Customers Feedback
        </p>
        <div className="flex flex-col xl:flex-row xl:items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 md:items-center md:gap-x-4 gap-y-4 w-full">
            <div className="col-span-1">
              <div className="border-[#6B709499] rounded-[0.888rem] h-[75px] md:h-[186px] bg-[#FFFFFF0D]/5 border-t-2 border-l-2 w-full py-8 px-4 flex flex-row md:flex-col items-center justify-center gap-6 md:gap-2">
                <p className="text-blue font-[700] text-5xl md:text-6xl">
                  {avgRating.toFixed(1)}
                </p>
                <div className="flex flex-col gap-2 items-center">
                  <Rating rating={avgRating} />
                  <p className="text-white text-sm font-[400]">
                    Product Rating
                  </p>
                </div>
              </div>
            </div>

            <div className="border-[#6B709499] col-span-3 rounded-[0.888rem] bg-[#FFFFFF0D]/5 border-t-2 border-l-2 p-4 h-[186px] w-full">
              <div className="flex flex-col gap-3">
                <ProgressBar value={100} />
                <ProgressBar value={80} />
                <ProgressBar value={60} />
                <ProgressBar value={40} />
                <ProgressBar value={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full text-white">
        <p className="text-base font-[700] text-center md:text-start">
          Reviews
        </p>
        <div className="border-[#6B709499] rounded-[0.888rem] bg-[#FFFFFF0D]/5 border-t-2 border-l-2 w-full py-4 px-4 flex flex-col gap-4 md:gap-3 h-[228px] md:h-[186px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-6">
              <p className="text-lg md:text-base font-[700]">Jony Jone</p>
              <p className="text-sm font-[500]">3 Days ago</p>
            </div>
            <Rating rating={5} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-[700]">Greate Product</p>
            <p className="text-sm font-[400]">
              This wireless mouse surpassed my expectations. Light and delicate,
              it suits my hand perfectly. Long battery life and smooth scrolling
              are great.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="cursor-pointer hover:opacity-75" size={20} />
            <p className="text-sm font-[400]">Link</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
