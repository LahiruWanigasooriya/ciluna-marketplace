import React from "react";

import TermDetails from "./termDetails";

const TermsOfService: React.FC = () => {
  return (
    <div className="relative ">
      <div className="relative px-[16px] mt-[100px] md:mt-[120px]  max-w-[1440px] mx-auto py-[28px] md:px-[96px] md:py-[40px] flex flex-col gap-[24px] md:gap-[40px] ">
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
