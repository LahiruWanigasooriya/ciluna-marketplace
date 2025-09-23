"use client";
import React, { useEffect, useState } from "react";
import Review from "./Review";
import Comments from "./Comments";
import { Button } from "@/components/ui";
import RatingsSummary from "./RatingsSummary";

const Feedback = ({ productId, productVariantId }: { productId: string, productVariantId:string }) => {
  const [addReviewPopup, setAddReviewPopup] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const closePopup = () => {
    setAddReviewPopup(false);
  };

   const handleNewReview = () => {
    setRefreshFlag(prev => !prev); // toggle flag to trigger refetch
  };

  return (
    <div className="text-gray font-[Arial]">
      <div className="flex flex-col md:flex-row md:items-center w-full gap-[16px]">
        <div className="w-full">
          <RatingsSummary productId={productId} refreshFlag={refreshFlag}/>
        </div>
        <Button
          appearance="normal"
          className="md:w-[215px] h-[56px] rounded-[8px] !text-lg"
          onPress={() => setAddReviewPopup(true)}
        >
          Write a review
        </Button>
      </div>
      {addReviewPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-fg/80 z-50">
          <Review productId={productId} closePopup={closePopup} onReviewSubmit={handleNewReview}/>
        </div>
      )}
      <Comments productId={productId} refreshFlag={refreshFlag}/>
    </div>
  );
};

export default Feedback;
