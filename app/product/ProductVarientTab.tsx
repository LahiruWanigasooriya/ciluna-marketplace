"use client"

import React, {useEffect,useState} from "react";


const ProductVarientTab = () => {
    const variants = [
        {id:"tshirts",name:"T-Shirts"},
        {id:"blouses",name:"Blouses & Shirts"},
        {id:"jeans",name:"Jeans & Pants"},
        {id:"skirts",name:"Skirts"},
        {id:"dresses",name:"Dresses & Jumpsuits"},
        {id:"hoodies",name:"Hoodies"},
        {id:"necklaces",name:"Necklaces"},
        {id:"shades",name:"Shades"},
        {id:"scarfs",name:"Scarfs"},
        {id:"pendants",name:"Pendants"},
        {id:"rings",name:"Rings"},
        {id:"perfumes",name:"Perfumes"},
        {id:"earrings",name:"Earrings"},
        {id:"shorts",name:"Shorts"},
        {id:"purses",name:"Purses"},
        {id:"heels",name:"Heels"},
        {id:"flats",name:"Flats"},
        {id:"boots",name:"Boots"},
        {id:"slippers",name:"Slippers"},
    ];

    const [active, setActive] = useState<string>("all");

    return(
        <div className = "flex border-b bg-white h-auto overflow-auto scrollbar-hide gap-2.5 ">
            <button className={`p-4 text-sm font-arial ${
                active === "all"
                ? "bg-black text-white font-arialBold"
                :"text-gray-700 hover:text-[#252525]"
            }`}
            onClick = {() => setActive("all")}
            >
                View All

            </button>
           {variants.map((variant) => (
            <button
              key={variant.id}
              className={`px-4 py-2 text-sm font-medium ${
                active === variant.id
                  ? "bg-black text-white"
                  : "text-gray-700 hover:text-black"
              }`}
              onClick={() => setActive(variant.id)}
            >
              {variant.name}
            </button>
          ))}
        </div>
      );
};
export default ProductVarientTab;