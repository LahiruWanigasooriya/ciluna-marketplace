import React from "react";

import PrivacyDetails from "./privacyDetails";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="relative  ">
      <div className="relative px-[16px] max-w-[1440px] mt-[100px] md:mt-[120px] mx-auto py-[28px] md:px-[96px] md:py-[40px] flex flex-col gap-[24px] md:gap-[40px] ">
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
