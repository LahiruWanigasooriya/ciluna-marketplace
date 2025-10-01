import React from "react";
import Image from "next/image";
import careguidebanner from "@/public/assets/careGuides/careguideBanner.webp";
import CareGuideCard from "../careguide/CareGuideCard";
import Readytowear from "@/public/assets/careGuides/readytowear.webp";
import Jewellery from "@/public/assets/careGuides/jewellary.webp";
import Shoes from "@/public/assets/careGuides/shoes.webp";
import Handbags from "@/public/assets/careGuides/handbags.webp";
import Perfumes from "@/public/assets/careGuides/perfume.webp";
import link from "next/link";

const CareGuideBanner = () => {
  return (
   
            <div className="relative ">
              <Image
                src={careguidebanner}
                alt="bannerimg"
                className="hidden md:block w-screen h-[468px] object-cover object-top mt-[108px]"
                style={{ objectPosition: "center 50%" }}
              />
              <Image
                src={careguidebanner}
                alt="bannerImage mobile"
                className="block md:hidden w-screen h-[258px] object-cover object-center mt-[104px] "
                style={{ objectPosition: "center 10%",
                 }}
              />
 

            <div className="absolute top-[79px] md:top-[5%] lg:top-[15%]  w-full md:w-full lg:w-full   flex flex-col  p-[16px] lg:left-1/2  gap-[12px] lg:px-[287px] lg:py-[180px] lg:gap-[12px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mx-auto lg:items-center ">
            <div className="absolute block sm:hidden  inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/60 backdrop-blur-[8px] z-0 h-[calc(258px-79px)]"></div>
              <h1 className="flex text-white font-kaiseiBold text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] items-center justify-center z-10">Care Guides</h1>
              <p className="flex text-white items-center justify-center font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-center z-10">
                At Ciluna, we believe that providing the best care for your products is just as important as choosing the right one. Our Care Guides offer expert advice on maintaining and using your items to ensure they last for years to come.
              </p>
            </div>
            <div className="pl-[16px] pr-[16px] pt-[16px] pb-[32px] gap-x-[10px] gap-y-[32px] md:gap-[24px] md:pr-[96px] md:pl-[96px] md:pt-[40px] md:pb-[40px] flex flex-col items-center justify-center md:flex-row md:flex-wrap md:gap-x-[24px] md:gap-y-[40px]">
              <CareGuideCard
              image={Readytowear}
              title="Ready to Wear"
              description="Designed for everyday elegance, Ciluna’s ready-to-wear pieces stay fresh and stylish with simple care."
              buttonText="View More"
              link="/careguide/readytowear"

              />
              <CareGuideCard
              image={Jewellery}
              title="Jewellery"
              description="Keep your Ciluna jewellery shining with simple care tips. Learn how to clean, store, and protect your favourite pieces."
              buttonText="View More"
              link="/careguide/jewellery"
              />
              <CareGuideCard
              image={Handbags}
              title="Leather Goods"
              description="Crafted for durability and style, Ciluna leather goods stay beautiful with proper care and storage."
              buttonText="View More"
              link="/careguide/leathergoods"
              />
              <CareGuideCard
              image={Perfumes}
              title="Perfumes"
              description="Preserve the elegance of your Ciluna perfumes by storing them in cool, dry places away from direct light."
              buttonText="View More"
              link="/careguide/perfumes"
              />
              <CareGuideCard
              image={Shoes}
              title="Shoes"
              description="Keep your Ciluna shoes looking sharp by storing them properly and avoiding water or heat damage."
              buttonText="View More"
              link="/careguide/shoes"
              />
              

            </div>

            </div>
       


          

        
      
  );
};

export default CareGuideBanner;
