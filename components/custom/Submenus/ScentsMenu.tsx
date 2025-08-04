import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/S1.webp";
import Img2 from "../../../app/assets/mainmenu-images/S2.webp";
import Img3 from "../../../app/assets/mainmenu-images/S3.webp";
import Img4 from "../../../app/assets/mainmenu-images/S4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const ScentsMenu = () => {
  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 ">
      <h1 className='sm:hidden font-interBold text-[20px] mb-[16px]'>Scents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Women’s Fragrances</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Fruity Eau de Toilette</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Woody Eau de Parfum</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Oriental Eau de Parfum</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Citrus Eau de Toilette</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Gourmand Scents</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Limited Edition Fragrances</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Men’s Fragrances</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Spicy Wood Cologne</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Aquatic Fresh Cologne</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Fougere Cologne</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Designer Classics</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Travel Sized</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Body Sprays</a>
    </div>
  </div>

</div>  

  <div className="">
    <SwiperImages images={images} />
  </div>

</div>
  )
}

export default ScentsMenu