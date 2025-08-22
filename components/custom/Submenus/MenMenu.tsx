import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/M1.webp";
import Img2 from "../../../app/assets/mainmenu-images/M2.webp";
import Img3 from "../../../app/assets/mainmenu-images/M3.webp";
import Img4 from "../../../app/assets/mainmenu-images/M4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const MenMenu = () => {
  const subItemClass = "relative text-[#252525] hover:text-yellow-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-7 after:bg-yellow-600 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200";

  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 custom-container !py-[40px] ">
      <h1 className='sm:hidden font-interBold text-[20px] mb-[16px]'>Men</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

        {/* Submenu: Cloathing */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Cloathing</a>
          </div>    
          <div className="flex flex-col gap-[8px] font-inter font-light ">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>T-Shirts & Polos</a>
            <a href="#" className={subItemClass}>Suits & Blazers</a>
            <a href="#" className={subItemClass}>Button-Down Shirts</a>
            <a href="#" className={subItemClass}>Jeans & Chinos</a>
            <a href="#" className={subItemClass}>Shorts</a>
            <a href="#" className={subItemClass}>Sweaters & Hoodies</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* Submenu: Shoes */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Shoes</a>
          </div>    
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Sneakers</a>
            <a href="#" className={subItemClass}>Dress Shoes</a>
            <a href="#" className={subItemClass}>Boots</a>
            <a href="#" className={subItemClass}>Sandals & Slides</a>
            <a href="#" className={subItemClass}>Athletic Shoes</a>
            <a href="#" className={subItemClass}>Slippers</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* Submenu: Bags & Accessories */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Bags & Accessories</a>
          </div>    
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>View All</a>
            <a href="#" className={subItemClass}>Backpacks</a>
            <a href="#" className={subItemClass}>Duffel Bags</a>
            <a href="#" className={subItemClass}>Briefcases</a>
            <a href="#" className={subItemClass}>Wallets</a>
            <a href="#" className={subItemClass}>Belts</a>
            <a href="#" className={subItemClass}>Sunglasses</a>
            <div className='sm:hidden border-b my-[16px]'></div>
          </div>
        </div>

        {/* Submenu: Watches & Wearings */}
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

        {/* Submenu: Grooming & Fragrance */}
        <div>
          <div className="mb-[8px] sm:mb-[12px]">
            <a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Grooming & Fragrance</a>
          </div>    
          <div className="flex flex-col gap-[8px] font-inter font-light">
            <a href="#" className={subItemClass}>Eau de Toilette</a>
            <a href="#" className={subItemClass}>Bath & Body</a>
          </div>
        </div>

      </div>

      <div className="">
        <SwiperImages images={images} />
      </div>
      
    </div>
  )
}

export default MenMenu
