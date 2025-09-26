import React from "react";
import careguidedetails from "../careguidedetails";

export default async function CareGuideDetailsPage({ 
    params,
 }: {
     params: { id: string };
    }) {
        const {id} =  params;
        const guide = careguidedetails[id];
    if (!guide) {
        return <div>Care guide not found</div>;
    }
    return(
        <div className="relative pt-[16px] pb-[32px] pr-[16px] pl-[16px] mt-[104px] md:pt-[40px] md:pr-[96px] md:pl-[96px] md:pb-[40px] ">
            <div className="flex flex-col gap-y-[32px] md:gap-y-[48px] text-[#252525] items-center justify-start">
                <div className="flex flex-col gap-y-[16px]">
                <h1 className="font-arialBold text-[28px] leading-[32px]">{guide.title}</h1>
                <p className="font-arial text-[16px] leading-[24px]">{guide.desc}</p>
                </div>
            {guide.sections.map((section,idx)=>(
                <div key={idx} className="flex flex-col gap-y-[16px]">
                    <h2 className="font-arialBold text-[20px] leading-[24px]">{section.subtitle}</h2>

                    {section.content.map((c,i)=>(
                        <div key={i} className="">
                            <h3 className="font-arialBold text-[14px] leading-[20px] inline">{c.title}</h3>
                            <p className="font-arial text-[14px] leading-[24px] inline">{c.text}</p>
                        </div>
                    ))}
                    </div>
            ))}
            </div>
            <p className="font-arial text-[14px] leading-[24px] mt-[32px] md:mt-[48px]">For any questions regarding Ciluna Jewellery care, please refer to the Jewellery Care Guide provided with your purchase or contact our customer care team for assistance.</p>

        </div>
    );
}
