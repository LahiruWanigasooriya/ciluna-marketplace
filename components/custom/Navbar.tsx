"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../app/assets/logo.svg";
import MobLogo from "../../app/assets/moblogo.svg";
import profileIcon from "@/public/assets/header/profileIcon.svg";
import accountActive from "@/public/assets/header/accountIconActive.svg";
import accountIcon from "@/public/assets/header/accountIcon.svg";
import flag from "@/public/assets/header/flag.svg";
import hamburgerMenu from "@/public/assets/header/hamburgerMenu.svg";
import menuActive from "@/public/assets/header/HamburgerMenuActive.svg";
import cartIcon from "@/public/assets/header/cartIcon.svg";
import cartActive from "@/public/assets/header/cartIconActive.svg";
import { Menu, PhoneCall, CircleUser } from "lucide-react";
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
import AuthWrapper from "./AuthWrapper";
//import Cookies from "js-cookie";

interface NavItem {
  icon: React.ElementType | { src: string };
  label: string;
  href: string;
}

export default function Navbar({ categories }: any) {
  const modalRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isMenuOpen, toggleMenu } = useMenuStore();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const scrollY = useMotionValue(0);
  const [shadow, setShadow] = useState<boolean>(false);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const { cart, setCart } = useCartStore();
  const { setWishlist } = useWishlistStore();
  const { token, setAuth, isAuthenticated, clearAuth } = useAuthStore();
  const [profileSelect, setProfileSelect] = useState(false);
  const [mobProfileSelect, setmobProfileSelect] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authPopup, setAuthPopup] = useState(false);
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  // Add hydration state to prevent SSR mismatch
  const [isHydrated, setIsHydrated] = useState(false);

  // Dummy data for categories
  const dummyCategories: ICategory[] = [
    { _id: "1", name: "Women", image: "/images/electronics.png" },
    { _id: "2", name: "Men", image: "/images/fashion.png" },
    { _id: "3", name: "Jewellery", image: "/images/home_kitchen.png" },
    { _id: "4", name: "Occasion Wear", image: "/images/books.png" },
    { _id: "5", name: "Scents", image: "/images/toys.png" },
  ];

  // Use dummy data if categories prop is empty or undefined
  const categoriesToUse =
    categories && categories.length > 0 ? categories : dummyCategories;

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (categoriesToUse.length > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [categoriesToUse]);

  const navItems: NavItem[] = [
    {
      icon: accountIcon,
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      icon: cartIcon,
      label: "Cart",
      href: "/cart",
    },
    {
      icon: CircleUser,
      label: "Account",
      href: "",
    },
    {
      icon: PhoneCall,
      label: isHydrated && token ? "Sign out" : "Sign in",
      href: "",
    },
  ];

  const shadowIntensity = useTransform(scrollY, [0, 50], [0, 0.5]);
  const shadowStyle = useTransform(
    shadowIntensity,
    (value) => `rgba(0, 0, 0, ${value})`
  );

  useClickOutside(modalRef, () => setSearchOpen(false));
  useClickOutside(authRef, () => setAuthPopup(false));
  useClickOutside(menuRef, () => toggleMenu());
  useClickOutside(profileRef, () => setProfileSelect(false));
  useDisableScroll(isMenuOpen);
  useDisableScroll(authPopup);

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
      if (scrolled) {
        setIsNavbarActive(true);
      } else {
        setIsNavbarActive(false);
      }

      setShadow(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (label: string, href: string) => {
    setIsNavbarActive(true);
    router.push(href);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setIsNavbarActive(true);
  };

  const handleAuthAction = async () => {
    setIsNavbarActive(true);
    if (isHydrated && token) {
      try {
        clearAuth();
        localStorage.removeItem("wishlist-storage");
        localStorage.removeItem("cart-storage");
        setCart([]);
        setWishlist([]);
        router.push("/login");
      } catch (error) {
        console.error("❌ Sign out failed:", error);
      }
    } else {
      router.push("/login");
    }
  };

  const handleAuthPopup = () => {
    setAuthPopup(true);
    setIsNavbarActive(true);
  };

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

  const navIconStyle = "ml-0 w-[24px] h-[24px]";
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

  const closePopup = () => {
    setAuthPopup(false);
    setIsNavbarActive(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-50000 ${
        isNavbarActive
          ? "bg-white transition-all duration-50000"
          : "bg-[rgba(255,255,255,0.02)]"
      } ${shadow ? "shadow-md" : ""}`}
      style={{ boxShadow: shadow ? shadowStyle.get() : "none" }}
    >
      <div className="items-center justify-between w-full bg-lightBlack h-[40px] pt-[7px] pb-[12px] px-[24px] flex md:hidden">
        <span className="text-neutralGray font-[400] font-[Arial] text-[14px] leading-[20px] tracking-[0%]">
          Start Shopping Now
        </span>
        <div className="text-white font-[Arial] text-[14px] leading-[20px] flex gap-[24px] font-[700px] items-center">
          <div>sign up</div>
          <div>sign in</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between  relative ">
        <div className="flex w-full max-w-[1440px] mx-auto md:px-[38px] xl:px-[96px] md:pb-[8px] p-[16px] md:pt-[20px] xl:pt-[24px] gap-4">
          <div
            className="cursor-pointer"
            onClick={() => handleNavigation("Home", "/")}
          >
            <Image
              src={isNavbarActive ? MobLogo : Logo}
              alt="Logo"
              className="object-contain min-w-[108px] md:min-w-[130px]"
            />
          </div>

          <div className="flex items-center justify-end w-full">
            <div className="flex justify-end w-full md:w-fit md:w- lg:w-[60%]">
              <SearchField
                aria-label="Search"
                isNavbarActive={isNavbarActive}
                className={`w-full h-[26px] flex justify-end text-left lg:text-center ${
                  isNavbarActive ? "text-black" : "text-white"
                }`}
              />
            </div>

            <div className="flex items-center  md:space-x-4 lg:space-x-[24px] max-w-[150px] w-fit md:max-w-fit md:w-full md:min-w-[297px">
              <div className="flex md:min-w-[77px]">
                <img
                  src={flag.src}
                  alt="Language Flag"
                  className="min-w-[24px] flex h-[24px] cursor-pointer mr-[12px] md:mr-[8px] "
                />
                <p
                  className={`text-xs lg:text-sm font-inter hidden md:flex font-light cursor-pointer leading-[24px] ${
                    isNavbarActive ? "text-black" : "text-white"
                  }`}
                >
                  EN (UK)
                </p>
              </div>
              <div className="flex items-center md:space-x-4 lg:space-x-[16px]">
                <Link href="/cart" className="relative">
                  <img
                    src={
                      pathname === "/cart" || isNavbarActive
                        ? cartActive.src
                        : cartIcon.src
                    }
                    alt="Cart Icon"
                    className={`${navIconStyle} min-w-[24px] h-[24px] mr-[12px] md:mr-0 ${
                      isNavbarActive ? "text-black" : "text-white"
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
                      toggleMenu();
                      setIsNavbarActive(true);
                    }}
                    aria-label="Open menu"
                  >
                    <img
                      src={isNavbarActive ? menuActive.src : hamburgerMenu.src}
                      alt="Menu Icon"
                      className={`${navIconStyle} min-w-[24px] h-[24px]`}
                    />
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="items-center justify-center hidden md:flex">
                    {isHydrated && isAuthenticated ? (
                      <>
                        <div
                          onClick={handleProfile}
                          className="flex items-center cursor-pointer justify-center rounded-full bg-lightGreen text-black font-loraBold text-sm uppercase w-[24px] aspect-square"
                        >
                          <Image
                            src={profileIcon}
                            alt="Profile Icon"
                            className="object-contain w-[24px] hover:cursor-pointer"
                            width={24}
                            height={24}
                          />
                        </div>
                        <div
                          className={`h-[24px] w-[1px] ml-[16px] flex justify-center items-center ${
                            isNavbarActive ? "bg-lightBlack" : "bg-white"
                          }`}
                        ></div>
                        <div className="flex items-center w-full md:w-[239px] ml-[16px]">
                          <span
                            className={`font-lora font-normal not-italic text-[14px] leading-[20px] tracking-[0%] cursor-pointer hidden md:flex ${
                              isNavbarActive ? "text-lightBlack" : "text-white"
                            } `}
                          >
                            C Cash :<span className="mx-1.5">1,209,436.26</span>
                            C Cash : <span className="ml-1.5">4,000</span>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={
                            isNavbarActive ? accountActive.src : accountIcon.src
                          }
                          alt="Account Icon"
                          className={`${navIconStyle} cursor-pointer`}
                        />
                        <span
                          onClick={handleAuthPopup}
                          className={`text-xs md:text-sm cursor-pointer md:ml-[12px] hidden md:flex ${
                            isNavbarActive ? "text-black" : "text-white"
                          }`}
                        >
                          Sign in / Register
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {profileSelect && (
                  <motion.div
                    ref={profileRef}
                    initial="hidden"
                    animate="visible"
                    variants={popupVariants}
                    className={`flex flex-col items-start backdrop-blur-md z-10 cursor-pointer bg-[#FFFFFF]/90 py-[13px] w-[188px] rounded-[10px] text-sm absolute top-11 right-[150px] ${
                      isNavbarActive ? "text-black" : "text-white"
                    }`}
                  >
                    <Link
                      href="/profile"
                      className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] ${
                        pathname === "/profile"
                          ? "text-blue"
                          : isNavbarActive
                          ? "text-black"
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
                          ? "text-blue"
                          : isNavbarActive
                          ? "text-black"
                          : "text-white"
                      }`}
                      onClick={() => setProfileSelect(false)}
                    >
                      Order History
                    </Link>
                    <div
                      onClick={handleLogout}
                      className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] ${
                        isNavbarActive ? "text-black" : "text-white"
                      }`}
                    >
                      Sign out
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="hidden items-center gap-4">
              <p
                onClick={handleAuthAction}
                className={`text-xs font-[400] cursor-pointer hover:opacity-75 ${
                  isNavbarActive ? "text-black" : "text-white"
                }`}
              >
                {isHydrated && token ? "Sign out" : "Sign in"}
              </p>
              <Menu
                onClick={() => {
                  toggleMenu();
                  setIsNavbarActive(true);
                }}
                className={isNavbarActive ? "text-black" : "text-white"}
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
                    isNavbarActive ? "text-black" : "text-white"
                  }`}
                />
                <button id="sendButton" className="pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 664 663"
                    className={isNavbarActive ? "text-black" : "text-white"}
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
            {authPopup && (
              <div className="fixed inset-0 flex justify-center items-center py-4 bg-fg/80 z-50">
                <AuthWrapper ref={authRef} closePopup={closePopup} />
              </div>
            )}
          </div>
        </div>

        <div
          className={`rounded-[9px] items-center justify-between border-none h-[50px] px-4 md:flex hidden ${
            isNavbarActive ? "bg-white/90 " : ""
          }`}
        >
          <div className="flex flex-row overflow-x-auto no-scrollbar md:space-x-[15px] lg:space-x-[24px]">
            {categoriesToUse && categoriesToUse.length > 0
              ? categoriesToUse.map((data: ICategory) => (
                  <Link
                    key={data._id}
                    href={`/subcategories/${data._id}`}
                    className="cursor-pointer border border-transparent hover:border-solid hover:border-gray-300  px-[12px] py-[6px] my-[9px] rounded-[4px]"
                  >
                    <p
                      className={`text-xs lg:text-[14px] ${
                        isNavbarActive ? "text-lightBlack" : "text-white"
                      }`}
                    >
                      {data?.name}
                    </p>
                  </Link>
                ))
              : null}
          </div>
          {/* <SearchField
            aria-label="Search"
            className="text-white w-full custom-textfield"
          />
          <div className="w-full justify-end flex" onClick={handleAuthAction}>
            <p className="text-sm font-[400] cursor-pointer hover:opacity-75 text-white">
              {token ? "Sign out" : "Sign in"}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
