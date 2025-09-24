import React from "react";
import Image from "next/image";
import careguidebanner from "@/public/assets/careGuides/careguideBanner.webp";

const CareGuideBanner = () => {
  return (
   
          // <div className="flex flex-col pb-[32px] md:pb-[36px]">
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
                className="block md:hidden w-screen h-[258px] object-cover object-center mt-[104px]"
                style={{ objectPosition: "center 10%" }}
              />
 

            <div className="absolute top-[79px] md:top-1/2 bottom-0 w-full  flex flex-col  p-[16px] gap-[12px] md:left-1/2 md:gap-[40px] md:-translate-x-1/2 md:-translate-y-1/2 md:mx-auto md:items-center">
            
              <h1 className="flex text-white font-kaiseiBold text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] items-center justify-center">Care Guides</h1>
              <p className="flex text-white items-center justify-center font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-center">
                At Ciluna, we believe that providing the best care for your products is just as important as choosing the right one. Our Care Guides offer expert advice on maintaining and using your items to ensure they last for years to come.
              </p>


           

         
        
            </div>

            </div>
       


          // </div>

        
      
  );
};

export default CareGuideBanner;
