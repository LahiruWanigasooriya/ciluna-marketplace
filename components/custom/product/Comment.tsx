import React from "react";
import Image from "next/image";

interface ReviewComment {
  userName: string;
  profilePicture: string;
  content: string;
  timestamp: string;
  replies: ReviewComment[];
}

interface CommentProps {
  comment: ReviewComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 mt-[24px]">
          <Image
            src={comment.profilePicture}
            alt={comment.userName}
            className="w-[43px] h-[43px] rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-bold text-[14px] md:text-[16px]">
              {comment.userName}:
            </p>
            <p className="text-[14px] leading-5 text-neutralGray-700">
              {comment.timestamp}
            </p>
          </div>
        </div>
        <p className="text-[14px] md:text-[16px] leading-5 text-gray-800">
          {comment.content}
        </p>
      </div>
      {comment.replies.map((reply, replyIndex) => (
        <div key={replyIndex} className="flex">
          <div className="h-[80px] w-[2px] ml-[32px] md:ml-[64px] mr-4 bg-lightgray" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Image
                src={reply.profilePicture}
                alt={reply.userName}
                className="w-[43px] h-[43px] rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-bold text-[14px] md:text-[16px]">
                  {reply.userName}:
                </p>
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
  );
};

export default Comment;
