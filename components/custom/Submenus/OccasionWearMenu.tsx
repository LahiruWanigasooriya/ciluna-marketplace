import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/O1.webp";
import Img2 from "../../../app/assets/mainmenu-images/O2.webp";
import Img3 from "../../../app/assets/mainmenu-images/O3.webp";
import Img4 from "../../../app/assets/mainmenu-images/O4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const OccasionWearMenu = () => {
  const subItemClass = "relative text-[#252525] hover:text-yellow-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-7 after:bg-yellow-600 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200";

  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 custom-container !py-[40px] ">
      <h1 className='sm:hidden font-interBold text-[20px] mb-[16px]'>Occasion Wear</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Wedding</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Groom & Groomsmen Suits</a>
      <a href="#" className={subItemClass}>Mother-of-the-Bride Dresses</a>
      <a href="#" className={subItemClass}>Flower Girl Dresses</a>
      <a href="#" className={subItemClass}>Wedding Guest Attire</a>
      <a href="#" className={subItemClass}>Veils & Headpieces</a>
      <a href="#" className={subItemClass}>Bridal Belts & Sashes</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Party & Evening</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Evening Gowns</a>
      <a href="#" className={subItemClass}>Jumpsuits & Playsuits</a>
      <a href="#" className={subItemClass}>Statement Jewelry</a>
      <a href="#" className={subItemClass}>Clutch Bags</a>
      <a href="#" className={subItemClass}>Heels & Strappy Sandals</a>
      <a href="#" className={subItemClass}>Dress Shirts & Ties</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Office & Work</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Pencil Skirts</a>
      <a href="#" className={subItemClass}>Modest Dresses</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
    <div className="mb-[8px] sm:mb-[12px] mt-[16px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Festival & Themed</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>Fringe Jackets</a>
      <a href="#" className={subItemClass}>Flower Crowns</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Grooming & Fragrance</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Eau de Toilette</a>
      <a href="#" className={subItemClass}>Bath & Body</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Casual & Day Out</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Lightweight Blazers</a>
      <a href="#" className={subItemClass}>Midi Skirts</a>
      <a href="#" className={subItemClass}>Ballet Flats</a>
      <a href="#" className={subItemClass}>Crossbody Bags</a>
      <a href="#" className={subItemClass}>Sun Hats</a>
      <a href="#" className={subItemClass}>Linen Pants</a>
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