import BestSelling from "./BestSelling";
import ImageSlider from "./ImageSlider";

const Page = async () => {
  return (
    <div className="flex flex-col relative gap-12 recommend:gap-[76px] bg-red-200">
      <div className="flex flex-col w-full text-white">
        <ImageSlider />
      </div>

      <div className="recommend:gap-[76px] flex flex-col gap-12">
        <BestSelling />
      </div>
    </div>
  );
};

export default Page;
