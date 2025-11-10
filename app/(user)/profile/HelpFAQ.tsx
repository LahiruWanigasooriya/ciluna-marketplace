import HelpFaqDropdown from "@/components/custom/HelpFaqDropdown";

const HelpFAQ = () => {
  return (
    <section className="bg-[#F5F5F5] p-[16px] md:p-[24px] rounded-[8px]">
      <HelpFaqDropdown
        question="How do I place an order?"
        answer="To place an order, simply browse our catalog, select the items you wish to purchase, and click on the 'Add to Cart' button. Once you're ready, go to your cart, review your selections, and proceed to checkout. Fill in your shipping details, choose your payment method, and confirm your order. You'll receive a confirmation email shortly after!"
      />
      <HelpFaqDropdown
        question="What payment methods do you accept?"
        answer="We accept major credit/debit cards, PayPal, and other secure online payment options available at checkout. Simply choose your preferred method when completing your order."
      />
      <HelpFaqDropdown
        question="How can I track my order?"
        answer="After your order is confirmed, you’ll receive a tracking number via email. You can use this number on our website or the courier’s site to check the real-time status of your delivery."
      />
      <HelpFaqDropdown
        question="What is your return and exchange policy?"
        answer="If you are not satisfied with your order, you can return or exchange it within 14 days of delivery, provided the item is unused and in original packaging. Simply contact our support team for instructions."
      />
      <HelpFaqDropdown
        question="Do you offer international shipping?"
        answer="Yes, we ship worldwide. Shipping fees and delivery times vary depending on your location, and you’ll see the exact cost at checkout."
      />
      <HelpFaqDropdown
        question="How can I contact customer support?"
        answer="You can reach our support team through email, live chat, or phone. Contact details are available on our Contact Us page, and we aim to respond quickly to assist you."
      />
      <HelpFaqDropdown
        question="Are my payments secure?"
        answer="Yes, your payments are processed through encrypted and trusted payment gateways. We never store your card details, ensuring your transactions remain safe and private."
        showBorder={false}
      />
    </section>
  );
};

export default HelpFAQ;
