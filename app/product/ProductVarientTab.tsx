"use client"

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

    const [active, setActive] = useState("all");
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const checkScrollability = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollability();
        const handleResize = () => checkScrollability();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 206; 
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 206; 
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative flex items-center w-full bg-gray-50">
        
            <div 
                ref={scrollContainerRef}
                className="flex items-center w-full overflow-x-auto scrollbar-hide gap-0 whitespace-nowrap"
                onScroll={checkScrollability}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <button 
                    className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-4 min-w-[206px] w-[206px] h-[52px] 
                      text-sm leading-5 font-medium 
                      ${active === "all"
                            ? "bg-black text-white"
                            : "bg-gray-50 text-gray-700 hover:text-black"
                    }`}
                    onClick={() => setActive("all")}
                    style={{ width: '206px', minWidth: '206px' }}
                >
                    <ChevronLeft size={16} />
                    View All
                </button>
                {variants.map((variant) => (
                    <button
                        key={variant.id}
                        className={`flex-shrink-0 px-6 py-4 min-w-[206px] w-[206px] h-[52px] text-sm leading-5 font-medium 
                          ${active === variant.id
                                ? "bg-black text-white"
                                : "bg-gray-50 text-gray-700 hover:text-black"
                        }`}
                        onClick={() => setActive(variant.id)}
                        style={{ width: '206px', minWidth: '206px' }}
                    >
                        {variant.name}
                    </button>
                ))}
            </div>
            {canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 z-20 p-2 bg-gray-50 text-gray-700 hover:text-black"
                >
                    <ChevronLeft size={20} />
                </button>
            )}
            
            {canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute right-2 z-20 p-2 bg-gray-50 text-gray-700 hover:text-black"
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
};

export default ProductVarientTab;