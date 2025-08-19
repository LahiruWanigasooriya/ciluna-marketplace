import React from "react";
interface ProductDetailsTabProps {
  productId: string;
}

const ProductDetailsTab = ({ productId }: ProductDetailsTabProps) => {

  return (
    <div className="">
      <div className="font-arial text-grayNeutralFg text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-neutralGray-700">
        Elevate your elegance with the Celestial Drop Ring a stunning fusion of
        cosmic wonder and modern sophistication. Inspired by the quiet
        brilliance of the night sky, this exquisitely designed ring draws its
        essence from the timeless allure of stardust and constellations. Every
        element of its design pays homage to the mysteries of the universe,
        offering a piece that is both captivating and deeply symbolic.
        <br />
        <br />
        At the heart of the Celestial Drop Ring is its signature drop motif,
        gracefully suspended to reflect fluidity, light, and movement much like
        a falling star frozen in time. Handcrafted with precision, the band is
        forged from high-polish sterling silver or 18k gold vermeil (custom
        options available), ensuring both durability and brilliance.
        <br />
        <br />
        The drop detail is delicately adorned with a conflict-free white
        sapphire or moissanite, expertly cut to reflect light with dazzling
        intensity. The stone setting is secured with micro-prongs, giving the
        illusion of weightlessness while offering maximum sparkle. The ring’s
        sleek profile and balanced proportions make it ideal for stacking with
        other celestial-inspired pieces or wearing solo as a bold, meaningful
        statement.
        <br />
        <br /> Finished with a high-shine polish and protected with an
        anti-tarnish coating, the Celestial Drop Ring is as enduring as it is
        enchanting a piece designed to journey with you through countless
        moments and memories. Whether you're celebrating a personal milestone,
        gifting a loved one, or simply adding a touch of celestial charm to your
        collection, this ring invites you to carry a piece of the universe with
        you wherever you go.
      </div>
    </div>
  );
};

export default ProductDetailsTab;
