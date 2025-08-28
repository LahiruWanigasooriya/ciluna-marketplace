import React, { useState } from "react";

interface ColorDotProps {
  code: string;
  onClick: () => void;
}

const ColorDot = ({ code, onClick }: ColorDotProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className="w-[14px] h-[14px] rounded-full border hover:opacity-70 hover: cursor-pointer"
      style={{
        backgroundColor: code,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    />
  );
};

export { ColorDot };
