import React from "react";
import Image from "next/image";
import womanImage from "@/public/assets/home/quite-brilliance.webp";
import PlayIcon from "@/public/assets/home/play.png";
import SoundIcon from "@/public/assets/home/sound.png";
import BgImg from "@/public/assets/home/quiet-brillience-bg.png";

const QuietBrilliance: React.FC = () => {
  return (
    <>
    {/* Bg Image */}
    <div className="hidden md:flex absolute w-full h-auto item-center justify-center overflow-hidden mt-60"><Image src={BgImg} alt="Play" className="w-[26%]"/></div>
    <div className="hidden md:flex absolute w-full h-auto item-end -mt-40 -rotate-180 scale-y-[-1]"><Image src={BgImg} alt="Play" className=" w-[26%] recommend:-ml-[80px]"/></div>
    
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 xl:gap-[103px] max-w-[1920px] mx-auto font-inter z-10">
      {/* Text Content */}
      <div className="flex-1 text-center md:text-start">
        <p className="text-[12px] sm:text-[14px] font-kaiseiBold text-[#C19F32] tracking-[0.25em] sm:mb-[5px]">ABOUT US</p>
        <h2 className="text-[24px] sm:text-[40px] lg:text-[52px] font-kaiseiBold text-gray-900 mb-6">
          Quiet Brilliance
        </h2>
        <p className="text-[14px] sm:text-[16px] text-[#707070] font-inter leading-relaxed md:mb-4">
          CILUNA emerged from the balance between tradition and vision, earth
          and ether, self and story.<br/> With every creation, we seek to awaken what
          is eternal. Not trends, but truths. Not noise, but nuance. We do not
          rush beauty, nor compromise its soul.<br/> Every thread, every form, every
          scent is shaped by intention, guided by conscience, and crafted to
          endure.<br/> CILUNA is a sanctuary for those who wear their story with
          purpose those who understand that the most powerful expressions are
          often the most quiet.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 max-w-md xl:max-w-none w-full relative rounded-2xl ">
        <Image
          src={womanImage}
          alt="Quiet Brilliance"
          className="w-full h-auto object-cover rounded-2xl"
          placeholder="blur"
        />

        {/* Bottom-right icons */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Image src={PlayIcon} alt="Play" className=" cursor-pointer hover:scale-105"/>

          <Image src={SoundIcon} alt="Sound" className=" cursor-pointer hover:scale-105"/>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuietBrilliance;
