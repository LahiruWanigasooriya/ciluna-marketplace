import imageBanner from "@/public/assets/trackYourOrder/ImageBanner.png";
import React from "react";
import Image from "next/image";
import PrivacyDetails from "./privacyDetails";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="relative  ">
      <Image
        src={imageBanner}
        alt="bannerimg"
        className="hidden md:block w-screen  h-[468px] object-cover object-top mt-[108px]"
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
      <div className="absolute top-[79px]  md:top-[10%] lg:top-[15%]  w-full md:w-full lg:w-full   flex flex-col  p-[16px] lg:left-1/2  gap-[12px] lg:px-[287px] lg:py-[180px] lg:gap-[12px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mx-auto lg:items-center ">
        <h1 className="flex text-white text-center  font-kaiseiBold text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] items-center justify-center z-10">
          Your Privacy at CILUNA
        </h1>
        <p className="flex text-white items-center justify-center font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-center z-10">
          At Ciluna, we are committed to protecting your personal information
          and ensuring transparency in how your data is handled.
        </p>
      </div>

      <div className="relative px-[16px] max-w-[1920px] mx-auto py-[28px] md:px-[96px] md:py-[40px] flex flex-col gap-[24px] md:gap-[40px] ">
        <PrivacyDetails
          title="Our Commitment to Privacy"
          desc="CILUNA values your privacy and takes every measure to safeguard your personal information. We only collect data necessary to process your orders and provide a secure shopping experience."
        />

        <PrivacyDetails
          title="Information We Collect"
          desc="We collect your name, contact details, and delivery address solely for order fulfillment and communication. Your data is never shared with unauthorized third parties."
          subpoints={[
            "Name and delivery address for shipping your order.",
            "Contact details to provide delivery updates and notifications.",
            "Order details to ensure accurate and timely delivery.",
          ]}
        />

        <PrivacyDetails
          title="How We Use Your Data"
          desc="Your information is used exclusively for processing orders, delivery, and customer support. We share your data only with trusted delivery partners for the purpose of delivering your order."
          subpointsTitle="Your Rights & Choices:"
          subpoints={[
            "Access your information securely via your account.",
            "Contact us to update or correct your personal information.",
            "Request details about how your data is used in the delivery process.",
          ]}
        />

        <PrivacyDetails
          title="Data Security & Transparency"
          desc="We use industry-standard security measures to protect your data. You have full control over your personal information and can reach out to us for any privacy-related concerns or requests."
        />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
