import React from 'react'
import SwiperImages from "../SwiperImages";
import Img1 from "../../../app/assets/mainmenu-images/W1.webp";
import Img2 from "../../../app/assets/mainmenu-images/W2.webp";
import Img3 from "../../../app/assets/mainmenu-images/W3.webp";
import Img4 from "../../../app/assets/mainmenu-images/W4.webp";

const images = [Img1.src, Img2.src, Img3.src, Img4.src];

const WomenMenu = () => {
  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Cloathing</a></div>    
    <div className="flex flex-col gap-[8px] font-lora font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Women’s T-Shirts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Blouses & Shirts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Dresses & Jumpsuits</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Jeans & Pants</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Skirts</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Skirts</a>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Shoes</a></div>    
    <div className="flex flex-col gap-[8px] font-lora font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Flats</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Heels</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sandals</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Boots</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Mules</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Slippers</a>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Bags & Accessories</a></div>    
    <div className="flex flex-col gap-[8px] font-lora font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Crossbody Bags</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Clutches</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Backpacks</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Wallets & Purses</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Sunglasses</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Hats & Caps</a>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Beauty & Fragrance</a></div>    
    <div className="flex flex-col gap-[8px] font-lora font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">View All</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Eau de Toilette</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Fragrance Gift Sets</a>
      <a href="#" className="text-[#252525] hover:text-gray-600">Skincare (Moisturizers, Serums)</a>
    </div>
  </div>

  {/*sub menu*/}
  <div>
    <div className="mb-[16px]"><a href="#" className="text-black hover:text-gray-600 font-kaisei text-[16px]">Watches & Wearings</a></div>    
    <div className="flex flex-col gap-[8px] font-lora font-light">
      <a href="#" className="text-[#252525] hover:text-gray-600">Bracelets</a>
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