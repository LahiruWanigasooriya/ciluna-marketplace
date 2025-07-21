import Title from "@/components/custom/Title";
import { IconButton } from "@/components/custom/IconButton";
import Faq from "./Faq";
import Category from "@/app/home/Category";
import BestSelling from "./BestSelling";
import BGIMG from "@/public/assets/bglogo.webp";
import Link from "next/link";
import Partners from "./Partners";
import ImageSlider from "./ImageSlider";

const Page = async () => {
  return (
    <div className="flex flex-col relative gap-12 recommend:gap-[76px]">
      <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 lg:gap-8  xl:gap-36 w-full items-center xl:items-start recommend:items-center text-white">
        <p className="font-[700] leading-[32px] xl:leading-tight text-center md:text-start text-[1.375rem] md:text-[1.5rem] lg:text-[1.8rem] xl:text-[2.5rem] w-full xl:max-w-2xl font-interSemiBold block md:hidden">
          The Ultimate E-Commerce Platform for computer accessories
        </p>
          <ImageSlider />
        <div className="flex flex-col gap-6 md:gap-8 xl:gap-10 w-full md:pl-8 md:pt-[23px]">
          <div className="flex flex-col gap-3 md:gap-4 xl:gap-6">
            <p className="font-[700] leading-[2rem] xl:leading-tight text-center md:text-start text-[1.375rem] md:text-[1.5rem] lg:text-[1.8rem] xl:text-[2.5rem] w-full xl:max-w-2xl font-interSemiBold hidden md:block">
              The Ultimate E-Commerce Platform for computer accessories
            </p>
            <div className="flex flex-col gap-6 w-full">
              <p className="text-sm font-[400] leading-[23px] lg:leading-[32px] max-w-3xl text-center md:text-start hidden md:block">
                {`Welcome to PAW Marketplace, your one-stop shop for premium computer accessories and peripherals! Whether you're a gamer, professional, or tech enthusiast, we offer a wide range of high-performance keyboards, mouse, headsets, monitors, cables, and more all at unbeatable prices.`}
              </p>
              <Link href="/product">
                <IconButton
                  name="Get Started"
                  process="Processing..."
                  success="GO!"
                  className="w-full md:w-52 hidden md:flex bg-purple"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="recommend:gap-[76px] flex flex-col gap-12">
        <BestSelling />
        <div className="relative flex flex-col gap-12 recommend:gap-[76px]">
          <div
            className="hidden lg:block absolute inset-0 -z-10"
            style={{
              backgroundImage: `url(${BGIMG.src})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Partners />
          <Category />
        </div>
        <div className="flex flex-col gap-3 text-white items-center xl:items-start">
          <Title title="FAQ" />
          <p className="text-sm text-center xl:text-start font-[400] leading-[24px]">
            {`Our FAQ area addresses typical shopping, shipping, payment, and product inquiries fast. We provide solutions for first-time and returning customers to help you shop. Contact our customer service staff if you can't locate what you need.`}
          </p>
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default Page;
