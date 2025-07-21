"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ProgressBar as ProgressBarPrimitive,
  ProgressBarProps as ProgressBarPrimitiveProps,
} from "react-aria-components";

import { Label } from "./field";
import { ctr } from "./primitive";
import { FaStar, FaRegStar } from "react-icons/fa";

// Extend the ProgressBarPrimitiveProps to include the optional label
interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  className,
  ...props
}) => {
  // Ensure a default value of 0 if props.value is undefined
  const value = props.value ?? 0;

  // Calculate the number of filled stars based on the value
  const filledStars = Math.floor(value / 20);
  const totalStars = 5; // Total number of stars

  // Generate star icons based on the calculated filled stars
  const stars = Array.from({ length: totalStars }, (_, i) =>
    i < filledStars ? (
      <FaStar className="text-[#FFC41F] w-[12.7px] h-[12.62px]" key={i} />
    ) : (
      <FaRegStar className="text-[#FFC41F]  w-[12.7px] h-[12.62px]" key={i} />
    )
  );

  return (
    <ProgressBarPrimitive
      {...props}
      value={value} 
      className={ctr(className, "grid grid-cols-5 md:grid-cols-3 w-full items-center gap-4")}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="relative h-[4.97px] w-full col-span-3 md:col-span-2 overflow-hidden rounded-full bg-secondary outline outline-1 -outline-offset-1 outline-transparent">
            {!isIndeterminate ? (
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-blue forced-colors:bg-[Highlight]"
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            ) : (
              <motion.div
                className="absolute top-0 h-full rounded-full bg-blue forced-colors:bg-[Highlight]"
                initial={{ left: "0%", width: "40%" }}
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-between gap-2 md:gap-1 w-full text-end">
              {label && <Label>{label}</Label>}
              <div className="flex items-center justify-end gap-1">{stars}</div>
              <div className="text-sm text-muted-fg tabular-nums text-white font-[200]">
                {valueText || `${value}%`}
              </div>
            </div>
          </div>
        </>
      )}
    </ProgressBarPrimitive>
  );
};

export { ProgressBar };
