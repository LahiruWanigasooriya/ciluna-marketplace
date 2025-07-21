"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

interface FilterItem {
  label: string;
}

interface StateSelectorProps {
  state?: string;
  onstateSelect?: (state: string) => void;
}

const filterItems: FilterItem[] = [
  { label: "All" },
  { label: "Shipped" },
  { label: "Delivered" },
];

const StateChanger: React.FC<StateSelectorProps> = ({
  onstateSelect,
}) => {
  const [selectedState, setSelectedState] = useState<string>("All");

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    if (onstateSelect) {
      onstateSelect(state);
      
    }
  };

  const stateVariant = {
    selected: {
      backgroundColor: "#4A55E2",
      color: "#ffffff",
      transition: { duration: 0.3 },
    },
    unselected: {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      color: "#ffffff",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-[16px] w-full">
      {filterItems.map((state, index) => (
        <motion.div
          key={index}
          className={`flex justify-center items-center w-full recommend:w-[184px] py-[12px] rounded-[10px] text-white text-sm cursor-pointer`}
          onClick={() => handleStateClick(state.label)}
          variants={stateVariant}
          initial="unselected"
          animate={selectedState === state.label ? "selected" : "unselected"}
        >
          {state.label}
        </motion.div>
      ))}
    </div>
  );
};

export default StateChanger;
