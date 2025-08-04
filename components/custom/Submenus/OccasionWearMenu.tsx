import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/O1.webp";
import Img2 from "../../../app/assets/mainmenu-images/O2.webp";
import Img3 from "../../../app/assets/mainmenu-images/O3.webp";
import Img4 from "../../../app/assets/mainmenu-images/O4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const OccasionWearMenu = () => {
  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 ">
      <h1 className='sm:hidden font-interBold text-[20px] mb-[16px]'>Occasion Wear</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Wedding</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Groom & Groomsmen Suits</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Mother-of-the-Bride Dresses</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Flower Girl Dresses</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Wedding Guest Attire</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Veils & Headpieces</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Bridal Belts & Sashes</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Party & Evening</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Evening Gowns</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Jumpsuits & Playsuits</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Statement Jewelry</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Clutch Bags</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Heels & Strappy Sandals</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Dress Shirts & Ties</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Office & Work</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Pencil Skirts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Modest Dresses</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
    <div className="mb-[8px] sm:mb-[12px] mt-[16px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Festival & Themed</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">Fringe Jackets</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Flower Crowns</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Grooming & Fragrance</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Eau de Toilette</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Bath & Body</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Casual & Day Out</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Lightweight Blazers</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Midi Skirts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Ballet Flats</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Crossbody Bags</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sun Hats</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Linen Pants</a>
    </div>
  </div>


</div>  

  <div className="">
    <SwiperImages images={images} />
  </div>

</div>
  )
}

export default OccasionWearMenu