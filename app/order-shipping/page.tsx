import Image from "next/image";
import bannerImage from "@/public/assets/careGuides/OrderShippingHeroBanner.webp";
import bannerImageMob from "@/public/assets/careGuides/OrderShippingHeroBannerMob.webp";
import { OrderShippingDetails } from "@/constants/order-shipping";

const ShipingPage = async () => {
  return (
    <div className="mt-[60px] md:mt-[108px] relative w-full h-full">
      <div className="flex justify-center items-end md:items-center h-[258px] md:h-[468px] w-full">
        <Image
          src={bannerImage}
          loading="eager"
          alt="Banner"
          className="w-full h-full hidden md:flex object-cover"
        />
        <Image
          src={bannerImageMob}
          loading="eager"
          alt="Banner"
          className="w-full h-full md:hidden object-cover"
        />
        <div className="absolute text-white space-y-3 max-w-[866px] text-center p-4 lg:p-0">
          <div className="text-[24px] leading-[32px] md:text-[40px] md:leading-[48px] font-bold font-kaiseiHarunoUmi">
            Order & Shipping
          </div>
          <div className="font-[Arial] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">
            At Ciluna, we make shopping simple, convenient, and secure. Here’s
            everything you need to know about placing and managing your orders
            with us.
          </div>
        </div>
      </div>
      <div className="font-[Arial] space-y-6 md:space-y-[40px] custom-container pt-6 pb-8 md:py-10 text-black">
        {OrderShippingDetails.map((section, index) => (
          <div key={index} className="space-y-3 md:space-y-4">
            <div className="text-[20px] leading-6 font-arialBold">
              {section.title}
            </div>
            <div className="font-[Arial] text-[14px] leading-5 md:text-[16px] md:leading-6 ">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipingPage;
