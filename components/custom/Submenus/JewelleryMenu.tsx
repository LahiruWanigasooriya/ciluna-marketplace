import React from 'react';
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/J1.webp";
import Img2 from "../../../app/assets/mainmenu-images/J2.webp";
import Img3 from "../../../app/assets/mainmenu-images/J3.webp";
import Img4 from "../../../app/assets/mainmenu-images/J4.webp";

// Extract the `src` property from each StaticImageData object
const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const JewelleryMenu = () => {
  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">
        {/* sub menu */}
        <div>
          <div className="mb-[16px]">
            <a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Necklaces</a>
          </div>
          <div className="flex flex-col gap-[8px] font-lora font-light">
            <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Pendant Necklaces</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Chain Necklaces</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Locket Necklaces</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Beaded Necklaces</a>
          </div>
        </div>

        {/* sub menu */}
        <div>
          <div className="mb-[16px]">
            <a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Earrings</a>
          </div>
          <div className="flex flex-col gap-[8px] font-lora font-light">
            <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Hoop Earrings</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Drop Earrings</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Dangle Earrings</a>
          </div>
        </div>

        {/* sub menu */}
        <div>
          <div className="mb-[16px]">
            <a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Rings</a>
          </div>
          <div className="flex flex-col gap-[8px] font-lora font-light">
            <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Cocktail Rings</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Engagement Rings</a>
          </div>
        </div>

        {/* sub menu (fix typo: "Ringss" to "Rings") */}
        <div>
          <div className="mb-[16px]">
            <a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Rings</a>
          </div>
          <div className="flex flex-col gap-[8px] font-lora font-light">
            <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Cocktail Rings</a>
            <a href="#" className="text-[#252525] hover:text-gray-600">Engagement Rings</a>
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