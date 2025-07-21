"use client";

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/utils/animations"; 

interface GenderDropdownProps {
  selectedGender?: string;
  onSelectGender: (gender: string) => void;
}

const GenderDropdown: React.FC<GenderDropdownProps> = ({
  selectedGender,
  onSelectGender,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const genderOptions = ["Male", "Female", "Other"];

  useClickOutside(modalRef, () => setIsOpen(false));

  return (
    <div className="flex flex-col gap-y-2.5 w-full">
      <p className="text-sm font-[400]">Gender</p>
      <div ref={modalRef} className="relative cursor-pointer">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center px-2 h-10 border rounded-lg bg-[#00031B] border-[#00031B] transition duration-200 ease-out focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/20"
        >
          <input
            type="text"
            className="bg-transparent text-sm font-[400] focus:outline-none text-white placeholder:text-sm placeholder:font-[400] placeholder-muted-fg"
            placeholder="Gender"
            value={selectedGender || ""}
            readOnly
          />
          <ChevronDown className={`${isOpen ? "rotate-180" : ""} text-blue`} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={dropdownVariants}
              className="absolute w-full top-14 bg-[#00031B] rounded-lg shadow-lg max-h-64 overflow-y-auto z-10 border border-[#00031B]  transition duration-200 ease-out flex flex-col items-start border-primary/70 ring-4 ring-primary/20
              group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20
              [&>[role=progressbar]]:mr-2.5
              [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
              [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
              [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
              group-disabled:opacity-50"
            >
              {genderOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 text-white text-sm font-[400] w-full hover:bg-gray-900 cursor-pointer"
                  onClick={() => {
                    onSelectGender(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GenderDropdown;
