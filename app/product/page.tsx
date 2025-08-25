// app/products/page.tsx
import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import bannerImage from "@/public/assets/product/bannerImage.webp";
import { getAllProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
import Sort from "./Sort";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { getCilunaPrice } from "@/lib/cilunaService";
import toFixed from "@/functions/cilunaPrice";
import { getSubcategoryById } from "@/actions/subcategories/subcategory";
import { getAllBrands } from "@/actions/brands/brand";
import { getAllModels } from "@/actions/model/model";
import ProductVarientTab from "./ProductVarientTab";

const ProductPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParams = await searchParamsPromise;
  const price = await getCilunaPrice();
  const cilunaPrice = toFixed(Number(price));
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
    case "popularity":
      sortBy = "name";
      sortOrder = "asc";
      break;
    case "bestsellers":
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
    
        <div className="flex flex-col pb-[32px] md:pb-[36px] lg:pb-[42px] recommend:pb-[48px]">

      <div className="relative">
        <Image src={bannerImage} alt="bannerimg" className="hidden sm:block w-screen h-[468px] object-cover object-top"
        style={{ objectPosition: 'center 10%' }}  />
       
        
        <Image src={bannerImage} alt="bannerImage" className="block sm:hidden w-screen h-[468px] object-cover "
        style={{objectPosition: 'center 30%'}}  />
        

          <div className="absolute bottom-0 w-full h-2/3 sm:h-1/2"
              style={{
                backdropFilter: `blur(8px)`,
                maskImage: `linear-gradient(
                  0deg, 
                  rgba(0,0,0,1) 0%, 
                  rgba(0,0,0,0.7) 40%, 
                  rgba(0,0,0,0) 86.26%
                )`,
                WebkitMaskImage: `linear-gradient(
                  0deg, 
                  rgba(0,0,0,1) 0%, 
                  rgba(0,0,0,0.7) 40%, 
                  rgba(0,0,0,0) 86.26%
                )`
              }}>
          </div>


          <div className="absolute bottom-0 w-full h-2/3 "
              style={{
                background: `linear-gradient(
                  0deg, 
                  rgba(0,0,0,0.6) 0%, 
                  rgba(0,0,0,0.3) 40%, 
                  transparent 86.26%
                )`
              }}>
          </div>


          <div className="absolute bottom-0 sm:bottom-1/4 w-full h-fit flex items-end sm:items-center justify-center ">
            <div className="text-white text-center  max-w-2xl pt-8 pb-8 pl-4 pr-4">
              <h2 className="text-3xl sm:text-[40px] font-bold font-kaiseiHarunoumi mb-3">Women's Clothing</h2>
              <p className="text-sm font-lora sm:text-base sm:leading-6 leading-relaxed">
                An edit of refined essentials designed to express quiet strength and lasting beauty. Each piece is crafted
                with intention made to feel effortless, look timeless, and move with you through every moment.
              </p>
            </div>
          </div>
        
      </div>
       <div className="flex justify-start mt-0"><ProductVarientTab/></div> 
      
      <div className="flex flex-col gap-[20px] justify-center  pt-6 pr-4 pb-8 pl-4">
        <div className="flex flex-row  h-[34px] justify-between items-start font-loraBold">
          <div className="font-loraBold text-base leading-6 text-[#252525]">{products.length} Products</div>
        <div className="flex flex-row gap-4 h-[34px]">
        <button className="cursor-pointer">

          <Sort />
          
        </button>
        <button className="cursor-pointer">

          <Filter />
          
        </button>
        </div>
        </div>
        {hasProducts ? (
          <>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:justify-start">
              {products.map((product: IProduct) => (
                <ProductCard key={product._id.toString()} product={product} />
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
