import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/M1.webp";
import Img2 from "../../../app/assets/mainmenu-images/M2.webp";
import Img3 from "../../../app/assets/mainmenu-images/M3.webp";
import Img4 from "../../../app/assets/mainmenu-images/M4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const MenMenu = () => {
  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Cloathing</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">T-Shirts & Polos</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Suits & Blazers</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Button-Down Shirts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Jeans & Chinos</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Shorts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sweaters & Hoodies</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Shoes</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sneakers</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Dress Shoes</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Boots</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sandals & Slides</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Athletic Shoes</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Slippers</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Bags & Accessories</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Backpacks</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Duffel Bags</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Briefcases</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Wallets</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Belts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sunglasses</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Watches & Wearings</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Men’s Watches</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Neck Chains</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Grooming & Fragrance</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">Eau de Toilette</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Bath & Body</a>
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