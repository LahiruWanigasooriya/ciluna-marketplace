import React from "react";
import Image from "next/image";
import Title from "@/components/custom/Title";
import { Phone, Mail } from "lucide-react";
import Contact from "@/public/assets/contact.png";
import ContactM from "@/public/assets/contactm.png";
import ContactForm from "./ContactForm";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: [
      "We are available 24/7, 7 days a week.",
      "Phone: +234556457745622",
    ],
  },
  {
    icon: Mail,
    title: "Write To Us",
    description: [
      "Fill out our form and we will contact you within 24 hours.",
      "Email: test@gmail.com",
    ],
  },
];

const ContactMethod = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string[];
}) => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-full flex items-center justify-center bg-blue">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm font-[400]">{title}</p>
    </div>
    <div className="flex flex-col gap-2 font-[400] text-sm">
      {description.map((line: string, index: number) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <div className="flex flex-col gap-12 text-white">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <Title title="Get Started" />
          <p className="text-sm font-[400] leading-[30px] md:leading-[24px] text-center md:text-start">
            Get help from us. Our personel can assist with product information,
            technical assistance, and order processing. Since customer
            satisfaction is our top priority, PAW POS wants you to have the
            finest shopping experience.
          </p>
        </div>

        <div className="flex items-start flex-col lg:flex-row justify-between gap-[24px] recommend:gap-[25px] w-full rounded-[9px] border-t border-l border-solid border-[#6B709499] bg-[#FFFFFF]/5 p-[12px] md:p-[14px] lg:p-[16px] recommend:p-[20px]">
          <ContactForm />
          <div className="flex flex-col items-center gap-[30px] xl:gap-8 w-full">
            <div className="flex w-full">
              <Image alt="Contact" src={Contact} className="hidden md:block" />
              <Image
                alt="Contact Mobile"
                src={ContactM}
                className="block md:hidden"
              />
            </div>
            <div className="flex flex-col md:flex-row items-start lg:items-center lg:justify-between gap-[41px] recommend:gap-[47px] px-[27px] recommend:px-[38px]">
              {contactMethods.map((method, index) => (
                <ContactMethod
                  key={index}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
