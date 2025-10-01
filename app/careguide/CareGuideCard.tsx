import react from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

type CareGuideCardProps = {
    image: string | StaticImageData;
    title: string;
    description: string;
    buttonText?: string;
    onButtonClick?: () => void;
    link: string;
};

const CareGuideCard: React.FC<CareGuideCardProps> = ({ 
    image,
     title, 
     description,
      buttonText, 
      link,
       }) => {
        return(
          <div className="w-full min-w-[343px] max-w-[400px] min-h-[413px] max-h-[421px] rounded-none border-[#ffffff] bg-transparent">
            <div className="w-full h-[241px] md:h-[241px] bg-[#f5f5f5] rounded-[8px] items-center justify-center flex pt-[20px] pb-[20px]">
              <Image
            src={image} 
            alt={title} 
            className="object-contain max-h-full"/>

            </div>
 
            <div className="p-0 flex flex-col gap-[12px] text-[#252525]">
                <h3 className="font-arialBold text-[20px] leading-[24px] mt-[16px]">{title}</h3>
                <p className="font-arial font-normal text-[16px] leading-[24px] line-clamp-2">{description}</p>
                <Link href={link}>
                <button 
                className="  w-fit h-[56px] rounded-[8px] border-[1px] border-[#252525] py-[16px] px-[32px] bg-[#ffffff] font-arial font-normal leading-[24px] text-[18px] cursor-pointer"
                >{buttonText}</button>
                </Link>

            </div>
          </div>  
        )
   }
export default CareGuideCard;