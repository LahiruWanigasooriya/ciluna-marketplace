import React from "react";
import ProductInfoTabs from "./ProductInfoTabs";
// import { getProductById, getRelatedProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
// import Title from "@/components/custom/Title";
// import ProductCard from "../ProductCard";

import Product from "./Product";
// import { getProductWishCount } from "@/actions/wishlists/wishlist";
// import { ProductWishCountResponse } from "@/types/wishlist";
import { IProductVariant } from "@/types/productVariant";
// import { getCilunaPrice } from "@/lib/cilunaService";
// import toFixed from "@/functions/cilunaPrice";
import Product6 from "@/public/assets/product/product6.webp";
import Product7 from "@/public/assets/product/product7.webp";
import Product8 from "@/public/assets/product/product8.webp";
import Product9 from "@/public/assets/product/product9.webp";
import SwiperCards from "@/components/custom/SwiperCards";

import CozyHat from "@/public/assets/product/Cozy Hat and Sofa Scene.svg";
import ManInBlue from "@/public/assets/product/Portrait of a Man in Blue.svg";
import GirlInHat from "@/public/assets/product/Mysterious Sunset Portrait.svg";
import SizingHat from "@/public/assets/product/image 1.svg";

// interface Pro {
//  product: IProduct;
//  variants?: IProductVariant;
// }

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) => {
  const id = (await params).id;
  // const id = "1";
  // const relatedres = await getRelatedProducts(id);
  // const swiperRef = useRef<SwiperCardsHandle>(null);
  // const relatedproduct: IProduct[] = relatedres?.data?.relatedItems || [];

  // const productres = await getProductById(id);
  // const relatedres = await getRelatedProducts(id);
  // const productWishcountres = await getProductWishCount(id);
  // const price = await getCilunaPrice();
  // const cilunaPrice = toFixed(Number(price));

  // if (!productres.success || !productres.data) {
  //   return (
  //     <div className="p-4">
  //       <h2>{productres.message || "Product not found!"}</h2>
  //     </div>
  //   );
  // }

  // const product: IProduct = productres.data.product;
  // const variants: IProductVariant = productres.data.variants;

  const product: IProduct = {
    _id: "1",
    name: "ChillWave Jersey",
    description:
      "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
    image: Product6.src,
    images: [Product6.src, Product7.src, Product8.src, Product9.src],
    category: { _id: "cat1", name: "Electronics" },
    rating: 4.5,
    sold: 120,
    price: 5001.95,
    stock: 50,
    createdBy: "user1",
    discount: { percentage: 25 },
    color: "white",
    colorCode: "#E5E1D8",
    colors: ["white", "blue", "black", "red"],
    colorCodes: ["#E5E1D8", "#183B78", "#000000", "#EA0109"],
    overview: {
      description: `Elevate your elegance with the Celestial Drop Ring a stunning fusion of cosmic wonder and modern sophistication. Inspired by the quiet brilliance of the night sky, this exquisitely designed ring draws its essence from the timeless allure of stardust and constellations. Every element of its design pays homage to the mysteries of the universe, offering a piece that is both captivating and deeply symbolic.\n\nAt the heart of the Celestial Drop Ring is its signature drop motif, gracefully suspended to reflect fluidity, light, and movement much like a falling star frozen in time. Handcrafted with precision, the band is forged from high-polish sterling silver or 18k gold vermeil (custom options available), ensuring both durability and brilliance.\n\nThe drop detail is delicately adorned with a conflict-free white sapphire or moissanite, expertly cut to reflect light with dazzling intensity. The stone setting is secured with micro-prongs, giving the illusion of weightlessness while offering maximum sparkle. The ring’s sleek profile and balanced proportions make it ideal for stacking with other celestial-inspired pieces or wearing solo as a bold, meaningful statement.\n\nFinished with a high-shine polish and protected with an anti-tarnish coating, the Celestial Drop Ring is as enduring as it is enchanting a piece designed to journey with you through countless moments and memories.\n\nWhether you're celebrating a personal milestone, gifting a loved one, or simply adding a touch of celestial charm to your collection, this ring invites you to carry a piece of the universe with you wherever you go.`,
      images: [CozyHat, ManInBlue, GirlInHat, SizingHat],
    },
  };

  const variants: IProductVariant = {
    _id: "64f7b3a8c123456789abcd01",
    productId: "64f7b3a8c123456789abcd00",
    subCategoryIds: ["64f7b3a8c123456789abcd02", "64f7b3a8c123456789abcd03"],
    category: "Electronics",
    price: 1200,
    stock: 15,
    sold: 8,
    discount: {
      percentage: 10,
      startDate: "2025-08-01",
      endDate: "2025-08-31",
    },
    images: [
      "https://via.placeholder.com/300x300.png?text=Laptop+Front",
      "https://via.placeholder.com/300x300.png?text=Laptop+Side",
    ],
    rating: 4.5,
    createdAt: "2025-08-01T10:00:00Z",
    updatedAt: "2025-08-10T12:00:00Z",
    isActive: true,
  } as IProductVariant;

  // const relatedproduct: IProduct[] = relatedres?.data?.relatedItems;
  const relatedproduct: IProduct[] = [
    {
      _id: "1",
      name: "ChillWave Jersey",
      description:
        "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
      image: Product6.src,
      category: { _id: "cat1", name: "Electronics" },
      rating: 4.5,
      sold: 120,
      price: 5001.95,
      stock: 50,
      createdBy: "user1",
      discount: { percentage: 25 },
      color: "white",
      colorCode: "#E5E1D8",
      colors: ["white", "blue", "black", "red"],
      colorCodes: ["#E5E1D8", "#183B78", "#000000", "#EA0109"],
    },
    {
      _id: "2",
      name: "Sunny Circle Shades",
      description: "Fitness-focused smart watch with heart-rate monitoring.",
      image: Product7.src,
      category: { _id: "cat2", name: "Wearables" },
      rating: 4.2,
      sold: 85,
      price: 1001,
      stock: 40,
      createdBy: "user2",
      discount: { percentage: 25 },
    },
    {
      _id: "3",
      name: "Gaming Mouse",
      description: "High DPI gaming mouse with RGB lighting.",
      image: Product8.src,
      category: { _id: "cat3", name: "Accessories" },
      rating: 4.7,
      sold: 300,
      price: 3499,
      stock: 70,
      createdBy: "user3",
    },
  ];

  // const processResponse = (response: any): ProductWishCountResponse => {
  //   if (typeof response.success !== "boolean") {
  //     throw new Error("Invalid response: success flag missing or invalid.");
  //   }

  //   const productWishCount: ProductWishCountResponse = {
  //     success: response.success,
  //     wishCount: response.wishCount,
  //     message: response.message,
  //     error: response.error,
  //   };

  //   return productWishCount;
  // };
  // const productWishCount = processResponse(productWishcountres);

  return (
    <div className="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[42px] recommend:gap-[64px]">
      <Product
        product={product}
        // cilunaPrice={cilunaPrice}
        variants={variants}
        // wishCount={productWishCount}
      />
      <ProductInfoTabs
        productId={id}
        overview={product.overview || { description: "", images: [] }}
      />

      <div className="flex flex-col gap-3 items-center !pt-2 pb-8 md:items-start md:pb-20 md:pt-[44px] custom-container">
        <SwiperCards
          products={relatedproduct}
          section={{
            category: "Flash Deals",
            title: "Recommended Products",
            description: "A fleeting collection of rare beauty.",
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
