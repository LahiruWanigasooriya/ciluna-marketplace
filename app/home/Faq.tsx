import FaqDropdown from "@/components/custom/FaqDropdown";

const Faq: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full mt-2">
      <FaqDropdown
        question="Are there any warranties on products?"
        answer="The majority of our items do, in fact, come with warranties from the manufacturer. Specifics about the warranty may be found in the product specifications, or you can get in touch with us for further information."
      />
      <FaqDropdown
        question="How do I know if an accessory is compatible with my device?"
        answer="The majority of our items do, in fact, come with warranties from the manufacturer. Specifics about the warranty may be found in the product specifications, or you can get in touch with us for further information."
      />
      <FaqDropdown
        question="What should I do if I received a defective or incorrect item?"
        answer="The majority of our items do, in fact, come with warranties from the manufacturer. Specifics about the warranty may be found in the product specifications, or you can get in touch with us for further information."
      />
      <FaqDropdown
        question="Can I cancel or modify my order after it’s placed?"
        answer="The majority of our items do, in fact, come with warranties from the manufacturer. Specifics about the warranty may be found in the product specifications, or you can get in touch with us for further information."
      />
      <FaqDropdown
        question="Can I track my order?"
        answer="The majority of our items do, in fact, come with warranties from the manufacturer. Specifics about the warranty may be found in the product specifications, or you can get in touch with us for further information."
      />
    </div>
  );
};

export default Faq;
