import Image from "next/image";
import React from "react";
import CozyHat from "@/public/assets/product/Cozy Hat and Sofa Scene.svg";
import ManInBlue from "@/public/assets/product/Portrait of a Man in Blue.svg";
import GirlInHat from "@/public/assets/product/Mysterious Sunset Portrait.svg";
import SizingHat from "@/public/assets/product/image 1.svg";

const ProductDetailsTab = () => {
  return (
    <div className="mt-[24px] ">
      <div className="font-arial text-grayNeutralFg text-[16px] leading-[24px]">
        Elevate your elegance with the Celestial Drop Ring a stunning fusion of
        cosmic wonder and modern sophistication. Inspired by the quiet
        brilliance of the night sky, this exquisitely designed ring draws its
        essence from the timeless allure of stardust and constellations. Every
        element of its design pays homage to the mysteries of the universe,
        offering a piece that is both captivating and deeply symbolic. At the
        heart of the Celestial Drop Ring is its signature drop motif, gracefully
        suspended to reflect fluidity, light, and movement much like a falling
        star frozen in time. Handcrafted with precision, the band is forged from
        high-polish sterling silver or 18k gold vermeil (custom options
        available), ensuring both durability and brilliance. The drop detail is
        delicately adorned with a conflict-free white sapphire or moissanite,
        expertly cut to reflect light with dazzling intensity. The stone setting
        is secured with micro-prongs, giving the illusion of weightlessness
        while offering maximum sparkle. The ring’s sleek profile and balanced
        proportions make it ideal for stacking with other celestial-inspired
        pieces or wearing solo as a bold, meaningful statement. Finished with a
        high-shine polish and protected with an anti-tarnish coating, the
        Celestial Drop Ring is as enduring as it is enchanting a piece designed
        to journey with you through countless moments and memories. Whether
        you're celebrating a personal milestone, gifting a loved one, or simply
        adding a touch of celestial charm to your collection, this ring invites
        you to carry a piece of the universe with you wherever you go.
      </div>
      <div className=" mt-[24px] space-y-[20px]">
        <div className="md:aspect-[1248/713] w-full h-full ">
          <img
            src={CozyHat.src}
            alt="Celestial Drop Ring"
            className="object-cover"
          />
        </div>
        <div className="flex w-full h-full space-x-[24px]">
          <div className="md:aspect-[612/1064] w-full h-full">
            <img
              src={ManInBlue.src}
              alt="Celestial Drop Ring"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="md:aspect-[612/1064] w-full h-full">
            <img
              src={GirlInHat.src}
              alt="Celestial Drop Ring"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className="md:aspect-[1248/774] w-full h-full ">
          <img
            src={SizingHat.src}
            alt="Celestial Drop Ring"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;
