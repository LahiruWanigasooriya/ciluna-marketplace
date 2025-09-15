import Image from "next/image";
import FooterBg from "@/public/assets/footer/Frame 1991427642.svg";
import MobFooterBg from "@/public/assets/footer/MobFooterBg.svg";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui";
import clsx from "clsx";
import useMenuStore from "@/store/useMenuStore";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

interface SectionLink {
  name: string;
  href: string;
}

interface Section {
  title: string;
  links: SectionLink[];
}

const legalLinks: Section[] = [
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Services", href: "/" },
    ],
  },
];

const ServicesLinks: Section[] = [
  {
    title: "Client Services",
    links: [
      { name: "Care Guides", href: "/" },
      { name: "Contact Us", href: "/" },
      { name: "Help/ FAQ", href: "/" },
      { name: "Orders & Shipping", href: "/" },
      { name: "Return & Refunds", href: "/" },
      { name: "Track Your Order", href: "/" },
    ],
  },
];

const socialIcons: React.ComponentType<{
  className?: string;
  size?: number;
}>[] = [FiInstagram, FiFacebook];

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
      className="flex flex-col overflow-visible text-white bg-bgBlack font-[Arial] w-full mx-auto footerBg md:max-h-[785px] h-full max-h-[960px]"
      style={{
        opacity: isMenuOpen ? 0.5 : 1,
      }}
    >
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-[16px] xl:pt-[84px] md:pt-[32px] md:px-[32px] lg:px-[72px] xl:px-[84px]  pt-[32px] lg:pt-[72px] recommend:pt-[96px] recommend:px-[96px]">
        <div className="flex flex-col md:flex md:flex-row justify-between md:gap-[10px] xl:gap-[21px] pb-[24px] gap-[32px]">
          <div className="flex flex-col w-full md:flex md:flex-[570] gap-[32px] md:gap-[24px]">
            <p className="text-[14px] font-normal leading-[20px] text-left md:max-w-[436px] w-full md:w-[80%] ">
              A house of timeless elegance offering refined jewelry, occasion
              wear, and signature scents. Rooted in craftsmanship and conscious
              beauty, CILUNA creates pieces that celebrate emotion, memory, and
              legacy.
            </p>
            <div className="flex flex-col  gap-[16px] w-full">
              <p className="font-bold">Follow Us On</p>
              <div className="flex gap-[16px] ">
                {socialIcons.map((Icon, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "cursor-pointer hover:opacity-75 flex justify-"
                    )}
                  >
                    <Icon className="text-white w-[24px] h-[24px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-start justify-between w-full md:flex md:flex-[277]">
            {ServicesLinks.map((section, index) => (
              <div key={index} className="flex flex-col gap-[16px] w-full">
                <p className="text-base font-bold">{section.title}</p>
                <div className="flex flex-col space-y-[12px] text-[14px] leading-[20px] font-normal">
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
          <div className="flex flex-col space-y-[32px]  w-full md:flex md:flex-[358]">
            <div className="flex items-center w-full">
              {legalLinks.map((section, index) => (
                <div key={index} className="flex flex-col gap-[16px] w-full">
                  <p className="text-base font-bold">{section.title}</p>
                  <div className="flex flex-col space-y-[12px] text-[14px] leading-[20px] font-normal">
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
            <div className="flex flex-col gap-[16px] w-full">
              <p className=" font-bold text-[16px] leading-[24px] tracking-normal">
                Sign Up to Our Newsletter
              </p>
              <div className="flex flex-row items-center gap-[12px]">
                <input
                  type="text"
                  placeholder="Your email"
                  name="email"
                  autoComplete="email"
                  className={
                    "text-[14px] p-4 lg:text-[16px] leading-[24px] rounded-lg placeholder:text-white w-full h-[52px] md:h-[56px] bg-transparent focus:outline-white focus:outline-2 outline outline-1 lg:max-w-[290px] "
                  }
                />
                <Button className=" w-[52px] h-[52px] md:w-[56px] md:h-[56px] bg-white !p-3 md:!p-[14px] !border-0">
                  <IoIosArrowForward className="text-black w-[28px] h-[28px]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-bgBlack">
        <Image
          src={isMobile ? MobFooterBg : FooterBg}
          alt="Footer Background"
          className="w-full max-w-[1440px] mx-auto object-contain min-h-[159px]"
        />
      </div>

      <div className="flex flex-col items-center justify-center bg-bgBlack">
        <div className="line-gradient mx-auto w-full max-w-[1440px]"></div>
        <p className="text-[14px] font-[400] text-grayNeutralFg leading-[20px] tracking-normal text-center  py-[16px]">
          © 2025 CILUNA™. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
