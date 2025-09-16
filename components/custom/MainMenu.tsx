import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Menu, CircleX } from "lucide-react";
import { ICategory } from "@/types/category";
import { ISubCategory } from "@/types/subcategory";
import { ISubSubCategory } from "@/types/subsubcategory";
import SwiperImages from "@/components/custom/SwiperImages";
import useClickOutside from "@/hooks/useClickOutside";
import useDisableScroll from "@/hooks/useDisableScroll";

import J1 from "@/app/assets/mainmenu-images/J1.webp";
import J2 from "@/app/assets/mainmenu-images/J2.webp";
import J3 from "@/app/assets/mainmenu-images/J3.webp";
import J4 from "@/app/assets/mainmenu-images/J4.webp";

// Placeholder images (used as fallback)
const placeholderImages = [J1.src, J2.src, J3.src, J4.src];

// SubMenu component with JewelleryMenu design
const SubMenu: React.FC<{
  categoryName: string;
  categoryId: string;
  subcategories: ISubCategory[];
  subsubcategories: ISubSubCategory[];
  images: string[];
}> = ({ categoryName, categoryId, subcategories, subsubcategories, images }) => {
  const subItemClass =
    "relative text-[#252525] hover:text-yellow-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-7 after:bg-yellow-600 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200";

  // Filter subcategories by categoryId
  const filteredSubcategories = subcategories.filter(
    (subcat) => subcat.category === categoryId
  );

  // Debugging: Log filtered subcategories
  console.log(`SubMenu for category "${categoryName}" (ID: ${categoryId}):`, {
    filteredSubcategories,
    subsubcategories,
    images,
  });

  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 custom-container !py-[40px] max-sm:!px-0">
      <h1 className="sm:hidden font-interBold text-[20px] mb-[16px]">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">
        {filteredSubcategories.length > 0 ? (
          filteredSubcategories.map((subcat) => (
            <div key={subcat._id}>
              <div className="mb-[8px] sm:mb-[12px]">
                <Link
                  href={`/subcategories/${subcat._id}`}
                  className="text-black hover:text-gray-600 font-interBold text-[16px]"
                >
                  {subcat.name}
                </Link>
              </div>
              <div className="flex flex-col gap-[8px] font-inter font-light">
                <Link href={`/subcategories/${subcat._id}`} className={subItemClass}>
                  View All
                </Link>
                {subsubcategories
                  .filter((subsub) => subsub.subcategoryId === subcat._id)
                  .map((subsub) => (
                    <Link
                      key={subsub._id}
                      href={`/subsubcategories/${subsub._id}`}
                      className={subItemClass}
                    >
                      {subsub.name}
                    </Link>
                  ))}
                <div className="sm:hidden border-b my-[16px]"></div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading subcategories available for {categoryName}</div>
        )}
      </div>
      <div>
       {/* <SwiperImages images={images.length > 0 ? images : placeholderImages} /> */}
        <SwiperImages images={placeholderImages} />
      </div>
    </div>
  );
};

interface MainMenuProps {
  isNavbarActive: boolean;
  isHomePage: boolean;
  profileSelect: boolean;
  setIsNavbarActive: (active: boolean) => void;
}

export default function MainMenu({
  isNavbarActive,
  isHomePage,
  profileSelect,
  setIsNavbarActive,
}: MainMenuProps) {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMainMenuActive, setIsMainMenuActive] = useState<boolean>(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubCategory[]>([]);
  const [subsubcategories, setSubsubcategories] = useState<ISubSubCategory[]>([]);
  const [subsubcategoryImages, setSubsubcategoryImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        console.log("Fetched categories:", data); // Debugging
        if (data.success) {
          setCategories(data.data.categories);
          setIsLoading(false);
        } else {
          setError(data.message || "Failed to fetch categories");
          setIsLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching categories");
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories and subsubcategories when a category is selected
  useEffect(() => {
    const fetchSubData = async () => {
      if (activeMenu) {
        try {
          const categoryId = categories.find((cat) => cat.name === activeMenu)?._id;
          if (!categoryId) {
            console.warn(`No category ID found for activeMenu: ${activeMenu}`);
            return;
          }

          // Fetch subcategories
          const subcatResponse = await fetch(`/api/subcategory?categoryId=${categoryId}`);
          const subcatData = await subcatResponse.json();
          console.log(`Fetched subcategories for category ID ${categoryId}:`, subcatData); // Debugging
          if (subcatData.success) {
            setSubcategories(subcatData.data.subcategories || []);
          } else {
            setError(subcatData.message || "Failed to fetch subcategories");
          }

          // Fetch subsubcategories and aggregate images
          const subsubcatResponse = await fetch(`/api/subsubcategory?categoryId=${categoryId}`);
          const subsubcatData = await subsubcatResponse.json();
          console.log(`Fetched subsubcategories for category ID ${categoryId}:`, subsubcatData); // Debugging
          if (subsubcatData.success) {
            const subsubcats = subsubcatData.data.subsubcategories || [];
            setSubsubcategories(subsubcats);
            // Aggregate images from subsubcategories (single image field)
            const allImages = subsubcats
              .filter((subsub: ISubSubCategory) => subsub.image && subsub.image.trim() !== "")
              .map((subsub: ISubSubCategory) => subsub.image);
            setSubsubcategoryImages(allImages);
          } else {
            setError(subsubcatData.message || "Failed to fetch subsubcategories");
            setSubsubcategoryImages([]);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("An error occurred while fetching subcategories or subsubcategories");
          setSubsubcategoryImages([]);
        }
      } else {
        setSubcategories([]);
        setSubsubcategories([]);
        setSubsubcategoryImages([]);
      }
    };
    fetchSubData();
  }, [activeMenu, categories]);

  // Handle click outside for mobile menu
  useClickOutside(mobileMenuRef, () => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  });

  // Disable scroll when mobile menu is open
  useDisableScroll(isMobileMenuOpen);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setIsNavbarActive(true);
  };

  return (
    <>
      <div
        className={`items-center justify-between h-[50px] px-4 md:flex hidden w-full md:justify-center `}
      >
        {isLoading ? (
          <div>Loading categories...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : categories.length === 0 ? (
          <div>No categories available</div>
        ) : (
          <div className="flex flex-row overflow-x-auto no-scrollbar md:gap-[16px] lg:gap-[24px]">
            {categories.map((data: ICategory) => (
              <Link
                key={data._id}
                href={`/categories/${data._id}`}
                className={`cursor-pointer px-[12px] py-[6px] my-[9px] rounded-[4px] font-arial text-[14px] leading-[20px] tracking- hover:bg-black hover:text-white ${isNavbarActive ? "text-black" : "text-white"}`}
                onMouseEnter={() => {
                  if (!profileSelect) {
                    setActiveMenu(data.name);
                    setIsMainMenuActive(true);
                    setIsNavbarActive(true);
                  }
                }}
                onMouseLeave={() => {
                  setActiveMenu(null);
                  setIsMainMenuActive(false);
                  if (!profileSelect && isHomePage && !isMainMenuActive) {
                    setIsNavbarActive(false);
                  }
                }}
              >
                {activeMenu === data.name && (
                  <div className="absolute left-0 shadow-sm w-full z-10 bg-[#FFFFFFF5] mt-[28px]">
                    <SubMenu
                      categoryName={data.name}
                      categoryId={data._id || ""}
                      subcategories={subcategories}
                      subsubcategories={subsubcategories}
                      images={subsubcategoryImages}
                    />
                  </div>
                )}
                <p
                  className={`text-xs md:text-[14px]`}
                >
                  {data?.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex md:hidden">
        <button
          onClick={handleMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <Menu
            className={`h-[24px] w-[24px] ${
              isNavbarActive ? "text-black" : "text-white"
            }`}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-[16px] overflow-y-auto ${
            isMobileMenuOpen ? "mt-0" : "mt-[40px]"
          }`}
        >
          <div className="flex items-center justify-between mb-4 gap-[16px]">
            {activeMenu ? (
              <button
                onClick={() => setActiveMenu(null)}
                className="text-[16px] text-gray-600"
              >
                ❮&nbsp;&nbsp; Back
              </button>
            ) : (
              <div />
            )}
            <button
              className="pb-[8px]"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveMenu(null);
              }}
            >
              <CircleX size={32} />
            </button>
          </div>

          {activeMenu ? (
            <div>
              <SubMenu
                categoryName={activeMenu}
                categoryId={categories.find((cat) => cat.name === activeMenu)?._id || ""}
                subcategories={subcategories}
                subsubcategories={subsubcategories}
                images={subsubcategoryImages}
              />
            </div>
          ) : (
            <div className="space-y-[24px] text-lg font-semibold mt-[16px]">
              {isLoading ? (
                <div>Loading categories...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : categories.length === 0 ? (
                <div>No categories available</div>
              ) : (
                categories.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-4 cursor-pointer"
                    onClick={() => setActiveMenu(item.name)}
                  >
                    <span>{item.name}</span>
                    <span>
                      <ChevronRight />
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
