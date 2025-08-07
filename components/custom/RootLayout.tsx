"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import useMenuStore from "@/store/useMenuStore";
import HeaderBanner from "@/public/assets/Marketplace.png";
import BGIMG from "@/public/assets/bglogo.webp";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/authStore";
import { getCart } from "@/actions/carts/cart";
import { useWishlistStore } from "@/store/wishlist";
import { getUserWishlist } from "@/actions/wishlists/wishlist";
import { ICategory } from "@/types/category";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  categories: ICategory;
}

export default function ConditionalLayout({
  children,
  categories,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { isMenuOpen } = useMenuStore();
  const hiddenRoutes = ["/login", "/register", "/forgotpw"];
  const isHomePage = pathname === "/";
  const logoPages = [
    "/contact",
    "/checkout",
    "/profile",
    "/product",
    "/categories",
    "/category",
    "/cart",
    "/wishlist",
    "/policy",
    "/condition",
    "/profile/history",
  ];
  const isLogoPages = logoPages.includes(pathname);
  const isHiddenRoute = hiddenRoutes.includes(pathname);
  const { setCart } = useCartStore();
  const { setWishlist } = useWishlistStore();
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      if (token !== null) {
        try {
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
    ? "md:overflow-hidden h-screen"
    : isLogoPages
    ? "flex-1 "
    : "flex-1 ";

  return (
    <div>
      <div className="flex flex-col max-w-[1920px] mx-auto min-h-screen relative">
        {isHomePage && (
          <div className="absolute flex md:left-0 right-0 recommend:pl-24 top-16 md:-top-4 xl:-top-6 justify-center items-center">
            <Image src={HeaderBanner} alt="Header Banner" />
          </div>
        )}
        {isLogoPages && (
          <div
            className="hidden lg:block absolute inset-0 -z-10"
            style={{
              backgroundImage: `url(${BGIMG.src})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        {!isHiddenRoute && <Navbar categories={categories} />}
        <main className={mainClasses} style={{ opacity: isMenuOpen ? 0.1 : 1 }}>
          {children}
        </main>
        {!isHiddenRoute}
      </div>
      <Footer />
    </div>
  );
}
