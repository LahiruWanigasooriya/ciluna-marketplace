"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useRef } from "react";
import { IoIosCloseCircleOutline, IoIosStar } from "react-icons/io";
import { GrCloudUpload } from "react-icons/gr";
import { addReview } from "@/actions/reviews/action";
import { toast } from "sonner";
import { reviewValidationSchema } from "@/schemas/validationSchemas";
import { ValidationError } from "yup";
import useDisableScroll from "@/hooks/useDisableScroll";

interface RatingProps {
  initialRating?: number;
  productId: string;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  closePopup: () => void;
}

const Review: React.FC<RatingProps> = ({
  initialRating = 0,
  productId,
  onRatingChange,
  readOnly = false,
  closePopup,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    rating?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for hidden file input
  const { token, isAuthenticated } = useAuthStore();
  const handleStarClick = (newRating: number) => {
    if (!readOnly) {
      setRating(newRating);
      setErrors((prev) => ({ ...prev, rating: undefined }));
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setErrors((prev) => ({ ...prev, content: undefined }));
  };

  const handleImagesUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      const totalImages = uploadedImages.length + newImages.length;

      if (totalImages > 3) {
        toast.error("You can upload a maximum of 3 images.");
        return;
      }

      const oversizedFiles = newImages.filter(
        (file) => file.size > 5 * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        toast.error("Each file must be less than 5MB.");
        return;
      }

      setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isAuthenticated) {
      toast.error("You must be logged in to submit a review");
      setIsSubmitting(false);
      return;
    }

    try {
      await reviewValidationSchema.validate(
        { title, content, rating },
        { abortEarly: false }
      );
      setErrors({});

      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("rating", rating.toString());
      formData.append("title", title);
      formData.append("content", content);
      uploadedImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      const response = await addReview({
        productId,
        rating,
        title,
        content,
        token: token ?? undefined,
      });
      setIsSubmitting(false);

      if (response.success) {
        setTitle("");
        setContent("");
        setRating(0);
        setUploadedImages([]);
        toast.success("Review submitted successfully");
        closePopup();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: { title?: string; content?: string; rating?: string } =
          {};
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
  useDisableScroll(true);
  return (
    <div className="flex text-black flex-col rounded-[8px] w-full md:w-[600px] pt-[28px] p-[16px] mx-[16px] md:mx-0 md:p-[24px] bg-white backdrop-blur-2xl relative z-100">
      <IoIosCloseCircleOutline
        className="w-[20px] h-[20px] absolute top-0 right-0 m-[8px] cursor-pointer"
        onClick={closePopup}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full pt-[16px]"
      >
        <div className="flex flex-col">
          <div className="flex md:flex md:flex-col justify-between">
            <p className="text-[16px] leading-6 md:text-xl lg:text-[24px] text-left md:leading-8 font-bold md:mb-4">
              Rate your experience
            </p>
            <div className="flex items-center gap-[2px] md:gap-1 text-[#FFC41F] text-sm">
              {[...Array(5)].map((_, index) => (
                <IoIosStar
                  key={`star-${index}`}
                  onClick={() => handleStarClick(index + 1)}
                  className={`cursor-pointer items-center h-5 w-5 md:w-[30px] md:h-[30px] ${
                    readOnly ? "" : "hover:opacity-75"
                  } ${rating > index ? "text-yellow-500" : "text-neutral-300"}`}
                />
              ))}
            </div>
          </div>

          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
          )}
        </div>
        <div>
          <p className="text-[16px] leading-6 pb-[8px] text-left">Message*</p>
          <Textarea
            className="border border-neutral-100"
            name="message"
            value={content}
            placeholder="Type your message here..."
            onChange={handleContentChange}
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content}</p>
          )}
        </div>
        <p className="text-[16px] leading-6 text-left">Add Images</p>
        <div className="w-full h-[140px] flex items-center justify-center flex-col text-center relative overflow-y-auto">
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {uploadedImages.length === 0 ? (
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="1"
                strokeDasharray="8,8"
              />
            ) : null}
          </svg>
          {uploadedImages.length === 0 ? (
            <div
              onClick={handleImagesUploadClick}
              className="flex flex-col cursor-pointer items-center"
            >
              <GrCloudUpload className="text-gray-500 text-2xl transform -scale-x-100" />
              <p className="text-gray-700 text-sm mt-3 mb-2">
                Drag your file(s) or <span className="font-bold">browse</span>
              </p>
              <p className="text-gray-500 text-neutralGray-600">
                Maximum of 3 images, 5 MB per file.
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-wrap gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-[120px] h-[120px] object-cover rounded-[8px]"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center m-[4px]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-[16px] mt-[16px]">
          <Button
            type="button"
            className="w-full h-[56px] bg-white text-black text-lg leading-6"
            onPress={() => {
              setTitle("");
              setContent("");
              setRating(0);
              setErrors({});
              setUploadedImages([]);
              closePopup();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full h-[56px] bg-black text-white text-lg leading-6"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit review"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Review;
