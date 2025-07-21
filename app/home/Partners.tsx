"use client";

import Title from "@/components/custom/Title";
import React from "react";
import Image from "next/image";
import MSI from "@/public/assets/partners/msi.png";
import DEL from "@/public/assets/partners/del.png";
import ASUS from "@/public/assets/partners/asus.png";
import PRE from "@/public/assets/partners/pre.png";
import APPLE from "@/public/assets/partners/apple.png";
import Marquee from "react-fast-marquee";

const images = [APPLE, MSI, DEL, ASUS, PRE, APPLE, MSI, DEL, ASUS, PRE];

const Partners: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-white overflow-hidden">
      <Title
        title="Trusted by 10,000+ companies around the world"
        className="mb-4 text-center"
      />
      <Marquee speed={20}>
        {[...images, ...images].map((img, index) => (
         <Image
         key={index}
         alt={`Partner ${index}`}
         src={img}
         width={204}
         height={82} 
         className="h-[32px] lg:h-[82px] w-auto mx-4 lg:mx-[36px]" 
         sizes="(max-width: 1024px) 100px, 204px" 
         placeholder="blur"
         blurDataURL="/placeholder-partner.png" 
       />
        ))}
      </Marquee>
    </div>
  );
};

export default Partners;
