import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Menu, CircleX } from "lucide-react";
import { ICategory } from "@/types/category";
import { ISubCategory } from "@/types/subcategory";
import { ISubSubCategory } from "@/types/subsubcategory";
import SwiperImages from "@/components/custom/SwiperImages";
import useClickOutside from "@/hooks/useClickOutside";
import useDisableScroll from "@/hooks/useDisableScroll";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import J1 from "@/app/assets/mainmenu-images/J1.webp";
import J2 from "@/app/assets/mainmenu-images/J2.webp";
import J3 from "@/app/assets/mainmenu-images/J3.webp";
import J4 from "@/app/assets/mainmenu-images/J4.webp";

// Categories Menu -----------------------------------------------------------------------

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
  const [subsubcategories, setSubsubcategories] = useState<ISubSubCategory[]>(
    []
  );
  const [subsubcategoryImages, setSubsubcategoryImages] = useState<string[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, setIsNavbarActive]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        if (data.success) {
          setCategories(data.data.categories);
          setIsLoading(false);
        } else {
          setError(data.message || "Failed to fetch categories");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Fetch /api/category error:", err);
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
          const categoryId = categories.find(
            (cat) => cat.name === activeMenu
          )?._id;
          if (!categoryId) {
            console.warn(`No category ID found for activeMenu: ${activeMenu}`);
            return;
          }

          // Fetch subcategories
          const subcatResponse = await fetch(
            `/api/subcategory?categoryId=${categoryId}`
          );
          const subcatData = await subcatResponse.json();
          console.log(
            `Fetched subcategories for category ID ${categoryId}:`,
            subcatData
          ); // Debugging
          if (subcatData.success) {
            setSubcategories(subcatData.data.subcategories || []);
          } else {
            setError(subcatData.message || "Failed to fetch subcategories");
          }

          // Fetch subsubcategories and aggregate images
          const subsubcatResponse = await fetch(
            `/api/subsubcategory?categoryId=${categoryId}`
          );
          const subsubcatData = await subsubcatResponse.json();
          console.log(
            `Fetched subsubcategories for category ID ${categoryId}:`,
            subsubcatData
          ); // Debugging
          if (subsubcatData.success) {
            const subsubcats = subsubcatData.data.subsubcategories || [];
            setSubsubcategories(subsubcats);
            // Aggregate images from subsubcategories (single image field)
            const allImages = subsubcats
              .filter(
                (subsub: ISubSubCategory) =>
                  subsub.image && subsub.image.trim() !== ""
              )
              .map((subsub: ISubSubCategory) => subsub.image);
            setSubsubcategoryImages(allImages);
          } else {
            setError(
              subsubcatData.message || "Failed to fetch subsubcategories"
            );
            setSubsubcategoryImages([]);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError(
            "An error occurred while fetching subcategories or subsubcategories"
          );
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

  // Handle category selection (without navigation)
  const handleCategoryClick = (categoryName: string) => {
    if (!profileSelect) {
      setActiveMenu(categoryName);
      setIsMainMenuActive(true);
      setIsNavbarActive(true);
    }
  };

  return (
    <>
      {/* Desktop Menu */}
      <div className="relative items-center justify-between md:flex hidden w-full md:justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <AiOutlineLoading3Quarters className="text-2xl text-white" />
            </motion.div>
            <motion.span
              className="text-white text-sm font-medium"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Loading Categories...
            </motion.span>
          </div>
        ) : error ? (
          <div className="text-red-500 font-medium py-6">Error: {error}</div>
        ) : categories.length === 0 ? (
          <div>No categories available</div>
        ) : (
          <div
            className="relative flex justify-center w-full"
            onMouseLeave={() => {
              setActiveMenu(null);
              if (isHomePage && !isScrolled) {
                setIsNavbarActive(false);
              }
            }}
          >
            {/* categories row */}
            <div className="flex flex-row overflow-x-auto no-scrollbar md:gap-[16px] lg:gap-[24px] relative">
              {categories.map((data) => {
                const isActive = activeMenu === data.name;
                return (
                  <button
                    key={data._id}
                    type="button"
                    className={`relative cursor-pointer px-[12px] py-[6px] my-[9px] rounded-[4px] font-arial text-[14px] leading-[20px] transition-colors ${
                      isNavbarActive ? "text-black" : "text-white"
                    } hover:bg-black hover:text-white`}
                    onClick={() => handleCategoryClick(data.name)}
                    onMouseEnter={() => handleCategoryClick(data.name)}
                  >
                    <p className="text-xs md:text-[14px]">{data.name}</p>
                  </button>
                );
              })}
            </div>

            {/* submenu */}
            {isMainMenuActive && activeMenu && (
              <motion.div
                className="absolute left-0 top-full shadow-sm w-full z-10 bg-[#FFFFFF]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <SubMenu
                  categoryName={activeMenu}
                  categoryId={
                    categories.find((c) => c.name === activeMenu)?._id || ""
                  }
                  subcategories={subcategories}
                  subsubcategories={subsubcategories}
                  images={subsubcategoryImages}
                  setMobileMenuOpen={setMobileMenuOpen}
                  setActiveMenu={setActiveMenu}
                />
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}

      <div className="flex md:hidden">
        <button onClick={handleMenuToggle} aria-label="Toggle mobile menu">
          <Menu
            className={`h-[24px] w-[24px] ${
              isNavbarActive ? "text-black" : "text-white"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-[16px] overflow-y-auto"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between mb-4 gap-[16px]">
              {activeMenu ? (
                <motion.button
                  type="button"
                  onClick={() => setActiveMenu(null)}
                  className="text-[16px] text-[#252525]"
                  whileTap={{ scale: 0.95 }}
                >
                  ❮&nbsp;&nbsp; Back
                </motion.button>
              ) : (
                <div />
              )}
              <motion.button
                type="button"
                className="pb-[8px]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveMenu(null);
                }}
                whileTap={{ scale: 0.9 }}
              >
                <CircleX size={32} />
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {activeMenu ? (
                <motion.div
                  key="submenu"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SubMenu
                    categoryName={activeMenu}
                    categoryId={
                      categories.find((cat) => cat.name === activeMenu)?._id ||
                      ""
                    }
                    subcategories={subcategories}
                    subsubcategories={subsubcategories}
                    images={subsubcategoryImages}
                    setMobileMenuOpen={setMobileMenuOpen}
                    setActiveMenu={setActiveMenu} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="mainmenu"
                  className="space-y-[24px] text-lg font-semibold mt-[16px]"
                  initial={{ x: -1000, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -1000, opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 py-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      >
                        <AiOutlineLoading3Quarters className="text-2xl text-gray-600" />
                      </motion.div>
                      <span className="text-[#252525] text-sm font-medium">
                        Loading Categories...
                      </span>
                    </div>
                  ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                  ) : categories.length === 0 ? (
                    <div className="text-gray-600">No categories available</div>
                  ) : (
                    categories.map((item) => (
                      <motion.div
                        key={item._id}
                        className="flex justify-between items-center border-b-[0.5px] border-[#E1E1E1] pb-4 cursor-pointer text-[16px] font-arialBold text-[#252525]"
                        onClick={() => setActiveMenu(item.name)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{item.name}</span>
                        <span>
                          <ChevronRight />
                        </span>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Subcategories,Sub-subcategories Menu -----------------------------------------------------------------------

// Placeholder images (used as fallback)
const placeholderImages = [J1.src, J2.src, J3.src, J4.src];

const SubMenu: React.FC<{
  categoryName: string;
  categoryId: string;
  subcategories: ISubCategory[];
  subsubcategories: ISubSubCategory[];
  images: string[];
  setMobileMenuOpen: (open: boolean) => void;
  setActiveMenu: (menu: string | null) => void;
}> = ({
  categoryName,
  categoryId,
  subcategories,
  subsubcategories,
  images,
  setMobileMenuOpen,
  setActiveMenu,
}) => {
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

  const handleSubSubCategoryClick = (subsubName: string) => {
    console.log(`Clicked sub-subcategory: ${subsubName}`); // Debug log
    setMobileMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <div className="grid sm:grid-cols-[75%_25%] grid-cols-1 custom-container !py-[40px] max-sm:!px-0">
      <h1 className="sm:hidden font-arialBold text-[20px] mb-[16px] text-[#252525]">
        {categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-[16px] md:gap-y-[30px] w-full">
        {filteredSubcategories.length > 0 ? (
          filteredSubcategories.map((subcat) => (
            <div key={subcat._id}>
              <div className="mb-[8px] sm:mb-[12px]">
                <span className="text-black hover:text-gray-600 font-arialBold text-[16px]">
                  {subcat.name}
                </span>
              </div>

              <div className="flex flex-col gap-[8px] font-arial text-[14px]">
                <Link
                  href={`/product?subcategoryId=${subcat._id}`}
                  className={subItemClass}
                  onClick={() => {
                    console.log(
                      `Clicked View All for subcategory: ${subcat.name}`
                    ); // Debug log
                    setMobileMenuOpen(false);
                    setActiveMenu(null);
                  }}
                >
                  View All
                </Link>
                {subsubcategories
                  .filter((subsub) => subsub.subcategoryId === subcat._id)
                  .map((subsub) => (
                    <Link
                      key={subsub._id}
                      href={`/product?subsubcategoryId=${subsub._id}`}
                      className={subItemClass}
                      onClick={() => handleSubSubCategoryClick(subsub.name)}
                    >
                      {subsub.name}
                    </Link>
                  ))}
                <div className="sm:hidden border-b-[0.5px] border-[#E1E1E1] my-[16px]"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2 text-gray-600">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <AiOutlineLoading3Quarters className="text-xl" />
            </motion.div>
            <span className="text-sm font-medium">
              Loading subcategories for {categoryName}...
            </span>
          </div>
        )}
      </div>
      <div>
        <SwiperImages images={placeholderImages} />
      </div>
    </div>
  );
};
