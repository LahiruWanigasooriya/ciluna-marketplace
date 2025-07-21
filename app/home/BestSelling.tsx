import Title from "@/components/custom/Title";
import React from "react";
import ProductCard from "@/app/product/ProductCard";
import { getAllProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
import { getPawPrice } from "@/lib/pawService";
import toFixed from "@/functions/pawPrice";

const BestSelling = async () => {
  const price = await getPawPrice();
  const pawPrice = toFixed(Number(price));
  // Fetch best-selling products
  const response = await getAllProducts({
    limit: 10,
    sortBy: "sold",
    sortOrder: "desc",
  });

  // Handle error
  if (!response.success) {
    return (
      <div className="text-white">Failed to load best-selling products.</div>
    );
  }

  const products = response?.data?.products;

  return (
    <div className="flex flex-col gap-3 items-center text-white ">
      <Title title="Best Selling" />
      <p className="text-sm font-normal text-center leading-[24px] md:px-[30px] lg:px-[59px]">
        {`Upgrade your tech setup with our top-selling computer accessories!
      These must-have products are trusted by tech enthusiasts and
      professionals alike, offering superior performance, durability, and
      style. Whether you're building your dream workstation or simply
      enhancing your current setup, our best sellers have you covered.`}
      </p>
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 recommend:gap-[15px] pt-3 w-full">
          {products?.map((product: IProduct) => (
            <ProductCard
              key={product._id}
              pawPrice={pawPrice}
              product={product}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSelling;
