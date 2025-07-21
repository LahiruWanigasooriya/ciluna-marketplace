"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQDropdownProps {
  question: string;
  answer: string;
}

const FaqDropdown: React.FC<FAQDropdownProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className="border-t w-full bg-[#FFFFFF]/5 border-l border-solid border-[#6B709499] rounded-[4px] md:rounded-[14px] p-2 md:p-3 flex flex-row items-start justify-between cursor-pointer gap-6 md:gap-8 xl:gap-12 transition-all duration-300 ease-in-out hover:border-blue"
      onClick={toggle}
    >
      <div className="flex flex-col gap-4 w-full">
        <p className="text-sm md:text-base font-interSemiBold">{question}</p>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="origin-top"
            >
              <p className="text-xs md:text-sm font-inter leading-[20px]">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown
            size={20}
            className="text-[#4A55E2] cursor-pointer hover:opacity-75"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FaqDropdown;
