import React from "react";
import { CiImageOn } from "react-icons/ci";

interface FileTriggerProps {
  onFileChange: (file: File) => void;
  isDisabled?: boolean;
}

export const FileTrigger: React.FC<FileTriggerProps> = ({
  onFileChange,
  isDisabled = false,
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onFileChange(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  return (
    <label className="cursor-pointer flex items-center">
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileInput}
        disabled={isDisabled}
      />
      <CiImageOn
        size={24}
        className="text-black cursor-pointer stroke-[0.7px]"
      />
      <div className="ml-2">Upload Image</div>
    </label>
  );
};
