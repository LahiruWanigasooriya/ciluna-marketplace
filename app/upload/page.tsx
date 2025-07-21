"use client";

import { uploadImage } from "@/actions/utils/cloudinary";
import Image from "next/image"; // ✅ Use Next.js Image for optimization
import React, { useState } from "react";

const UploadImagePage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");
    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      if (!reader.result || typeof reader.result !== "string") {
        setIsLoading(false);
        return;
      }

      const uploadedUrl = await uploadImage(reader.result);
      if (uploadedUrl) {
        setUploadedUrl(uploadedUrl);
      } else {
        alert("Image upload failed.");
      }
      setIsLoading(false);
    };
  };

  const handleCopy = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-[#F9FAFB] rounded-2xl shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#1F2937]">Upload Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-[#374151] border border-[#D1D5DB] rounded-lg cursor-pointer bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
      />
      {preview && (
        <div className="mt-4 relative w-48 h-48">
          <Image
            src={preview}
            alt="Preview"
            layout="fill" // ✅ Automatically sizes image correctly
            objectFit="cover"
            className="rounded-lg shadow-md border border-[#E5E7EB]"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        className={`mt-4 px-6 py-2 text-white rounded-lg shadow ${
          isLoading
            ? "bg-[#9CA3AF] cursor-not-allowed"
            : "bg-[#3B82F6] hover:bg-[#2563EB]"
        } focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2`}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-sm text-[#4B5563] break-all">
            Uploaded Image URL:{" "}
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              {uploadedUrl}
            </a>
          </p>
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm text-white bg-[#3B82F6] rounded-lg shadow hover:bg-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
          >
            Copy URL
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImagePage;
