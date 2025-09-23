"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface IVariant {
  _id: string;
  name: string;
  subcategoryId: string; // Ensure subcategoryId is included for filtering
}

interface ProductVarientTabProps {
  subcategoryId: string; // receive current subcategory ID
}

const ProductVarientTab: React.FC<ProductVarientTabProps> = ({
  subcategoryId,
}) => {
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [active, setActive] = useState<string>("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize active state based on subsubcategoryId from URL
  useEffect(() => {
    const subsubcategoryId = searchParams.get("subsubcategoryId");
    if (subsubcategoryId) {
      setActive(subsubcategoryId);
    } else {
      setActive("all");
    }
  }, [searchParams]);

  // Log subcategoryId for debugging
  useEffect(() => {
    console.log("Received subcategoryId in client component:", subcategoryId);
  }, [subcategoryId]);

  // Fetch subsubcategories for the current subcategory
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await fetch(
          `/api/subsubcategory?subcategoryId=${subcategoryId}`
        );
        const data = await res.json();
        console.log("Fetched subsubcategories:", data);
        if (data.success && data.data && data.data.subsubcategories) {
          // Ensure only subsubcategories matching subcategoryId are set
          const filteredVariants = data.data.subsubcategories.filter(
            (subsub: IVariant) => subsub.subcategoryId === subcategoryId
          );
          setVariants(filteredVariants);
        } else {
          console.warn(
            "Failed to fetch subsubcategories:",
            data.message || "No data"
          );
          setVariants([]);
        }
      } catch (err) {
        console.error("Failed to fetch subsubcategories:", err);
        setVariants([]);
      }
    };

    if (subcategoryId) {
      fetchVariants();
    } else {
      setVariants([]);
    }
  }, [subcategoryId]);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const handleResize = () => checkScrollability();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [variants]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 206;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 206;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleVariantClick = (variantId: string) => {
    setActive(variantId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("subsubcategoryId", variantId);
    params.set("page", "1"); // Reset to page 1 when changing subsubcategory
    router.push(`?${params.toString()}`);
  };

  const handleViewAllClick = () => {
    setActive("all");
    const params = new URLSearchParams(searchParams.toString());

    // remove subsubcategory filter
    params.delete("subsubcategoryId");

    // force keep current subcategoryId
    if (subcategoryId) {
      params.set("subcategoryId", subcategoryId);
    }

    // reset page
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center w-full bg-gray-50">
      <div
        ref={scrollContainerRef}
        className="flex items-center w-full overflow-x-auto scrollbar-hide gap-0 whitespace-nowrap"
        onScroll={checkScrollability}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-4 min-w-[206px] w-[206px] h-[52px] 
            text-sm leading-5 font-medium 
            ${
              active === "all"
                ? "bg-black text-white"
                : "bg-gray-50 text-gray-700 hover:text-black"
            }`}
          onClick={handleViewAllClick}
          style={{ width: "206px", minWidth: "206px" }}
        >
          <ChevronLeft size={16} />
          View All
        </button>

        {variants.map((variant) => (
          <button
            key={variant._id}
            className={`flex-shrink-0 px-6 py-4 min-w-[206px] w-[206px] h-[52px] text-sm leading-5 font-medium 
              ${
                active === variant._id
                  ? "bg-black text-white"
                  : "bg-gray-50 text-gray-700 hover:text-black"
              }`}
            onClick={() => handleVariantClick(variant._id)}
            style={{ width: "206px", minWidth: "206px" }}
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
