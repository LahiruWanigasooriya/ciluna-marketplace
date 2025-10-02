import imageBanner from "@/public/assets/trackYourOrder/ImageBanner.png";
import React from "react";
import Image from "next/image";
import TermDetails from "./termDetails";

const TermsOfService: React.FC = () => {
  return (
    <div className="relative ">
      <Image
        src={imageBanner}
        alt="bannerimg"
        className="hidden md:block w-screen h-[468px] object-cover object-top mt-[108px]"
        style={{ objectPosition: "center 50%" }}
      />
      <div className="relative ">
        <Image
          src={imageBanner}
          alt="bannerImage mobile"
          className="block md:hidden w-screen h-[258px] object-cover object-center mt-[104px] "
          style={{ objectPosition: "center 10%" }}
        />
        <div className="progressive-blur"></div>
      </div>
      <div className="absolute top-[79px] md:top-[10%] lg:top-[15%] w-full flex flex-col p-[16px] lg:left-1/2 gap-[12px] lg:px-[287px] lg:py-[180px] lg:gap-[12px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mx-auto lg:items-center ">
        <h1 className="flex text-white  text-center font-kaiseiBold text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] items-center justify-center z-10">
          Terms of Service
        </h1>
        <p className="flex text-white items-center justify-center font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-center z-10">
          Please read our terms of service carefully before using Ciluna. These
          terms outline your rights and responsibilities when accessing our
          website and purchasing products.
        </p>
      </div>
      <div className="relative px-[16px]  max-w-[1920px] mx-auto py-[28px] md:px-[96px] md:py-[40px] flex flex-col gap-[24px] md:gap-[40px] ">
        <TermDetails
          title="Acceptance of Terms"
          desc="By accessing or using Ciluna, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website."
        />
        <TermDetails
          title="User Responsibilities"
          desc="You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and current information when registering or making purchases."
          subpoints={[
            "Do not share your account credentials.",
            "Notify us immediately of any unauthorized use of your account.",
            "Comply with all applicable laws and regulations.",
          ]}
        />
        <TermDetails
          title="Purchases & Payments"
          desc="All purchases made through Ciluna are subject to product availability and confirmation of the order price. We reserve the right to refuse or cancel any order at our discretion."
          subpointsTitle="Payment Terms:"
          subpoints={[
            "Prices are listed in your local currency where applicable.",
            "Payment must be made in full before your order is processed.",
            "We accept major credit cards and other payment methods as listed at checkout.",
          ]}
        />
        <TermDetails
          title="Intellectual Property"
          desc="All content on Ciluna, including text, graphics, logos, and images, is the property of Ciluna or its licensors and is protected by copyright laws. You may not use, reproduce, or distribute any content without our written permission."
        />
        <TermDetails
          title="Changes to Terms"
          desc="Ciluna reserves the right to update or modify these Terms of Service at any time. Changes will be posted on this page, and your continued use of the website constitutes acceptance of those changes."
        />
      </div>
    </div>
  );
};

export default TermsOfService;
