"use client";
import React, { useState } from "react";
import { HiBarsArrowDown } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import User1 from "@/public/assets/product/Ellipse 10.svg";
import User2 from "@/public/assets/product/user2.svg";
import User3 from "@/public/assets/product/user3.svg";
import User5 from "@/public/assets/product/user5.svg";
import { Button } from "@/components/ui";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import Comment from "@/components/custom/product/Comment";

interface dummyComments {
  userName: string;
  profilePicture: string;
  content: string;
  timestamp: string;
  replies: dummyComments[];
}

const dummyComments = [
  {
    userName: "@LunaVibes",
    profilePicture: User1,
    content:
      "Absolutely obsessed with the sparkle on this! ✨ Does it look as magical in person?",
    timestamp: "3 days ago",
    replies: [
      {
        userName: "AvaMoonlight",
        profilePicture: User2,
        content:
          "Is it real silver or just plated? Want to make sure it won't tarnish quickly.",
        timestamp: "2 days ago",
        replies: [],
      },
    ],
  },
  {
    userName: "GemHunter87",
    profilePicture: User5,
    content:
      "Is it real silver or just plated? Want to make sure it won't tarnish quickly.",
    timestamp: "2 days ago",
    replies: [],
  },
  {
    userName: "AvaMoonlight",
    profilePicture: User3,
    content:
      "Got mine yesterday and haven’t taken it off since 💖 Super comfortable and just the right amount of shimmer.",
    timestamp: "2 days ago",
    replies: [],
  },
  {
    userName: "Habibi",
    profilePicture: User1,
    content:
      "Absolutely obsessed with the sparkle on this! ✨ Does it look as magical in person?",
    timestamp: "2 days ago",
    replies: [],
  },
];

const Comments = ({ productId }: { productId: string }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const handleToggleComments = () => {
    setShowAllComments((prev) => !prev);
  };

  return (
    <div className="text-gray font-[Arial] mt-[24px]">
      <div className="flex flex-col gap-[24px] items-center">
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-[16px]">
            <p className="text-[20px] leading-[24px] md:text-[28px] md:leading-[32px] font-[700] text-start w-full">
              05 Comments
            </p>
            <div className="flex items-center gap-[32px] justify-start w-full md:justify-end">
              <div className="flex">
                <HiBarsArrowDown className="w-[24px] h-[24px] mr-[8px]" />
                <div className="min-w-fit">Sort By</div>
              </div>
              <Button
                appearance="normal"
                className="w-[156px] md:w-[169px] h-[42px]  md:text-[16px] flex items-center justify-center rounded-[8px] md:h-[42px]"
              >
                Most Relevant
                <BsChevronDown className="inline text-gray ml-[10px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[0.5px] line-color mt-[24px]" />
      {showAllComments
        ? dummyComments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        : dummyComments
            .slice(0, 3)
            .map((comment, index) => <Comment key={index} comment={comment} />)}
      {dummyComments.length > 3 ? (
        <div className="flex justify-center border-b border-t border-neutralGray-50">
          <Button
            appearance="normal"
            onPress={handleToggleComments}
            className="w-full md:w-auto border-none"
          >
            {showAllComments ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
            {showAllComments ? "See Less Comments" : "See More Comments"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
