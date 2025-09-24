import Title from "@/components/custom/Title";
import { Dot } from "lucide-react";
import React from "react";
import { conditionConfig } from "@/config/condition";

const ConditionPage = async () => {
  return (
    <div className="hidden flex-col gap-12 text-white">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <Title title="Terms & Conditions" />
          <p className="text-sm font-[400] leading-[30px] md:leading-[24px] text-center md:text-start">
            By accessing and using CILUNA Marketplace, you agree to comply with
            and be bound by these Terms & Conditions. If you do not agree,
            please do not use our website.
          </p>
        </div>
        <div className="rounded-[9px] mt-3 p-4 border-t border-l border-solid border-[#6B709499] flex flex-col gap-8 bg-[#FFFFFF]/5">
          {conditionConfig.map((section, idx) => (
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

export default ConditionPage;
