import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ColorOption {
  name: string;
  code: string;
}

interface ColorSelectorProps {
  //   colors: { value: string; code: string }[];
  colors: ColorOption[];
  onColorSelect?: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0] || "");

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
      onColorSelect?.(colors[0].name);
    }
  }, [colors]);

  const handleColorClick = (color: ColorOption) => {
    setSelectedColor(color);
    onColorSelect?.(color.name);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base">
        Colours:{" "}
        <span className="font-arialBold">{selectedColor.name || "N/A"}</span>
      </span>
      <div className="flex items-center gap-1">
        {colors.map(
          (color) =>
            color && (
              <motion.div
                key={color.code}
                onClick={() => handleColorClick(color)}
                className={`w-[22px] h-[22px] rounded-full cursor-pointer flex items-center justify-center`}
                animate={{
                  borderWidth: selectedColor === color ? 1 : 0,
                  borderColor:
                    selectedColor === color ? "#BEBEBE" : "transparent",
                  borderStyle: "solid",
                }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="w-[14px] h-[14px] rounded-full border"
                  style={{ backgroundColor: `${color.code}` }}
                />
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export default ColorSelector;
