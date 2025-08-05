import Image from "next/image";
import Link from "next/link";
import Logo from "../../app/assets/logo.png";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { LiaDiscord } from "react-icons/lia";
import { FaTelegramPlane, FaMediumM } from "react-icons/fa";
import { PiRedditLogoFill } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import clsx from "clsx";
import useMenuStore from "@/store/useMenuStore";
import BGIMG from "@/public/assets/bglogom.webp";
import { Minus } from "lucide-react";

interface SectionLink {
  name: string;
  href: string;
}

interface Section {
  title: string;
  links: SectionLink[];
}

const sections: Section[] = [
  {
    title: "Menu",
    links: [
      { name: "Home", href: "/" },
      { name: "Product", href: "/product" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "#" },
      // { name: "Help Center", href: "/help" },
      { name: "Category", href: "/categories" },
      // { name: "Privacy Policy", href: "/policy" },
      // { name: "Terms & conditions", href: "/condition" },
    ],
  },
];

const socialIcons: React.ComponentType<{
  className?: string;
  size?: number;
}>[] = [FaXTwitter, LiaDiscord, FaTelegramPlane, FaMediumM, PiRedditLogoFill];

const Footer: FC = () => {
  const { isMenuOpen } = useMenuStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className="flex flex-col space-y-4 text-white overflow-hidden  footerBg"
      style={{
        opacity: isMenuOpen ? 0.5 : 1,
        backgroundImage: isMobile ? `url(${BGIMG.src})` : "none",
        backgroundSize: "containe",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col space-y-4 footerBg">
        <div className="flex flex-col xl:flex-row justify-between w-full xl:gap-12 gap-6">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col space-y-4 items-center md:items-start">
              <Image
                alt="Logo"
                src={Logo}
                className="w-[306px] h-[42px] md:w-[224px] md:h-[30px]"
              />
              <p className="text-sm font-[400] leading-[24px]">
                {`CILUNA Marketplace, a new pet-focused e-commerce site, sells a broad
              variety of items and services. The site will include CILUNA Pay, a
              secure payment method, providing a smooth purchasing experience.
              The design should match CILUNA's brand.`}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Enter your email"
                className={clsx(
                  "text-sm px-2 lg:text-xs font-normal rounded-lg placeholder:text-white w-full md:w-[349px] h-10",
                  "border-t border-l border-solid border-[#6B709499] focus:outline-none bg-[#FFFFFF]/5"
                )}
              />
              <Button className="px-12 w-full md:w-[155px] font-interSemiBold text-sm lg:text-xs bg-purple">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col md:flex-row gap-4">
            <div className="flex items-start justify-between w-full">
              {sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-6 w-full">
                  <p className="text-base font-interSemiBold">
                    {section.title}
                  </p>
                  <div className="flex flex-col space-y-3 text-sm font-normal">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={link.href}
                        className="hover:opacity-75"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-4 md:space-y-6  w-full">
              <p className="text-base font-interSemiBold">
                Follow on Social Media
              </p>
              <div className="flex items-center gap-8 md:gap-4 w-full">
                {socialIcons.map((Icon, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "md:p-2 p-3 rounded-[10px] md:rounded-[8px] border-t-2 border-l-2 border-solid border-[#6B709499] bg-[#FFFFFF]/5",
                      "cursor-pointer hover:opacity-75 w-full flex justify-center items-center"
                    )}
                  >
                    <Icon className="text-white w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full pt-4">
            <hr className="h-4 text-[#D4D2E3]" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xxs md:text-sm text-white text-center">
              Copyright © 2025 CILUNA LLC All Rights Reserved.
            </p>
            <div className="flex items-center">
              <Link
                href="/policy"
                className="text-xxs md:text-sm hover:opacity-75 text-white"
              >
                Privacy Policy
              </Link>
              <Minus className="rotate-90 text-[#D4D2E3]" />
              <Link
                href="/condition"
                className="text-xxs md:text-sm hover:opacity-75 text-white"
              >
                Terms & conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
