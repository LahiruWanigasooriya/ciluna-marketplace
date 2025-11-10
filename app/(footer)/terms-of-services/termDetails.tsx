import React from "react";

interface TermsDetailsProps {
  title: string;
  desc: string;
  subpointsTitle?: string;
  subpoints?: string[];
}

const TermsDetails: React.FC<TermsDetailsProps> = ({
  title,
  desc,
  subpointsTitle,
  subpoints,
}) => {
  return (
    <div className="flex flex-col gap-y-[12px] md:gap-y-[16px] ">
      <h2 className="font-arialBold text-[20px] leading-[24px] text-[#252525]">
        {title}
      </h2>
      <p className="font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#252525]">
        {desc}
      </p>
      {subpointsTitle && subpoints && subpoints.length > 0 && (
        <h3 className="font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#252525]">
          {subpointsTitle}
        </h3>
      )}
      {subpoints && subpoints.length > 0 && (
        <ul className="list-disc list-inside">
          {subpoints.map((point, index) => (
            <li
              key={index}
              className="font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#252525] ml-3"
            >
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TermsDetails;
