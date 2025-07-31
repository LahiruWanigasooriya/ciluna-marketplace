"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../app/assets/logo.png";
import MobLogo from "../../app/assets/moblogo.png";
import {
  Heart,
  UserRound,
  ShoppingCart,
  Search,
  Menu,
  X,
  House,
  Tag,
  PhoneCall,
  CircleUser,
  CircleX,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";
import { motion, useTransform, useMotionValue } from "framer-motion";
import useMenuStore from "@/store/useMenuStore";
import { SearchField } from "@/components/ui/search-field";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { clearAuthToken } from "@/actions/utils/auth";
import { useAuthStore } from "@/store/authStore";
import useDisableScroll from "@/hooks/useDisableScroll";
import { ICategory } from "@/types/category";
import { Skeleton } from "@/components/ui";
import AuthWrapper from "./AuthWrapper";
import Cookies from "js-cookie";
import WomenMenu from "@/components/custom/Submenus/WomenMenu";
import MenMenu from "@/components/custom/Submenus/MenMenu";
import JewelleryMenu from "@/components/custom/Submenus/JewelleryMenu";
import OccasionWearMenu from "@/components/custom/Submenus/OccasionWearMenu";
import ScentsMenu from "@/components/custom/Submenus/ScentsMenu";

interface NavItem {
  label: string;
  href: string;
}

interface NavItem {
  icon: React.ElementType;
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

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    if (categories.lenght > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [categories]);

  const navItems: NavItem[] = [
    // {
    //   icon: House,
    //   label: "Home",
    //   href: "/",
    // },
    // {
    //   icon: Tag,
    //   label: "Products",
    //   href: "/product",
    // },
    // {
    //   icon: Tag,
    //   label: "Categories",
    //   href: "/categories",
    // },
    // {
    //   icon: PhoneCall,
    //   label: "Contact Us",
    //   href: "/contact",
    // },
    {
      icon: Heart,
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      icon: ShoppingCart,
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
      label: token ? "Sign out" : "Sign in",
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
      scrollY.set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const handleNavigation = (label: string, href: string) => {
    router.push(href);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleAuthPopup = () => {
    setAuthPopup(true);
  };

  const handleLogout = async () => {
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
  };

  const navIconStyle =
    "hover:opacity-75 cursor-pointer z-40 w-4 h-4 md:w-5 md:h-5";

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
  };

  const closePopup = () => {
    setAuthPopup(false);
  };

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
      className={`fixed top-0 left-0 w-full z-30 transition-shadow duration-300 ${
        shadow ? "bgcolor" : ""
      }`}
      style={{ boxShadow: `0 4px 6px -1px ${shadowStyle}` }}
    >
      <div className="max-w-[1920px] mx-auto w-full px-[15px] md:px-[18px] xl:px-[22px] py-[16px] md:py-[20px] xl:py-[24px] recommend:py-[32px] recommend:px-[100px] flex flex-col gap-4">
        <div className="flex items-center justify-between relative">
          <div
            className="w-6 h-6 md:w-[200px] md:h-[28px] lg:w-[224px] lg:h-[30px] cursor-pointer"
            onClick={() => handleNavigation("Home", "/")}
          >
            <Image src={MobLogo} alt="Logo" className="block md:hidden" />
            <Image src={Logo} alt="Logo" className="hidden md:block" />
          </div>
          <SearchField
            aria-label="Search"
            className="text-white w-[60vw] md:w-[50vw] 2xl:w-2/3 custom-textfield"
          />
          <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-8 text-white">
            {navItems
              .filter(
                (item) =>
                  item.label !== "Wishlist" &&
                  item.label !== "Cart" &&
                  item.label !== "Account" &&
                  item.label !== "Sign out" &&
                  item.label !== "Sign in"
              )
              .map((item) => (
                <span
                  key={item.label}
                  onClick={() => handleNavigation(item.label, item.href)}
                  className={`font-[400] text-sm hover:opacity-75 cursor-pointer ${
                    pathname === item.href ? "text-blue" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
              ))}

            <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
              <p
                onClick={handleAuthPopup}
                className="text-xs lg:text-sm font-[400] cursor-pointer hover:opacity-75 text-white"
              >
                {isAuthenticated === false && "Sign in"}
              </p>

              <Link href="/wishlist">
                <motion.div
                  animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`text-white h-4 w-4 lg:h-5 lg:w-5 ${
                      isAnimating ? "text-red-300" : ""
                    }`}
                  />
                </motion.div>
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className={navIconStyle} />
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
                      <span className="pointer-events-none flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full bg-[#190F30] p-2 font-medium text-blue text-xxs tracking-tighter">
                        {cart.length}
                      </span>
                    </button>
                  </div>
                )}
              </Link>
              {/* <Link > */}
              {isAuthenticated === true && (
                <UserRound className={navIconStyle} onClick={handleProfile} />
              )}

              {/* </Link> */}
              {profileSelect && (
                <motion.div
                  ref={profileRef}
                  initial="hidden"
                  animate="visible"
                  variants={popupVariants}
                  className="flex flex-col items-start  backdrop-blur-md z-10 bg-[#FFFFFF]/5 text-white py-[13px] w-[188px] rounded-[10px] text-sm absolute top-10 right-0"
                >
                  <Link
                    href="/profile"
                    className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] ${
                      pathname === "/profile" ? "text-blue" : "text-white"
                    }`}
                    onClick={() => setProfileSelect(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/profile/history"
                    className={`cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px]  ${
                      pathname === "/profile/history"
                        ? "text-blue"
                        : "text-white"
                    }`}
                    onClick={() => setProfileSelect(false)}
                  >
                    Order History
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer hover:bg-[#FFFFFF]/10 px-[13px] py-1 w-full leading-[24px] text-white"
                  >
                    Sign out
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <div className="hidden items-center gap-4 text-white">
            {/* <Search onClick={toggleSearch} className={navIconStyle} /> */}
            <p className="text-xs font-[400] cursor-pointer hover:opacity-75 text-white">
              {token ? "Sign out" : "Sign in"}
            </p>
            <Menu onClick={toggleMenu} />
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
              className="absolute top-0 z-40 bg-[#190F30] flex items-center justify-between w-[84vw] border border-solid border-[#6442C1] rounded-[8px] h-8"
            >
              <input
                type="text"
                className="bg-[#190F30] text-white focus:outline-none border-none w-full px-2 font-[400] text-xs"
              />
              <button id="sendButton" className="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 664 663"
                >
                  <path
                    fill="none"
                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="33.67"
                    stroke="#6c6c6c"
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
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial="hidden"
              animate="visible"
              variants={popupVariants2}
              className={`absolute z-10 gap-4 backdrop-blur-sm top-10 text-white right-0 py-4 pr-2 pl-4 flex flex-col w-[292px] ${
                mobProfileSelect ? "h-[574px] " : "h-[494px] "
              }rounded-tl-[20px] rounded-bl-[20px] border-t border-l border-solid border-blue bg-[#FFFFFF0D]/5`}
            >
              <div className="flex justify-end">
                <X onClick={toggleMenu} className="cursor-pointer" />
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => {
                      if (
                        item.label === "Sign out" ||
                        item.label === "Sign in"
                      ) {
                        handleAuthAction();
                      } else if (item.label === "Account") {
                        handleProfile();
                      } else {
                        router.push(item.href);
                        setmobProfileSelect(false);
                      }
                      if (item.label !== "Account") {
                        toggleMenu();
                      }
                    }}
                    className={`cursor-pointer flex flex-col p-[11px] rounded-[10px] ${
                      item.href === pathname ? "bg-blue" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={25} />
                      <p className="text-sm leading-[28px]">{item.label}</p>
                    </div>
                    {item.label === "Account" && mobProfileSelect && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={popupVariants}
                        className={`mt-2 p-2 flex text-white flex-col gap-2 border-t border-l border-solid border-blue rounded-[6px] backdrop-blur-sm text-sm`}
                      >
                        <Link href="/profile" onClick={handleProfileClick}>
                          <p
                            className={`${
                              pathname === "/profile"
                                ? "text-blue"
                                : "text-white"
                            }`}
                          >
                            Profile
                          </p>
                        </Link>
                        <Link
                          href="/profile/history"
                          onClick={handleProfileClick}
                        >
                          <p
                            className={`${
                              pathname === "/profile/history"
                                ? "text-blue"
                                : "text-white"
                            }`}
                          >
                            Order History
                          </p>
                        </Link>
                        <div
                          // href="/profile/history"
                          onClick={handleLogout}
                        >
                          <p
                            // className={`${
                            //   pathname === "/profile/history"
                            //     ? "text-blue"
                            //     : "text-white"
                            // }`}
                            className="text-white"
                          >
                            Sign out
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        <div className="flex rounded-[9px] items-center justify-between bg-[#FFFFFF0D]/5 h-[48px] px-4">
          {/* Menu links - visible on md+ */}
          <div className="hidden md:flex gap-4 lg:gap-8 xl:gap-10 justify-center w-[60%] font-inter font-semibold text-[12px] lg:text-[14px] xl:text-[16px]">
            {["Women", "Men", "Jewellery", "Occasion Wear", "Scents"].map(
              (item) => (
                <div
                  key={item}
                  className="hover:text-gray-500"
                  onMouseEnter={() => setActiveMenu(item)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <a href="#" className="text-white">
                    {item}
                  </a>
                  {activeMenu === item && (
                    <div className="absolute left-0 shadow-sm w-full py-[40px] px-[16px] sm:px-[56px] md:px-[96px] z-10 bg-white ">
                      {React.createElement(subMenus[item])}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {/* Hamburger for mobile (below md) */}
          <div className="md:hidden flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-black text-2xl"
            >
              ☰
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
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
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveMobileMenu(null);
                  }}
                >
                  <CircleX size={32}/>
                </button>
              </div>

              {/* Submenu View */}
              {activeMobileMenu ? (
                <div>{React.createElement(subMenus[activeMobileMenu])}</div>
              ) : (
                // Main Menu View
                <div className="space-y-6 text-lg font-semibold">
                  {Object.keys(subMenus).map((item) => (
                    <div
                      key={item}
                      className="flex justify-between items-center border-b pb-4 cursor-pointer"
                      onClick={() => setActiveMobileMenu(item)}
                    >
                      <span>{item}</span>
                      <span><ChevronRight /></span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/*<div className="flex flex-row overflow-x-auto no-scrollbar gap-2 lg:gap-4 ">
            {categories.map((data: ICategory) => (
              <Link
                key={data._id}
                href={`/subcategories/${data._id}`}
                className="cursor-pointer border border-transparent hover:border-solid hover:border-gray-300 px-1 rounded-[4px]"
              >
                <p className="text-gray-400 text-xs lg:text-sm">{data?.name}</p>
              </Link>
            ))}
          </div>*/}
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
