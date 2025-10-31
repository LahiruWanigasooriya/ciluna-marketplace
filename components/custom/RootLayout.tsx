"use client";

import React, { useEffect, useState } from "react";
//import Image from "next/image";
import { usePathname } from "next/navigation";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import useMenuStore from "@/store/useMenuStore";
// import HeaderBanner from "@/public/assets/Marketplace.png";
// import BGIMG from "@/public/assets/bglogo.webp";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/authStore";
import { getCart } from "@/actions/carts/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUserStore } from "@/store/userStore";
import { getUserWishlist } from "@/actions/wishlists/wishlist";
import { ICategory } from "@/types/category";
import trackyourorder from "@/app/trackyourorder/page";
import { getUserProfile } from "@/actions/users/user";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  // categories: ICategory;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { isMenuOpen } = useMenuStore();
  const hiddenRoutes = ["/login", "/register", "/forgotpw"];
  const WidthFullPages = [
    "/",
    "/product",
    "/order-shipping",
    "/careguide",
    "/trackyourorder",
    "/privacypolicy",
    "/termsofservices",
    "/return-refund",
  ];
  const isHomePage = pathname === "/";
  const isHiddenRoute = hiddenRoutes.includes(pathname);
  const isWidthFullPages =
    WidthFullPages.includes(pathname) || pathname.startsWith("/product/");
  const { setCart } = useCartStore();
  const { setWishlist } = useWishlistStore();
  const { setUser } = useUserStore();
  const { token, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await useAuthStore.getState().checkAuth();
      if (token !== null) {
        try {
          const userResponse = await getUserProfile(token);
          const user = userResponse?.user || null;
          setUser(user);
          const cartResponse = await getCart(token);
          const userCart = cartResponse?.cart?.items || [];
          setCart(userCart);
          const wishlistResponse = await getUserWishlist(token);
          const userWishlist = wishlistResponse?.data?.wishProductList || [];
          setWishlist(userWishlist);
        } catch (error) {
          console.error("❌ Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  const mainClasses = isHiddenRoute
    ? // ? "md:overflow-hidden h-screen"
      // : isLogoPages
      // ? "flex-1 "
      // : "flex-1 ";
      "min-h-screen overflow-auto"
    : "flex-grow overflow-auto";

  const getContainerClasses = () => {
    if (isWidthFullPages) {
      return "flex flex-col min-h-screen relative w-full";
    }
    if (isHiddenRoute) {
      return "flex flex-col min-h-screen relative w-full"; // Login/Register/Forgotpw → full width
    }
    return "flex flex-col max-w-[1440px] mx-auto min-h-screen relative"; // Default: max width 1440px for all other pages
  };

  return (
    <div>
      <div className={getContainerClasses()}>
        {isHomePage && (
          <div className="absolute flex md:left-0 right-0 recommend:pl-24 top-16 md:-top-4 xl:-top-6 justify-center items-center">
            {/* <Image src={HeaderBanner} alt="Header Banner" /> */}
          </div>
        )}
        <Navbar />
        <main className={mainClasses} style={{ opacity: isMenuOpen ? 0.1 : 1 }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
