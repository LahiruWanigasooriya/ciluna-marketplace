import React from "react";
import ProductInfoTabs from "./ProductInfoTabs";
import { getRelatedProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
import Title from "@/components/custom/Title";
import ProductCard from "../ProductCard";
/*
import Product from "./Product";
import { getProductWishCount } from "@/actions/wishlists/wishlist";
import { ProductWishCountResponse } from "@/types/wishlist";
import { IProductVariant } from "@/types/productVariant";
import { getCilunaPrice } from "@/lib/cilunaService";
import toFixed from "@/functions/cilunaPrice";

interface Pro {
 product: IProduct;
 variants?: IProductVariant;
}
 */
const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) => {
  const id = (await params).id;
  const relatedres = await getRelatedProducts(id);
  const relatedproduct: IProduct[] = relatedres?.data?.relatedItems || [];

  /*
  {
const productres = await getProductById(id);
  const relatedres = await getRelatedProducts(id);
  const productWishcountres = await getProductWishCount(id);
  const price = await getCilunaPrice();
  const cilunaPrice = toFixed(Number(price));

  if (!productres.success || !productres.data) {
    return (
      <div className="p-4">
        <h2>{productres.message || "Product not found!"}</h2>
      </div>
    );
  }

    const product: IProduct = productres.data.product;
  const variants: IProductVariant = productres.data.variants;
  const relatedproduct: IProduct[] = relatedres?.data?.relatedItems;

  const processResponse = (response: any): ProductWishCountResponse => {
    if (typeof response.success !== "boolean") {
      throw new Error("Invalid response: success flag missing or invalid.");
    }

    const productWishCount: ProductWishCountResponse = {
      success: response.success,
      wishCount: response.wishCount,
      message: response.message,
      error: response.error,
    };

    return productWishCount;
  };
  const productWishCount = processResponse(productWishcountres);
  }
   */

  return (
    <div className="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[42px] recommend:gap-[64px]">
      {/* <Product
        product={product}
        cilunaPrice={cilunaPrice}
        variants={variants}
        wishCount={productWishCount}
      /> */}
      <ProductInfoTabs productId={id} />

      <div className="flex flex-col gap-3 items-center md:items-start md:pt-8 custom-container md:py-0">
        <Title title="Recommended Products" className="text-black" />
        <div className="flex flex-wrap gap-4 w-full overflow-y-auto overflow-hidden justify-start">
          {relatedproduct.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
