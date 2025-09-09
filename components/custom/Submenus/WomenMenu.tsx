import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/W1.webp";
import Img2 from "../../../app/assets/mainmenu-images/W2.webp";
import Img3 from "../../../app/assets/mainmenu-images/W3.webp";
import Img4 from "../../../app/assets/mainmenu-images/W4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const WomenMenu = () => {
  const subItemClass = "relative text-[#252525] hover:text-yellow-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-7 after:bg-yellow-600 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200";

  return (
     <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 custom-container !py-[40px] max-sm:!px-0">
      <h1 className='sm:hidden font-interBold text-[20px] mb-[16px]'>Women</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Clothing</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light  ">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Women’s T-Shirts</a>
      <a href="#" className={subItemClass}>Blouses & Shirts</a>
      <a href="#" className={subItemClass}>Dresses & Jumpsuits</a>
      <a href="#" className={subItemClass}>Jeans & Pants</a>
      <a href="#" className={subItemClass}>Skirts</a>
      <a href="#" className={subItemClass}>Shorts</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Shoes</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Flats</a>
      <a href="#" className={subItemClass}>Heels</a>
      <a href="#" className={subItemClass}>Sandals</a>
      <a href="#" className={subItemClass}>Boots</a>
      <a href="#" className={subItemClass}>Mules</a>
      <a href="#" className={subItemClass}>Slippers</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Bags & Accessories</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Crossbody Bags</a>
      <a href="#" className={subItemClass}>Clutches</a>
      <a href="#" className={subItemClass}>Backpacks</a>
      <a href="#" className={subItemClass}>Wallets & Purses</a>
      <a href="#" className={subItemClass}>Sunglasses</a>
      <a href="#" className={subItemClass}>Hats & Caps</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Beauty & Fragrance</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>Eau de Toilette</a>
      <a href="#" className={subItemClass}>Fragrance Gift Sets</a>
      <a href="#" className={subItemClass}>Skincare (Moisturizers, Serums)</a>
      <div className='sm:hidden border-b my-[16px]'></div>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[8px] sm:mb-[12px]"><a href="#" className="text-black hover:text-gray-600 font-interBold text-[16px]">Watches & Wearings</a></div>    
    <div className="flex flex-col gap-[8px] font-inter font-light">
      <a href="#" className={subItemClass}>View All</a>
      <a href="#" className={subItemClass}>ChronoSpark</a>
    </div>
  </div>

</div>

  <div className="">
    <SwiperImages images={images} />
  </div>
  
</div>  
  )
}

export default WomenMenu