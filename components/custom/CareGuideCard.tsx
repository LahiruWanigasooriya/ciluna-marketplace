import react from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type CareGuideCardProps = {
    image: string | StaticImageData;
    title: string;
    description: string;
    buttonText?: string;
    onButtonClick?: () => void;
};

const CareGuideCard: React.FC<CareGuideCardProps> = ({ 
    image,
     title, 
     description,
      buttonText, 
      onButtonClick }) => {
        return(
          <div className="w-full min-w-[343px] max-w-[400px] rounded-none border-[#ffffff] bg-transparent">
            <Image
            src={image} 
            alt={title} 
            className="w-full h-[241px] md:h-[241px] object-cover bg-[#F2F2F2]"/>

            <div className="p-0 flex flex-col gap-[12px] text-[#252525]">
                <h3 className="font-arialBold text-[20px] leading-[24px] mt-[16px]">{title}</h3>
                <p className="font-arial font-normal text-[16px] leading-[24px]">{description}</p>

                <button onClick={onButtonClick}
                className="  w-[149px] h-[56px] rounded-[8px] border-[1px] border-[#252525] py-[16px] px-[32px] bg-[#ffffff] font-arial font-normal leading-[24px]"
                >{buttonText}</button>
            </div>
          </div>  
        )
   }
export default CareGuideCard;