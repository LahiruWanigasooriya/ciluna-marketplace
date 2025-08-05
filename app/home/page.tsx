import BestSelling from "./BestSelling";
import ImageSlider from "./ImageSlider";

const Page = async () => {
  return (
    <div className="flex flex-col relative gap-[24px] recommend:gap-[76px] w-full h-full">
      <div className="flex flex-col w-full h-full">
        <ImageSlider />
      </div>

      <div className="recommend:gap-[76px] flex flex-col gap-12">
        <BestSelling />
      </div>
    </div>
  );
};

export default Page;
