"use client";
import React, { useState } from "react";
import Review from "./Review";
import Comments from "./Comments";
import { Button } from "@/components/ui";
import RatingsSummary from "./RatingsSummary";

const Feedback = ({ productId }: { productId: string }) => {
  const [addReviewPopup, setAddReviewPopup] = useState(false);
  const closePopup = () => {
    setAddReviewPopup(false);
  };

  return (
    <div className="px-4 md:px-0 text-gray font-[Arial]">
      <div className="flex flex-col md:flex-row md:items-center w-full gap-[16px]">
        <div className="w-full">
          <RatingsSummary productId={productId} />
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
