"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiBarsArrowDown } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import User1 from "@/public/assets/product/Ellipse 10.svg";
import User2 from "@/public/assets/product/user2.svg";
import User3 from "@/public/assets/product/user3.svg";
import User5 from "@/public/assets/product/user5.svg";
import { Button, Skeleton } from "@/components/ui";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { getProductReviews } from "@/actions/reviews/action";
import { formatTimeAgo } from "@/utils/formatTime";
//import Comment from "@/components/custom/product/Comment";
//import Rating from "../Ratings";

interface CommentData {
  user: { name: string; profilePicture?: string };
  profilePicture: string;
  content: string;
  rating: number;
  timestamp: string;
  replies: CommentData[];
}

const dummyComments: CommentData[] = [
  {
    user: { name: "@LunaVibes" },
    profilePicture: User1,
    content:
      "Absolutely obsessed with the sparkle on this! ✨ Does it look as magical in person?",
    rating: 5,
    timestamp: "3 days ago",
    replies: [
      {
        user: { name: "AvaMoonlight" },
        profilePicture: User2,
        content:
          "Is it real silver or just plated? Want to make sure it won't tarnish quickly.",
        rating: 4,
        timestamp: "2 days ago",
        replies: [],
      },
    ],
  },
  {
    user: { name: "GemHunter87" },
    profilePicture: User5,
    content:
      "Is it real silver or just plated? Want to make sure it won't tarnish quickly.",
    rating: 4,
    timestamp: "2 days ago",
    replies: [],
  },
  {
    user: { name: "AvaMoonlight" },
    profilePicture: User3,
    content:
      "Got mine yesterday and haven’t taken it off since 💖 Super comfortable and just the right amount of shimmer.",
    rating: 5,
    timestamp: "2 days ago",
    replies: [],
  },
  {
    user: { name: "Habibi" },
    profilePicture: User1,
    content:
      "Absolutely obsessed with the sparkle on this! ✨ Does it look as magical in person?",
    rating: 5,
    timestamp: "2 days ago",
    replies: [],
  },
];

const Comments = ({
  productId,
  productVariantId,
}: {
  productId: string;
  productVariantId?: string;
}) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getProductReviews(productId, productVariantId);
      const transformedData =
        result.data?.reviews?.map((review: any) => ({
          user: { name: review.user?.name || "Anonymous" },
          profilePicture: review.user?.profileImage || User5,
          content: review.content,
          rating: review.rating,
          // timestamp: review.createdAt || "Just now",
          timestamp: formatTimeAgo(review.createdAt),
          replies: [],
        })) || [];
      setCommentsData(transformedData);
      // setCommentsData(transformedData);
      setIsLoading(false);
    };

    fetchData();
  }, [productId, productVariantId]);

  const handleToggleComments = () => {
    setShowAllComments((prev) => !prev);
  };

  const displayedComments = showAllComments
    ? commentsData
    : commentsData.slice(0, 3);

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton className="w-full h-[136px] my-5" />
        </div>
      ) : (
        <div className="text-gray font-[Arial] mt-[24px]">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-[16px]">
            <p className="text-[20px] leading-[24px] md:text-[28px] md:leading-[32px] font-[700] text-start w-full">
              {(commentsData.length + commentsData.reduce((acc, comment) => acc + comment.replies.length, 0))
                .toString()
                .padStart(2, "0")}{" "}
              Comments
            </p>
            <div className="flex items-center gap-[32px] justify-start w-full md:justify-end">
              <div className="flex">
                <HiBarsArrowDown className="w-[24px] h-[24px] mr-[8px]" />
                <div className="min-w-fit">Sort By</div>
              </div>
              <Button
                appearance="normal"
                className="w-[156px] md:w-[169px] h-[42px] md:text-[16px] flex items-center justify-center rounded-[8px] md:h-[42px]"
              >
                Most Relevant
                <BsChevronDown className="inline text-gray ml-[10px]" />
              </Button>
            </div>
          </div>

          <div className="h-[0.5px] line-color mt-[24px]" />

          {displayedComments.map((comment, index) => (
            <div
              key={`comment-${comment.user.name}-${index}`}
              className="w-full space-y-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 mt-[24px]">
                  <Image
                    src={
                      typeof comment.profilePicture === "string"
                        ? comment.profilePicture
                        : (comment.profilePicture as any)
                    }
                    alt={`${comment.user.name}'s profile picture`}
                    width={43}
                    height={43}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[14px] md:text-[16px]">
                        {comment.user.name}
                      </p>
                      {/* <Rating rating={comment.rating} /> */}
                    </div>
                    <p className="text-[14px] leading-5 text-gray-600">
                      {comment.timestamp}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] md:text-[16px] leading-5 text-gray-800">
                  {comment.content}
                </p>
              </div>
              {comment.replies.map((reply, replyIndex) => (
                <div
                  key={`reply-${reply.user.name}-${replyIndex}`}
                  className="flex"
                >
                  <div className="h-[80px] w-[2px] ml-[32px] md:ml-[64px] mr-4 bg-lightgray" />
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <Image
                        // src={reply.profilePicture}
                        src={
                          typeof reply.profilePicture === "string"
                            ? reply.profilePicture
                            : (reply.profilePicture as any)
                        }
                        alt={`${reply.user.name}'s profile picture`}
                        width={43}
                        height={43}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[14px] md:text-[16px]">
                            Replied {reply.user.name}:
                          </p>
                          {/* <Rating rating={reply.rating} /> */}
                        </div>
                        <p className="text-[14px] leading-5 text-gray-600">
                          {reply.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] md:text-[16px] leading-5 text-gray-800">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
              <div className="h-[1px] bg-lightgray" />
            </div>
          ))}

          {commentsData.length > 3 && (
            <div className="flex justify-center border-b border-t border-neutralGray-50">
              <Button
                appearance="normal"
                onPress={handleToggleComments}
                className="w-full md:w-auto border-none"
              >
                {showAllComments ? (
                  <IoIosArrowDropup />
                ) : (
                  <IoIosArrowDropdown />
                )}
                {showAllComments ? "See Less Comments" : "See More Comments"}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(Comments);
