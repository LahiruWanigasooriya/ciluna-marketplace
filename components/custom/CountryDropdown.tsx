"use client"

import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/utils/animations";

interface Country {
  name: string;
}

const countries = [
  { name: "United States" },
  { name: "United Kingdom" },
  { name: "Canada" },
  { name: "Australia" },
  { name: "Austria" },
  { name: "Belgium" },
  { name: "Brazil" },
  { name: "China" },
  { name: "Denmark" },
  { name: "France" },
  { name: "Germany" },
  { name: "India" },
  { name: "Italy" },
  { name: "Japan" },
  { name: "Mexico" },
  { name: "Netherlands" },
  { name: "New Zealand" },
  { name: "Norway" },
  { name: "Russia" },
  { name: "South Africa" },
  { name: "South Korea" },
  { name: "Spain" },
  { name: "Sweden" },
  { name: "Switzerland" },
  { name: "Argentina" },
  { name: "Colombia" },
  { name: "Egypt" },
  { name: "Finland" },
  { name: "Greece" },
  { name: "Indonesia" },
  { name: "Malaysia" },
  { name: "Nigeria" },
  { name: "Pakistan" },
  { name: "Philippines" },
  { name: "Poland" },
  { name: "Portugal" },
  { name: "Saudi Arabia" },
  { name: "Singapore" },
  { name: "Sri Lanka" },
  { name: "Thailand" },
  { name: "Turkey" },
  { name: "United Arab Emirates" },
  { name: "Vietnam" },
];

interface CountryDropdownProps {
  value: string;
  onChange: (field: string, value: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleSelectCountry = (country: Country) => {
    onChange("country", ` ${country.name}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col  gap-y-[8px] w-full">
      <p className="text-sm font-[400] font-arial text-black">Country*</p>
      <div ref={wrapperRef} className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-center px-2 h-10 border border-[#e1e1e1] bg-[#ffffff] transition duration-200 ease-out rounded-lg focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/20
          group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20
          [&>[role=progressbar]]:mr-2.5
          [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
          [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
          [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
          group-disabled:opacity-50"
        >
          <input
            type="text"
            className="bg-white text-sm font-[400] focus:outline-none text-black placeholder:text-sm placeholder:font-[400] placeholder-muted-fg w-full"
            placeholder="Select a country"
            value={searchTerm || value}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          />
          <ChevronDown className={`${isOpen ? "rotate-180" : ""} text-black`} />
        </div>
        {isOpen && (
          <AnimatePresence>
            <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={dropdownVariants}
              className="absolute top-14 left-0 w-full bg-[#ffffff] rounded-lg shadow-lg max-h-64 overflow-y-auto z-10 border border-[#252525]  transition duration-200 ease-out flex flex-col items-start border-primary/70 ring-4 ring-primary/20
              group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20
              [&>[role=progressbar]]:mr-2.5
              [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
              [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
              [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
              group-disabled:opacity-50"
            >
              {countries
                .filter((country) =>
                  country.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((country) => (
                  <div
                    key={country.name}
                    className="px-3 py-2 text-black hover:bg-gray-500 w-full flex items-center text-sm font-[400]"
                    onClick={() => handleSelectCountry(country)}
                  >
                    {country.name}
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default CountryDropdown;
