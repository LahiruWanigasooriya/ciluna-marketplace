import React from "react";
import { Input } from "react-aria-components";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import fb from "@/public/assets/product/fb.webp";
import instagram from "@/public/assets/product/instagram.webp";
import twitter from "@/public/assets/product/twitter.webp";
import whatsapp from "@/public/assets/product/whatsapp.webp";
import Image from "next/image";

interface SharaLinkProps {
  link: string;
  onClose: () => void;
}

const socialIcons = [fb, instagram, twitter, whatsapp];

const ShareLink: React.FC<SharaLinkProps> = ({ link, onClose }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };
  return (
    <div className="bg-white w-full px-4 py-6 md:p-6 rounded-lg max-w-[655px] flex flex-col relative gap-6 md:gap-8 text-gray">
      <div className="absolute top-0 right-0 p-2 z-10">
        <CircleX
          fill="#ffffff"
          color="#252525"
          strokeWidth={2}
          className="cursor-pointer h-5 w-5 hover:opacity-70"
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-arialBold">Copy Link</h2>
        <div className="flex gap-[10px]">
          <Input
            type="text"
            readOnly
            value={link}
            className="border border-gray-300 rounded-[0.5rem] px-3 py-2 w-full text-sm"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCopy}
              className="px-4 md:px-[29px] py-[10px] bg-blue-500 text-white bg-gray rounded-[0.5rem] hover:opacity-90"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Share</h1>
        <div className="flex gap-4">
          {socialIcons.map((icon, index) => (
            <div className="w-[52px] h-[52px] relative hover:opacity-70 cursor-pointer">
              <Image
                alt="option"
                src={icon.src}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="/placeholder-image.jpg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareLink;
