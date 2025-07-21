"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { addReview } from "@/actions/reviews/action";
import { toast } from "sonner";
import { reviewValidationSchema } from "@/schemas/validationSchemas";
import { ValidationError } from "yup";

interface RatingProps {
  initialRating?: number;
  productId: string;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
}

const Review: React.FC<RatingProps> = ({
  initialRating = 0,
  productId,
  onRatingChange,
  readOnly = false,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<{ title?: string; content?: string; rating?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const token = useAuthStore((state) => state.token);


  const handleStarClick = (newRating: number) => {
    if (!readOnly) {
      setRating(newRating);
      setErrors((prev) => ({ ...prev, rating: undefined }));
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setErrors((prev) => ({ ...prev, content: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!token) {
      toast.error("You must be logged in to submit a review");
      setIsSubmitting(false);
      return;
    }

    try {
      await reviewValidationSchema.validate({ title, content, rating }, { abortEarly: false });
      setErrors({});

      const response = await addReview({
        productId,
        rating,
        title,
        content,
        token,
      });

      setIsSubmitting(false);

      if (response.success) {
        setTitle("");
        setContent("");
        setRating(0);
        toast.success("Review submitted successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: { title?: string; content?: string; rating?: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof typeof newErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 xl:flex-row items-start xl:justify-between md:gap-4 gap-y-4 md:gap-y-0 w-full">
      <div className="col-span-1 md:col-span-2 w-full">
        <div className="flex text-white flex-col gap-6 xl:gap-8 p-4 justify-between border-[#6B709499] rounded-[0.888rem] bg-[#FFFFFF0D]/5 border-t-2 border-l-2 w-full">
          <p className="font-[700] text-lg text-center xl:text-start">Write a Review</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <p className="font-[400] text-base">What is it like to Product?</p>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#FFC41F] text-sm">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    size={15}
                    key={`star-${index}`}
                    onClick={() => handleStarClick(index + 1)}
                    className={`cursor-pointer ${readOnly ? "" : "hover:opacity-75"} ${rating > index ? "text-yellow-500" : "text-gray-400"}`}
                  />
                ))}
              </div>
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>
            <div>
              <TextField
                label="Review Title"
                className="custom-textfield"
                name="review"
                id="review"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <Textarea
                label="Review Content"
                className="custom-textfield"
                name="message"
                value={content}
                onChange={handleContentChange}
              />
              {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            </div>
            <Button type="submit" className="w-full bg-purple" isDisabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit review"}
            </Button>
          </form>
        </div>
      </div>
      <div className="col-span-3 text-white">
        <QuestionAndAnswer />
      </div>
    </div>
  );
};

export default Review;
