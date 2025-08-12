import BestSelling from "./BestSelling";
import ImageSlider from "./ImageSlider";
import QuietBrilliance from "./QuietBrilliance";
import TimelessExpressions from "./TimelessExpressions";
import NewCollection from "./NewCollection";
// import Link from "next/link";
// import { IconButton } from "@/components/custom/IconButton";
// import Category from "./Category";
// import Title from "@/components/custom/Title";
// import Faq from "./Faq";
import Testimonials from "./Testimonials";

const Page = async () => {
  return (
    <div className="flex flex-col relative gap-12 recommend:gap-[76px] ">
      <div className="flex flex-col w-full h-full">
        <ImageSlider />

        <QuietBrilliance />
        <TimelessExpressions />
        <NewCollection />
        <BestSelling />
        <Testimonials />
      </div>
      {/* <div className="relative flex flex-col gap-12 recommend:gap-[76px] bg-blue">
          <Category />
        </div>
        <div className="flex flex-col gap-3 text-black items-center xl:items-start">
          <Title title="FAQ" />
          <p className="text-sm text-center xl:text-start font-[400] leading-[24px]">
            {`Our FAQ area addresses typical shopping, shipping, payment, and product inquiries fast. We provide solutions for first-time and returning customers to help you shop. Contact our customer service staff if you can't locate what you need.`}
          </p>
          <Faq />
        </div> */}
    </div>
  );
};

export default Page;
