import React from "react";
//import ProductCard from "@/app/product/ProductCard";
import { IProduct } from "@/types/product";
import Product1 from "@/public/assets/product/product1.webp";
import Product2 from "@/public/assets/product/product2.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCards from "@/components/custom/SwiperCards";
import { getAllProducts } from "@/actions/products/product";

const BestSelling = async () => {

  const productres = await getAllProducts();

  if (!productres.success || !productres.data) {
    return (
      <div className="p-4">
        <h2>{productres.message || "No products found in this section!"}</h2>
      </div>
    );
  }

  const products: IProduct[] = productres.data?.products;

  return (
    <div className="custom-container py-[24px] sm:py-[32px] lg:py-[96px]">
      <SwiperCards
        products={products}
        section={{
          category: "Jewellery",
          title: "Best Seller",
          description: "Chosen again and again for elegance that endures",
        }}
      />
    </div>
  );
};

export default BestSelling;
