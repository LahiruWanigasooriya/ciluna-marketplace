import React from "react";
import Image from "next/image";
import womanImage from "@/public/assets/home/quite-brilliance.webp";
import PlayIcon from "@/public/assets/home/play.png";
import SoundIcon from "@/public/assets/home/sound.png";

const QuietBrilliance: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-start justify-between gap-8 xl:gap-[103px] max-w-[1920px] mx-auto font-inter">
      {/* Text Content */}
      <div className="flex-1">
        <p className="text-[14px] font-kaiseiBold text-[#C19F32] tracking-[0.25em] mb-[5px]">ABOUT US</p>
        <h2 className="text-[52px] font-kaiseiBold text-gray-900 mb-6">
          Quiet Brilliance
        </h2>
        <p className="text-[16px] text-[#707070] leading-relaxed mb-4">
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
  );
};

export default QuietBrilliance;
