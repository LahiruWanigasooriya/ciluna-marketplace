"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Menu, CircleX, ChevronRight } from "lucide-react";
import { BsHandbag } from "react-icons/bs";
import Logo from "../../app/assets/logo.svg";
import MobLogo from "../../app/assets/moblogo.svg";
import profileIcon from "@/public/assets/header/profileIcon.svg";
import flag from "@/public/assets/header/flag.svg";
import hamburgerMenu from "@/public/assets/header/hamburgerMenu.svg";
import menuActive from "@/public/assets/header/HamburgerMenuActive.svg";
import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";
import { motion, useTransform, useMotionValue } from "framer-motion";
import useMenuStore from "@/store/useMenuStore";
import { SearchField } from "@/components/ui/search-field";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
//import { clearAuthToken } from "@/actions/utils/auth";
import { useAuthStore } from "@/store/authStore";
import useDisableScroll from "@/hooks/useDisableScroll";
import { ICategory } from "@/types/category";
//import { Skeleton } from "@/components/ui";
//import AuthWrapper from "./AuthWrapper";
//import Cookies from "js-cookie";
import WomenMenu from "@/components/custom/Submenus/WomenMenu";
import MenMenu from "@/components/custom/Submenus/MenMenu";
import JewelleryMenu from "@/components/custom/Submenus/JewelleryMenu";
import OccasionWearMenu from "@/components/custom/Submenus/OccasionWearMenu";
import ScentsMenu from "@/components/custom/Submenus/ScentsMenu";

