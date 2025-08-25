interface PrivacyPolicyItem {
  label?: string;
  description: string;
}

export interface Policy {
  title: string;
  items: PrivacyPolicyItem[];
}

export const policyConfig: {
  key: keyof Policy;
  title: string;
  items: PrivacyPolicyItem[];
}[] = [
  {
    key: "title",
    title: "Information We Collect",
    items: [
      {
        label: "Personal Information",
        description:
          "When you register or place an order, we may collect details such as your name, address, email, phone number, and payment information.",
      },
      {
        label: "Transactional Data",
        description:
          "We record details related to your orders, including products purchased, order history, and interactions with CILUNA Pay.",
      },
      {
        label: "Technical Information",
        description:
          "We collect data from your device such as IP address, browser type, and cookies to enhance your shopping experience.",
      },
    ],
  },
  {
    key: "title",
    title: "Use of Your Information",
    items: [
      {
        description: "Process and fulfill your orders.",
      },
      {
        description: "Manage your account and provide customer support.",
      },
      {
        description:
          "Personalize your experience and send you updates on new pet products and services.",
      },
      {
        description: "Comply with legal obligations and resolve disputes.",
      },
    ],
  },
  {
    key: "title",
    title: "Sharing of Information",
    items: [
      {
        label: "Service Providers",
        description:
          "Trusted third parties who help us operate the site and manage transactions.",
      },
      {
        label: "Payment Processing",
        description:
          "CILUNA Pay securely handles your payment data; we do not store full payment details.",
      },
      {
        label: "Legal Requirements",
        description:
          "Authorities, if required by law, or to protect our rights.",
      },
      {
        label: "Business Transfers",
        description:
          "In the event of a merger, sale, or reorganization, provided that the recipient agrees to abide by our privacy practices.",
      },
    ],
  },
  {
    key: "title",
    title: "Data Security",
    items: [
      {
        description:
          "We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure.",
      },
    ],
  },
  {
    key: "title",
    title: "Cookies and Tracking Technologies",
    items: [
      {
        description: "Enhance your browsing experience.",
      },
      {
        description: "Analyze site traffic.",
      },
      {
        description:
          "Offer personalized content and advertisements. You can manage your cookie preferences through your browser settings.",
      },
    ],
  },
  {
    key: "title",
    title: "Your Rights",
    items: [
      {
        description:
          "Depending on your jurisdiction, you may have rights regarding your personal data, including access, correction, or deletion. Contact us to exercise these rights.",
      },
    ],
  },
];
