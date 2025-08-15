import React from "react";
import CozyHat from "@/public/assets/product/Cozy Hat and Sofa Scene.svg";
import ManInBlue from "@/public/assets/product/Portrait of a Man in Blue.svg";
import GirlInHat from "@/public/assets/product/Mysterious Sunset Portrait.svg";
import SizingHat from "@/public/assets/product/image 1.svg";
import Image from "next/image";

interface ProductDetailsTabProps {
  productId: string;
}

const ProductDetailsTab = ({ productId }: ProductDetailsTabProps) => {
  const id = productId;

  return (
    <div className="">
      <div className="font-arial text-grayNeutralFg text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">
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
      <div className="space-y-[16px] md:space-y-[20px] hidden md:flex md:flex-col md-5 md:mt-6">
        <div className="h-[196px] md:aspect-[1248/713] w-full md:h-full ">
          <img
            src={CozyHat.src}
            alt="Celestial Drop Ring"
            className="w-full h-full object-cover object-center rounded-[6px]"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full h-full space-y-[16px] md:space-y-0 md:space-x-[24px]">
          <div className="md:aspect-[612/1064] w-full h-[600px] md:h-full">
            <Image
              src={ManInBlue}
              alt="Image 1"
              className="w-full h-full object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="md:aspect-[612/1064] w-full h-[600px] md:h-full">
            <Image
              src={GirlInHat}
              alt="Image 2"
              className="w-full h-full object-cover object-center rounded-[6px]"
            />
          </div>
        </div>
        <div className="md:aspect-[1248/774] w-full h-[212px] md:h-full ">
          <Image
            src={SizingHat}
            alt="Image 3"
            className="w-full h-full md:object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;