export default function Navbar({ categories }: any) {
  const modalRef = useRef<HTMLDivElement>(null);
  //  const authRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { isMenuOpen, toggleMenu } = useMenuStore();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [searchOpen, setSearchOpen] = React.useState(false);
  const scrollY = useMotionValue(0);
  const [shadow, setShadow] = useState<boolean>(false);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const { cart, setCart } = useCartStore();
  const { setWishlist } = useWishlistStore();
  const { token, setAuth, clearAuth, isAuthenticated } = useAuthStore();
  const [profileSelect, setProfileSelect] = useState(false);
  const [mobProfileSelect, setmobProfileSelect] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMainMenuActive, setIsMainMenuActive] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  //  const [authPopup, setAuthPopup] = useState(false);
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  // Dummy data for categories
  const dummyCategories: ICategory[] = [
    { _id: "1", name: "Women", component: WomenMenu },
    { _id: "2", name: "Men", component: MenMenu },
    { _id: "3", name: "Jewellery", component: JewelleryMenu },
    { _id: "4", name: "Occasion Wear", component: OccasionWearMenu },
    { _id: "5", name: "Scents", component: ScentsMenu },
  ];

  // Use dummy data if categories prop is empty or undefined
  const categoriesToUse =
    categories && categories.length > 0 ? categories : dummyCategories;

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    if (categoriesToUse.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [categoriesToUse]);

  const shadowIntensity = useTransform(scrollY, [0, 50], [0, 0.5]);
  const shadowStyle = useTransform(
    shadowIntensity,
    (value) => `rgba(0, 0, 0, ${value})`
  );

  useClickOutside(modalRef, () => setSearchOpen(false));
  //  useClickOutside(authRef, () => setAuthPopup(false));
  useClickOutside(menuRef, () => toggleMenu());
  useClickOutside(profileRef, () => setProfileSelect(false));
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));
  useDisableScroll(isMenuOpen || isMobileMenuOpen); // Added isMobileMenuOpen to disable scroll

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (wishlist.length > 0) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500);
    }
  }, [wishlist.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (
        scrolled ||
        !isHomePage ||
        isMenuOpen ||
        profileSelect ||
        isMainMenuActive
      ) {
        setIsNavbarActive(true);
      } else {
        setIsNavbarActive(false);
      }

      setShadow(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isMenuOpen, profileSelect, isMainMenuActive]);

  const handleNavigation = (label: string, href: string) => {
    setIsNavbarActive(true);
    setMobileMenuOpen(false); // Close mobile menu on navigation
    router.push(href);
  };

  {
    /*
    const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setIsNavbarActive(true);
  }; */
  }

  const handleAuthAction = async () => {
    if (token) {
      try {
        // await clearAuthToken();
        clearAuth();
        localStorage.removeItem("wishlist-storage");
        localStorage.removeItem("cart-storage");
        setCart([]);
        setWishlist([]);
        setAuth("", false);
        router.push("/login");
      } catch (error) {
        console.error("❌ Sign out failed:", error);
      }
    } else {
      router.push("/login");
    }
  };

  {
    /*  const handleAuthPopup = () => {
    setAuthPopup(true);
    setIsNavbarActive(true);
  }; */
  }

  const handleLogout = async () => {
    setIsNavbarActive(true);
    setTimeout(() => {
      clearAuth();
      setProfileSelect(false);
      localStorage.removeItem("wishlist-storage");
      localStorage.removeItem("cart-storage");
      setCart([]);
      setWishlist([]);
      setAuth("", false);
    }, 1000);
  };

  const handleProfile = () => {
    setProfileSelect(!profileSelect);
    setmobProfileSelect(!mobProfileSelect);
    setIsNavbarActive(true);
  };

  const popupVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const popupVariants2 = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const handleProfileClick = () => {
    toggleMenu();
    setIsNavbarActive(true);
  };

  {
    /*  const closePopup = () => {
    setAuthPopup(false);
    setIsNavbarActive(true);
  }; */
  }

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const subMenus: Record<string, React.FC> = {
    Women: WomenMenu,
    Men: MenMenu,
    Jewellery: JewelleryMenu,
    "Occasion Wear": OccasionWearMenu,
    Scents: ScentsMenu,
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-50000 font-arial leading-[20px] ${
        isNavbarActive
          ? "bg-white transition-all duration-50000 border-b border-black/5"
          : "bg-[rgba(255,255,255,0.02)] glass-navbar"
      } ${shadow ? "shadow-md" : ""}`}
      style={{ boxShadow: shadow ? shadowStyle.get() : "none" }}
    >
      <div
        className={`items-center justify-between w-full bg-lightBlack h-[40px] pt-[7px] pb-[12px] px-[24px] flex md:hidden ${
          mounted && isAuthenticated ? "hidden" : "flex"
        }`}
      >
        <span className="text-neutralGray-600 font-[400] font-[Arial] text-[14px] leading-[20px] tracking-[0%]">
          Start Shopping Now
        </span>
        <div className="text-white font-[Arial] text-[14px] leading-[20px] flex gap-[24px] font-[700px] items-center">
          <button onClick={() => router.push("/register")} className="">
            sign up
          </button>
          <button onClick={() => router.push("/login")} className="">
            sign in
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between relative">
        <div className="flex w-full max-w-[1440px] mx-auto md:px-[32px] lg:px-[72px] xl:px-[84px] recommend:px-[96px] md:pb-[8px] p-[16px] md:pt-[20px] xl:pt-[24px] gap-[12px] lg:gap-[24px] ">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => handleNavigation("Home", "/")}
          >
            <Image
              src={isNavbarActive ? MobLogo : Logo}
              alt="Logo"
              className="object-contain w-[108px] md:min-w-[130px]"
            />
          </div>

          <div className="flex items-center justify-end w-full">
            <div className="flex flex-1 justify-end w-full">
              <SearchField
                aria-label="Search"
                isNavbarActive={isNavbarActive}
                className={`w-full h-[26px] flex justify-end text-left lg:text-center ${
                  isNavbarActive ? "text-gray" : "text-white"
                }`}
              />
            </div>

            <div className="flex items-center gap-[12px] lg:gap-[24px] w-fit">
              <div className="flex md:min-w-fit">
                <img
                  src={flag.src}
                  alt="Language Flag"
                  className="w-[24px] flex h-[24px] ml-[12px] lg:ml-[24px] md:mr-[8px]"
                />
                <p
                  className={`text-xs lg:text-sm font-inter hidden md:flex font-light leading-[24px] ${
                    isNavbarActive ? "text-gray" : "text-white"
                  }`}
                >
                  EN (UK)
                </p>
              </div>
              <Link href="/wishlist">
                <motion.div
                  animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`h-[24px] w-[24px] ${
                      isAnimating
                        ? "text-red-300"
                        : isNavbarActive
                        ? "text-gray"
                        : "text-white"
                    }`}
                  />
                </motion.div>
              </Link>
              <Link href="/cart" className="relative">
                <BsHandbag
                  className={`min-w-[24px] h-[24px] md:mr-0 ${
                    isNavbarActive ? "text-gray" : "text-white"
                  }`}
                />
                {cart.length > 0 && (
                  <div className="absolute -top-4 -right-2 md:-top-3 md:-right-3">
                    <button
                      className="rotation-animation conic-gradient transform-gpu cursor-pointer rounded-full p-px shadow-[0_0_20px_0_rgba(245,48,107,0.1)] hue-rotate-[190deg] invert transition-all dark:hue-rotate-0 dark:invert-0"
                      style={{
                        background:
                          "conic-gradient(from calc(var(--r2) - 80deg) at var(--x) 15px, transparent 0, #090979 10%, transparent 25%), #4A55E2 ",
                      }}
                      type="button"
                    >
                      <span
                        className={`pointer-events-none flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full bg-[#190F30] p-2 font-medium text-blue text-xxs tracking-tighter`}
                      >
                        {cart.length}
                      </span>
                    </button>
                  </div>
                )}
              </Link>

              <div className="flex md:hidden">
                <button
                  onClick={() => {
                    setMobileMenuOpen(!isMobileMenuOpen);
                    setIsNavbarActive(true);
                  }}
                  aria-label="Toggle mobile menu"
                >
                  <img
                    src={
                      isMobileMenuOpen || isNavbarActive
                        ? menuActive.src
                        : hamburgerMenu.src
                    }
                    alt="Menu Icon"
                    className={`min-w-[24px] h-[24px]`}
                  />
                </button>
              </div>
            </div>
            <div className="items-center justify-center hidden md:flex md:ml-[12px] lg:ml-[16px] ">
              {mounted && isAuthenticated ? (
                <>
                  <div className="flex items-center w-full">
                    <span
                      className={`font-lora font-normal not-italic text-[14px] leading-[20px] tracking-[0%] cursor-pointer hidden md:flex ${
                        isNavbarActive ? "text-lightBlack" : "text-white"
                      } `}
                    >
                      C Cash : 1,209,436.26
                      <div
                        className={`h-[20px] w-[1px] md:mx-[8px] flex justify-center items-center ${
                          isNavbarActive ? "bg-lightBlack" : "bg-white"
                        }`}
                      ></div>
                      C Cash : 4,000
                    </span>
                  </div>
                  <div
                    onClick={handleProfile}
                    className="flex items-center relative cursor-pointer justify-center rounded-full bg-lightGreen text-gray font-arial text-sm w-[24px] aspect-square ml-[6px]"
                  >
                    <Image
                      src={profileIcon}
                      alt="Profile Icon"
                      className="object-contain w-[24px] hover:cursor-pointer"
                      width={24}
                      height={24}
                    />
                    {profileSelect && (
                      <motion.div
                        ref={profileRef}
                        initial="hidden"
                        animate="visible"
                        variants={popupVariants}
                        className={`flex flex-col items-start backdrop-blur-md z-10 cursor-pointer bg-[#FFFFFF]/90 py-[13px] w-[188px] rounded-[10px] text-sm absolute top-7 right-[0px] border border-lightgray ${
                          isNavbarActive ? "text-gray" : "text-white"
                        }`}
                      >
                        <Link
                          href="/profile"
                          className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] ${
                            pathname === "/profile"
                              ? "font-[Arial] font-bold"
                              : isNavbarActive
                              ? "text-gray"
                              : "text-white"
                          }`}
                          onClick={() => setProfileSelect(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          href="/profile/history"
                          className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] ${
                            pathname === "/profile/history"
                              ? "font-[Arial] font-bold"
                              : isNavbarActive
                              ? "text-gray"
                              : "text-white"
                          }`}
                          onClick={() => setProfileSelect(false)}
                        >
                          Order History
                        </Link>
                        <div
                          onClick={handleLogout}
                          className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] ${
                            isNavbarActive ? "text-gray" : "text-white"
                          }`}
                        >
                          Sign out
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span
                    onClick={() => router.push("/login")}
                    className={`text-xs md:text-sm cursor-pointer hidden md:flex ${
                      isNavbarActive ? "text-gray" : "text-white"
                    }`}
                  >
                    Sign in / Register
                  </span>
                </>
              )}
            </div>
            <div className="hidden items-center gap-4">
              <p
                onClick={handleAuthAction}
                className={`text-xs font-[400] cursor-pointer hover:opacity-75 ${
                  isNavbarActive ? "text-gray" : "text-white"
                }`}
              >
                {mounted && isAuthenticated ? "Sign out" : "Sign in"}
              </p>
              <Menu
                onClick={() => {
                  toggleMenu();
                  setIsNavbarActive(true);
                }}
                className={isNavbarActive ? "text-gray" : "text-white"}
              />
            </div>
            {searchOpen && (
              <motion.div
                ref={modalRef}
                initial={{ width: 0, opacity: 0 }}
                animate={
                  searchOpen
                    ? { width: "84vw", opacity: 1 }
                    : { width: 0, opacity: 0 }
                }
                transition={{ duration: 0.2 }}
                className="absolute top-0 z-40 flex items-center justify-between w-[84vw] border border-solid rounded-[8px] h-8"
              >
                <input
                  type="text"
                  className={`bg-[#190F30] focus:outline-none border-none w-full px-2 font-[400] text-xs ${
                    isNavbarActive ? "text-gray" : "text-white"
                  }`}
                />
                <button id="sendButton" className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 664 663"
                    className={isNavbarActive ? "text-gray" : "text-white"}
                  >
                    <path
                      fill="none"
                      d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="33.67"
                      stroke={isNavbarActive ? "#000000" : "#6c6c6c"}
                      d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                    ></path>
                  </svg>
                </button>
              </motion.div>
            )}
            {/* {authPopup && (
              <div className="fixed inset-0 flex justify-center items-center py-4 bg-fg/80 z-50">
                <AuthWrapper ref={authRef} closePopup={closePopup} />
              </div>
            )} */}
          </div>
        </div>
        <div
          className={` mx-auto w-[80%] max-w-[1248px] hidden md:flex ${
            isNavbarActive
              ? "line-gradient-header h-[1px]"
              : "line-gradient-header h-[0.5px]"
          }`}
        ></div>

        <div
          className={`rounded-[9px] items-center justify-between border-none h-[50px] px-4 md:flex hidden`}
        >
          <div className="flex flex-row overflow-x-auto no-scrollbar md:gap-[16px] lg:gap-[24px]">
            {categoriesToUse && categoriesToUse.length > 0 && mounted
              ? categoriesToUse.map((data: ICategory) => (
                  <Link
                    key={data._id}
                    href={`/subcategories/${data._id}`}
                    className="cursor-pointer border border-transparent hover:border-solid hover:border-black px-[12px] py-[6px] my-[9px] rounded-[4px] font-arial leading-[20px] "
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
                      if (!profileSelect && isHomePage) {
                        setIsNavbarActive(false);
                      }
                    }}
                  >
                    {activeMenu === data.name && (
                      <div className="absolute left-0 shadow-sm w-full  z-10 bg-[#FFFFFFF5] mt-[28px]">
                        {React.createElement(data.component)}
                      </div>
                    )}
                    <p
                      className={`text-xs md:text-[14px] ${
                        isNavbarActive ? "text-lightBlack" : "text-white"
                      }`}
                    >
                      {data?.name}
                    </p>
                  </Link>
                ))
              : null}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-[16px] overflow-y-auto ${
              mounted && isAuthenticated ? "mt-0" : "mt-[40px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb- gap-[16px]">
              {mounted && isAuthenticated && !activeMobileMenu ? (
                <>
                  <Link
                    href="/profile"
                    className={`flex items-center relative cursor-pointer justify-center rounded-full bg-lightGreen text-gray font-arial text-sm w-[52px] h-[52px] aspect-square `}
                    onClick={() => {
                      setProfileSelect(false);
                      setMobileMenuOpen(!isMobileMenuOpen);
                      setIsNavbarActive(true);
                    }}
                  >
                    <Image
                      src={profileIcon}
                      alt="Profile Icon"
                      className="object-contain hover:cursor-pointer"
                      width={48}
                      height={48}
                    />
                  </Link>

                  <div className="flex w-full flex-col">
                    <div className="font-[Arial] font-bold text-[16px] leading-[24px] text-lightBlack">
                      Hiran Anuraja
                    </div>
                    <div className="font-[Arial] text-[14px] leading-[20px] text-grayNeutralFg">
                      Last login : Yesterday 11.39am
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {activeMobileMenu ? (
                <button
                  onClick={() => setActiveMobileMenu(null)}
                  className="text-[16px] text-gray-600"
                >
                  ❮&nbsp;&nbsp; Back
                </button>
              ) : (
                <div />
              )}
              <button
                className="pb-[8px] "
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveMobileMenu(null);
                }}
              >
                <CircleX size={32} />
              </button>
            </div>

            {/* Submenu View */}
            {activeMobileMenu ? (
              <div>{React.createElement(subMenus[activeMobileMenu])}</div>
            ) : (
              // Main Menu View
              <div className="space-y-[24px] text-lg font-semibold mt-[16px]">
                {mounted && isAuthenticated ? (
                  <div className="flex flex-col gap-[8px] bg-lightgray p-[8px] rounded-[8px]">
                    <span className="flex justify-between font-[Arial] font-normal text-[16px] leading-[24px]">
                      C Cash <span className="font-bold"> 1,209,436.26 </span>
                    </span>
                    <span className="flex justify-between font-[Arial] font-normal text-[16px] leading-[24px]">
                      C USD <span className="font-bold"> 4,000 </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {Object.keys(subMenus).map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center border-b pb-4 cursor-pointer"
                    onClick={() => setActiveMobileMenu(item)}
                  >
                    <span>{item}</span>
                    <span>
                      <ChevronRight />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
