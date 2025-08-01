// app/products/page.tsx
import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import Img from "@/public/assets/product/img.webp";
import ImgM from "@/public/assets/product/imgm.webp";
import { getAllProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
import Sort from "./Sort";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { getPawPrice } from "@/lib/pawService";
import toFixed from "@/functions/pawPrice";
import { getSubcategoryById } from "@/actions/subcategories/subcategory";
import { getAllBrands } from "@/actions/brands/brand";
import { getAllModels } from "@/actions/model/model";

const ProductPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParams = await searchParamsPromise;
  const price = await getPawPrice();
  const pawPrice = toFixed(Number(price));
  const currentPage = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search || "";
  const sortByParam = searchParams.sortBy || "default";
  const subcategoryId = searchParams.subcategoryId;
  const brandFilter = searchParams.brand;
  const modelFilter = searchParams.model;

  let sortBy = "createdAt";
  let sortOrder: "asc" | "desc" = "desc";

  switch (sortByParam) {
    case "latest":
      sortBy = "createdAt";
      sortOrder = "desc";
      break;
    case "price_low_high":
      sortBy = "price";
      sortOrder = "asc";
      break;
    case "price_high_low":
      sortBy = "price";
      sortOrder = "desc";
      break;
    case "name_a_z":
      sortBy = "name";
      sortOrder = "asc";
      break;
    case "price_z_a":
      sortBy = "name";
      sortOrder = "desc";
      break;
    case "default":
    default:
      sortBy = "createdAt";
      sortOrder = "desc";
      break;
  }

  let products: IProduct[] = [];
  let totalPages = 1;

  const brandRes = await getAllBrands({
    limit: 10,
    sortBy: "sold",
    sortOrder: "desc",
  });
  const modelRes = await getAllModels({
    limit: 10,
    sortBy: "sold",
    sortOrder: "desc",
  });
  const brands = brandRes?.data?.brands || [];
  const models = modelRes?.data?.models || [];

  const filters: Record<string, any> = {};
  if (brandFilter) {
    const brand = brands.find((b: any) => b.name === brandFilter);
    if (brand) filters.brand = brand._id;
  }
  if (modelFilter) {
    const model = models.find((m: any) => m.name === modelFilter);
    if (model) filters.model = model._id;
  }

  if (subcategoryId) {
    const subcategoryResponse = await getSubcategoryById(subcategoryId);
    if (subcategoryResponse.success && subcategoryResponse.data) {
      products = subcategoryResponse.data.products;
      totalPages = 1;
      products = products
        .filter((p) => (brandFilter ? p.brand?.name === brandFilter : true))
        .filter((p) => (modelFilter ? p.model?.name === modelFilter : true))
        .sort((a, b) => {
          if (sortBy === "name") {
            return sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
          if (sortBy === "price") {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
          }
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
        });
    }
  } else {
    const response = await getAllProducts({
      page: currentPage,
      search,
      sortBy,
      sortOrder,
      filters,
    });

    if (response.success && response.data) {
      products = response.data.products;
      totalPages = response.data.totalPages;
    }
  }

  const hasProducts = products.length > 0;

  return (
    <div className="flex flex-col gap-[32px] md:gap-[36px] lg:gap-[42px] recommend:gap-[48px]">
      <div>
        <Image src={Img} alt="img" className="hidden md:block" />
        <Image src={ImgM} alt="imgm" className="block md:hidden" />
      </div>
      <div className="flex flex-col gap-[24px] justify-center">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <Sort disabled={!hasProducts} />
          <Filter brands={brands} modals={models} />
        </div>
        {hasProducts ? (
          <>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:justify-start">
              {products.map((product: IProduct) => (
                <ProductCard
                  key={product._id.toString()}
                  product={product}
                />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <p className="text-center text-lg text-gray-400">No Products</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;