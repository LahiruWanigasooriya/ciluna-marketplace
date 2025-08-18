"use client";
import React, { useEffect, useState } from "react";
import { getProductReviewSummary } from "@/actions/reviews/action";
import Review from "./Review";
import Comments from "./Comments";
import { Button } from "@/components/ui";
import Ratings from "@/components/custom/product/Ratings";
import { toast } from "sonner";

interface ReviewData {
  avgRating: number;
  totalReviews: number;
  ratingCounts: Record<number, number>;
}

interface ReviewSummaryResponse {
  success: boolean;
  data?: Partial<ReviewData>;
}

const dummyReviewData: ReviewData = {
  avgRating: 4.2,
  totalReviews: 52,
  ratingCounts: { 5: 87, 4: 66, 3: 47, 2: 27, 1: 5 },
};

const Feedback = ({ productId }: { productId: string }) => {
  const [reviewsData, setReviewsData] = useState<ReviewData>(dummyReviewData);
  const [addReviewPopup, setAddReviewPopup] = useState(false);
  const closePopup = () => {
    setAddReviewPopup(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ReviewSummaryResponse = await getProductReviewSummary(
          productId
        );
        if (
          result.success &&
          result.data &&
          typeof result.data.avgRating === "number" &&
          typeof result.data.totalReviews === "number" &&
          result.data.ratingCounts &&
          Object.keys(result.data.ratingCounts).length > 0
        ) {
          setReviewsData(dummyReviewData || result.data); // Use dummy data for now
        }
      } catch (error) {
        console.error("Error fetching review summary:", error);
        toast.error("Error fetching review summary");
        setReviewsData(dummyReviewData);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div className="px-4 md:px-0 text-gray font-[Arial]">
      <div className="flex flex-col md:flex-row md:items-center w-full gap-[16px]">
        <div className="w-full">
          <Ratings productId={productId} />
        </div>
        <Button
          appearance="normal"
          className="md:w-[200px] lg:w-[260px] md:h-[56px] rounded-[8px]"
          onPress={() => setAddReviewPopup(true)}
        >
          Write a review
        </Button>
      </div>
      {addReviewPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-fg/80 z-50">
          <Review productId={productId} closePopup={closePopup} />
        </div>
      )}
      <Comments productId={productId} />
    </div>
  );
};

export default Feedback;
