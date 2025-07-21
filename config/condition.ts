interface PrivacyPolicyItem {
  label?: string;
  description: string;
}

export interface Policy {
  title: string;
  items: PrivacyPolicyItem[];
}

export const conditionConfig: {
  key: keyof Policy;
  title: string;
  items: PrivacyPolicyItem[];
}[] = [
  {
    key: "title",
    title: "Account Registration and Security",
    items: [
      {
        label: "Registration",
        description:
          "You may be required to create an account. All information you provide must be accurate and current.",
      },
      {
        label: "Security",
        description:
          " You are responsible for maintaining the confidentiality of your account information and for all activities under your account. Notify us immediately of any unauthorized use.",
      },
    ],
  },
  {
    key: "title",
    title: "Product Information and Descriptions",
    items: [
      {
        description:
          "We strive to present accurate product descriptions and images. However, minor errors may occur. We reserve the right to correct any inaccuracies and to update information without prior notice.",
      },
    ],
  },
  {
    key: "title",
    title: "Order Process and Acceptance",
    items: [
      {
        label: "Placing Orders",
        description:
          "When you place an order, you are making an offer to purchase under these Terms & Conditions.",
      },
      {
        label: "Order Acceptance",
        description:
          "We reserve the right to accept or decline orders at our discretion. Confirmation emails serve as acceptance once the order is processed.",
      },
    ],
  },
  {
    key: "title",
    title: "Shipping and Delivery",
    items: [
      {
        description:
          "We will make reasonable efforts to ship orders promptly. Delivery times may vary based on location and availability. Risk of loss transfers to you upon delivery by our shipping partner.",
      },
    ],
  },
  {
    key: "title",
    title: "User Conduct",
    items: [
      {
        description: "Use our site for any illegal or unauthorized purpose.",
      },
      {
        description: "Post or transmit harmful content.",
      },
      {
        description:
          "Infringe on the rights of others. Failure to comply may result in suspension or termination of your account.",
      },
    ],
  },
  {
    key: "title",
    title: "Limitation of Liability",
    items: [
      {
        description:
          "In no event shall PAW Marketplace be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.",
      },
    ],
  },
  {
    key: "title",
    title: "Amendments to Terms & Conditions",
    items: [
      {
        description:
          "We reserve the right to update these Terms & Conditions at any time. Continued use of the site after changes constitutes your acceptance of the new terms.",
      },
    ],
  },
];
