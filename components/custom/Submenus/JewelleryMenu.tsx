import React from 'react';
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/J1.webp";
import Img2 from "../../../app/assets/mainmenu-images/J2.webp";
import Img3 from "../../../app/assets/mainmenu-images/J3.webp";
import Img4 from "../../../app/assets/mainmenu-images/J4.webp";

// Extract the `src` property from each StaticImageData object
const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const JewelleryMenu = () => {
  const subItemClass = "relative text-[#252525] hover:text-yellow-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-7 after:bg-yellow-600 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200";

  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 custom-container !py-[40px]"
>
      <h1 className='sm:hidden font-interBold text-[20px] mb-[16px]'>Jewellery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full ">
        {/* sub menu */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Necklaces</a>
          </div>
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Pendant Necklaces</a>
            <a href="#" className={subItemClass}>Chain Necklaces</a>
            <a href="#" className={subItemClass}>Locket Necklaces</a>
            <a href="#" className={subItemClass}>Beaded Necklaces</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* sub menu */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Earrings</a>
          </div>
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Hoop Earrings</a>
            <a href="#" className={subItemClass}>Drop Earrings</a>
            <a href="#" className={subItemClass}>Dangle Earrings</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* sub menu */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Rings</a>
          </div>
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Cocktail Rings</a>
            <a href="#" className={subItemClass}>Engagement Rings</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* sub menu */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Watches & Wearings</a>
          </div>
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Men’s Watches</a>
            <a href="#" className={subItemClass}>Neck Chains</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* sub menu */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Grooming & Fragrance</a>
          </div>
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Eau de Toilette</a>
            <a href="#" className={subItemClass}>Bath & Body</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>
      </div>

      <div className="">
        <SwiperImages images={images} />
      </div>
    </div>
  );
};

export default JewelleryMenu;