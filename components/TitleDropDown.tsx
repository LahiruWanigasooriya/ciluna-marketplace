"use client"

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/utils/animations";

interface TitleLabel {
  name: string;
}

const titlelabels = [
  { name: "Mr" },
  { name: "Mrs" },
  { name: "Miss" },
  { name: "Dr" },
 
];

interface TitleLabelDropdownProps {
  value: string;
  onChange: (field: string, value: string) => void;
}

const TitleLabelDropdown: React.FC<TitleLabelDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleSelectTitleLabel = (titlelabel: TitleLabel) => {
    onChange("titlelabel", ` ${titlelabel.name}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col  gap-2 w-full">
      <p className="text-base leading-6  font-[400] font-arial text-black">Title*</p>
      <div ref={wrapperRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-center p-3 h-11 border border-[#e1e1e1] bg-[#ffffff] transition duration-200 ease-out rounded-lg 
          [&>[role=progressbar]]:mr-2.5
          [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
          [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
          [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
          group-disabled:opacity-50"
        >
          <input
            type="text"
            className="bg-white text-sm font-[400] leading-5 focus:outline-none text-black placeholder:text-sm placeholder:font-[400] placeholder-muted-fg w-full"
            placeholder="Select a title"
            value={searchTerm || value}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          />
          <ChevronDown className={`${isOpen ? "rotate-180" : ""} text-black !w-[18px] !h-[18px] min-w-[18px]`} />
        </div>
        {isOpen && (
          <AnimatePresence>
            <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={dropdownVariants}
              className="absolute top-14 left-0 w-full bg-[#ffffff] rounded-lg shadow-lg max-h-64 overflow-y-auto z-10   transition duration-200 ease-out flex flex-col items-start  
              [&>[role=progressbar]]:mr-2.5
              [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
              [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
              [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
              group-disabled:opacity-50"
            >
              {titlelabels
                .filter((titlelabel) =>
                  titlelabel.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((titlelabel) => (
                  <div
                    key={titlelabel.name}
                    className="flex items-center p-2 font-[400] text-sm  cursor-pointer hover:opacity-75 w-full hover:bg-stone-400"
                    onClick={() => handleSelectTitleLabel(titlelabel)}
                  >
                    {titlelabel.name}
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TitleLabelDropdown;