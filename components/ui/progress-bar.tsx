"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ProgressBar as ProgressBarPrimitive,
  ProgressBarProps as ProgressBarPrimitiveProps,
} from "react-aria-components";

import { ctr } from "./primitive";

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string;
  displayValue?: string;
  totalReviews?: number; // Optional, for displaying total reviews
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  displayValue,
  className,
  ...props
}) => {
  const value = props.value ?? 0;

  return (
    <ProgressBarPrimitive
      {...props}
      value={value}
      className={ctr(className, "flex items-center w-full h-[20px]")}
    >
      {({ percentage, valueText, isIndeterminate }) => {
        const cleanValueText = valueText?.replace("%", "");

        return (
          <>
            <div className="flex-1 bg-gray-200 h-[20px] relative">
              {!isIndeterminate ? (
                <div className="flex items-center w-full h-[20px]">
                  <motion.div
                    className="h-[6px] flex items-center bg-gray rounded-[4px]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  ></motion.div>
                  <div className="ml-[4px] text-sm text-[#333333] md:text-gray">
                    {displayValue || cleanValueText}
                  </div>
                </div>
              ) : (
                <motion.div
                  className="h-[6px] flex items-center bg-gray rounded-[4px]"
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
          </>
        );
      }}
    </ProgressBarPrimitive>
  );
};

export { ProgressBar };