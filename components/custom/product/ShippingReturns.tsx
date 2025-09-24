import { shippingReturnsDetails } from "@/constants/shipping-returns";
import React from "react";
import { FaPhone } from "react-icons/fa6";

const ShippingReturns = () => {
  return (
    <div className="font-[Arial] space-y-5 md:space-y-6">
      {shippingReturnsDetails.map((section, index) => (
        <div key={index}>
          <h2 className="text-[16px] leading-6 text-black font-bold">
            {section.title}
          </h2>
          <p className="text-neutralGray-700 text-[14px] leading-5 mt-2">
            {section.content}
          </p>
        </div>
      ))}
      <div className="text-[14px] leading-5">
        <span className="text-gray">
          📧Email:
          <span className="text-neutralGray-700"> contact@domain.com</span>
        </span>
        <br />
        <span className="flex items-center text-gray">
          <FaPhone className="inline w-5" />
          Phone:
          <span className="text-neutralGray-700 ml-1"> +1 (23) 456 789</span>
        </span>
      </div>
    </div>
  );
};

export default ShippingReturns;
