import imageBanner from "@/public/assets/trackYourOrder/ImageBanner.png";
import React from "react";
import Image from "next/image";
const trackyourorder: React.FC = () => {
    return(
         <div className="relative ">
              <Image
                src={imageBanner}
                alt="bannerimg"
                className="hidden md:block w-screen h-[468px] object-cover object-top mt-[108px]"
                style={{ objectPosition: "center 50%" }}
              />
              <Image
                src={imageBanner}
                alt="bannerImage mobile"
                className="block md:hidden w-screen h-[258px] object-cover object-center mt-[104px] "
                style={{ objectPosition: "center 10%",
                 }}
              />
              </div>
 
    )

}
export default trackyourorder;