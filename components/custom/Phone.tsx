"use client";

import React, { useState, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants } from "@/utils/animations";
import { ChevronDown } from "lucide-react";

const countries = [
  { id: "Austria", code: "+43", flag: "🇦🇹" },
  { id: "Belgium", code: "+32", flag: "🇧🇪" },
  { id: "Sri Lanka", code: "+94", flag: "🇱🇰" },
  { id: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { id: "Albania", code: "+355", flag: "🇦🇱" },
  { id: "Argentina", code: "+54", flag: "🇦🇷" },
  { id: "Australia", code: "+61", flag: "🇦🇺" },
  { id: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { id: "Brazil", code: "+55", flag: "🇧🇷" },
  { id: "Canada", code: "+1", flag: "🇨🇦" },
  { id: "China", code: "+86", flag: "🇨🇳" },
  { id: "Colombia", code: "+57", flag: "🇨🇴" },
  { id: "Denmark", code: "+45", flag: "🇩🇰" },
  { id: "Egypt", code: "+20", flag: "🇪🇬" },
  { id: "Finland", code: "+358", flag: "🇫🇮" },
  { id: "France", code: "+33", flag: "🇫🇷" },
  { id: "Germany", code: "+49", flag: "🇩🇪" },
  { id: "Greece", code: "+30", flag: "🇬🇷" },
  { id: "India", code: "+91", flag: "🇮🇳" },
  { id: "Indonesia", code: "+62", flag: "🇮🇩" },
  { id: "Italy", code: "+39", flag: "🇮🇹" },
  { id: "Japan", code: "+81", flag: "🇯🇵" },
  { id: "Kenya", code: "+254", flag: "🇰🇪" },
  { id: "Malaysia", code: "+60", flag: "🇲🇾" },
  { id: "Mexico", code: "+52", flag: "🇲🇽" },
  { id: "Netherlands", code: "+31", flag: "🇳🇱" },
  { id: "New Zealand", code: "+64", flag: "🇳🇿" },
  { id: "Nigeria", code: "+234", flag: "🇳🇬" },
  { id: "Norway", code: "+47", flag: "🇳🇴" },
  { id: "Pakistan", code: "+92", flag: "🇵🇰" },
  { id: "Philippines", code: "+63", flag: "🇵🇭" },
  { id: "Poland", code: "+48", flag: "🇵🇱" },
  { id: "Portugal", code: "+351", flag: "🇵🇹" },
  { id: "Russia", code: "+7", flag: "🇷🇺" },
  { id: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { id: "Singapore", code: "+65", flag: "🇸🇬" },
  { id: "South Africa", code: "+27", flag: "🇿🇦" },
  { id: "South Korea", code: "+82", flag: "🇰🇷" },
  { id: "Spain", code: "+34", flag: "🇪🇸" },
  { id: "Sweden", code: "+46", flag: "🇸🇪" },
  { id: "Switzerland", code: "+41", flag: "🇨🇭" },
  { id: "Thailand", code: "+66", flag: "🇹🇭" },
  { id: "Turkey", code: "+90", flag: "🇹🇷" },
  { id: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { id: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { id: "United States", code: "+1", flag: "🇺🇸" },
  { id: "Vietnam", code: "+84", flag: "🇻🇳" },
];

interface TelProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

const Phone: React.FC<TelProps> = ({ value, onChange, className, label = "Mobile Number" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    id: "Sri Lanka",
    code: "+94",
    flag: "LK",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => setIsOpen(false));

  const handleCountryChange = (countryId: string) => {
    const country = countries.find((c) => c.id === countryId);
    if (country) {
      setSelectedCountry(country);
      setIsOpen(false); // Close the dropdown after selection
    }
  };

  const isValidPhoneNumber = (phone: string) =>
    // /\d+/.test(phone) && phone.length <= 11;
  /\d{10,11}$/.test(phone);


  const handleInputChange = (phone: string) => {
    const formattedPhone = `${selectedCountry.code}${phone.replace(
      /^0+/,
      ""
    )}`; // Remove leading zeros
    onChange(formattedPhone);
  };

  return (
    <div className="flex flex-col gap-y-2 w-full text-white/90">
      <p className="font-[400] text-gray">{label}</p>
      <div className="relative w-full" ref={modalRef}>
        <div
          className={`w-full px-2 h-[44px] bg-white transition duration-200 ease-out rounded-lg flex items-center border border-[#e1e1e1]
          [&>[role=progressbar]]:mr-2.5
          [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
          [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
          [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
          group-disabled:opacity-50 ${className}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <button className="flex items-center justify-center h-full space-x-2 text-gray">
            <span className="text-lg leading-none">{selectedCountry.flag}</span>
            <span className="leading-none ">{selectedCountry.code}</span>
          </button>
          <input
            type="text"
            value={value?.replace(selectedCountry.code, "")} 
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter phone number"
            className="ml-2 flex-grow text-gray outline-none text-sm bg-transparent placeholder:font-[400] placeholder-muted-fg  placeholder-[#707070] w-0 !min-w-0"
          />
          <ChevronDown className={`${isOpen ? "rotate-180" : ""} text-black  !w-[18px] !h-[18px] min-w-[18px]`} />
        </div>
        {!isValidPhoneNumber(value) && value.length > 0 && (
          <span className="text-xs text-red-500">Invalid phone number</span>
        )}
        
        <AnimatePresence>
          
          {isOpen && (
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={dropdownVariants}
              className="absolute top-14 left-0 w-full bg-[#ffffff] rounded-lg shadow-lg max-h-64 overflow-y-auto z-10 border border-[#252525]  transition duration-200 ease-out flex flex-col items-start border-primary/70 
            [&>[role=progressbar]]:mr-2.5
            [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0
            [&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg
            [&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg
            group-disabled:opacity-50"
            >
              {countries.map((country) => (
                <li
                  key={country.id}
                  className={`flex items-center p-2 font-[400] text-sm text-black cursor-pointer hover:bg-stone-400 hover:opacity-75 w-full ${
                    selectedCountry.id === country.id ? "bg-gray-400" : ""
                  }`}
                  onClick={() => handleCountryChange(country.id)}
                >
                  <span className="text-lg mr-2 mb-1">{country.flag}</span>
                  {country.id}{"  "}
                  <span className="font-[400]">({country.code})</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Phone;