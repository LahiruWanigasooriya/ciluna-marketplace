"use client";
import React, { useEffect, useState } from "react";
import { getProductReviewSummary } from "@/actions/reviews/action";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FaStar } from "react-icons/fa6";
import Rating from "@/app/product/Ratings";
import { Skeleton } from "@/components/ui";

interface ReviewData {
  avgRating: number;
  totalReviews: number;
  ratingCounts: Record<number, number>;
}

interface RatingBarProps {
  ratingCounts: Record<number, number>;
}

const dummyReviewData: ReviewData = {
  avgRating: 4.2,
  totalReviews: 52,
  ratingCounts: { 5: 87, 4: 66, 3: 47, 2: 27, 1: 5 },
};

const RatingBars: React.FC<RatingBarProps> = ({ ratingCounts }) => {
  const ratings = [5, 4, 3, 2, 1];
  // const maxRatingCount = Math.max(...Object.values(ratingCounts));
  const maxRatingCount = ratingCounts && Object.keys(ratingCounts).length > 0 
  ? Math.max(...Object.values(ratingCounts)) 
  : 0;
  const maxWidthPercentage = 80; // Maximum width for the longest bar (adjust as needed)

  return (
    <div className="flex flex-col h-full justify-between w-full md:gap-[9px] md:max-w-[550px]">
      {ratings.map((rating) => {
        const ratingCount = ratingCounts[rating] || 0;
        const value =
          maxRatingCount === 0
            ? 0
            : (ratingCount / maxRatingCount) * maxWidthPercentage;

        return (
          <div key={rating} className="flex items-center gap-[4px] h-[20px]">
            <span className="w-4 text-center text-[14px] text-gray">
              {rating}
            </span>
            <FaStar className="text-[#E4A70A]" />
            <ProgressBar value={value} displayValue={`${ratingCount}`} />
          </div>
        );
      })}
    </div>
  );
};

const RatingsSummary = ({ productId }: { productId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewsData, setReviewsData] = useState<ReviewData>(dummyReviewData);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getProductReviewSummary(productId);
        const reviewsData: ReviewData = {
          avgRating: result.data?.avgRating ?? 0,
          totalReviews: result.data?.totalReviews ?? 0,
          ratingCounts: result.data?.ratingCounts ?? {},
        };
        // setReviewsData(dummyReviewData || reviewsData); //use dummy data temporarily
        setReviewsData(reviewsData); //use dummy data temporarily
      } catch (error) {
        console.error("Error fetching review summary:", error);
        setReviewsData(dummyReviewData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const { avgRating, totalReviews, ratingCounts } = reviewsData;

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton className="w-full h-[136px]" />
        </div>
      ) : (
        <div className="text-gray font-[Arial]">
          <div className="flex flex-col md:flex-row md:items-center w-full">
            <div className="flex flex-col md:flex-row md:items-center md:gap-x-4 gap-y-4 w-full">
              <div className="bg-lightgray rounded-[0.888rem] h-[148px] md:w-[142px] md:h-[136px] w-full py-8 px-4 flex flex-col items-center justify-center gap-2">
                <p className="text-gray font-[700] text-[40px] leading-[48px] md:text-[52px] md:leading-[62px]">
                  {avgRating.toFixed(1)}
                </p>
                <div className="flex flex-col gap-2 items-center">
                  <Rating rating={avgRating} />
                  <p className="text-sm font-[400]">{totalReviews} Reviews</p>
                </div>
              </div>
              <div className="h-full w-full flex flex-[883]">
                <RatingBars ratingCounts={ratingCounts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingsSummary;
