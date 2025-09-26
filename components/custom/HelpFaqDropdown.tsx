"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HelpFaqDropdownProps {
  question: string;
  answer: string;
  showBorder?: boolean;
}

const HelpFaqDropdown: React.FC<HelpFaqDropdownProps> = ({
  question,
  answer,
  showBorder = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className=" flex flex-col cursor-pointer transition-all duration-300 ease-in-out"
      onClick={toggle}
    >
      <div className="flex flex-row items-start justify-between  w-full">
        <div>
          <p className="text-[16px] leading-[24px] text-[#252525] font-arialBold">{question}</p>
        </div>
        <div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown
              size={24}
              className="text-[#252525] cursor-pointer hover:opacity-75"
            />
          </motion.div>
        </div>
      </div>
      <div className="">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="origin-top"
            >
              <p className="text-[14px] text-[#252525] font-arial leading-[20px] mb-[4px] mt-[12px]">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
       {showBorder && (   
        <div className="border-b border-b-[#E1E1E1] my-[16px]"></div>
      )}
    </div>
  );
};

export default HelpFaqDropdown;
