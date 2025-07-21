import React from "react";
import { Camera } from "lucide-react";

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
    <label className="cursor-pointer">
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileInput}
        disabled={isDisabled}
      />
      <Camera size={30} className="text-blue cursor-pointer hover:scale-105" />
    </label>
  );
};
