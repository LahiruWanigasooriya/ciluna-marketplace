import Title from "@/components/custom/Title";
import { Dot } from "lucide-react";
import React from "react";
import { policyConfig } from "@/config/policy";

const page = () => {
  return (
    <div className="flex flex-col gap-12 text-white">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <Title title="Privacy Policy" />
          <p className="text-sm font-[400] leading-[30px] md:leading-[24px] text-center md:text-start">
            At CILUNA Marketplace, your privacy is paramount. This Privacy
            Policy explains how we collect, use, and safeguard your personal
            information in connection with our services.
          </p>
        </div>
        <div className="rounded-[9px] mt-3 p-4 border-t border-l border-solid border-[#6B709499] flex flex-col gap-8 bg-[#FFFFFF]/5">
          {policyConfig.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <Title className="text-lg" title={section.title} />
              <div className="flex flex-col gap-2">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-start gap-2 md:gap-1"
                  >
                    <div>
                      <Dot className="text-2xl" />
                    </div>

                    <div className="text-sm leading-[24px]">
                      <span className="font-interSemiBold">
                        {" "}
                        {item.label ? `${item.label}: ` : ""}
                      </span>
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
