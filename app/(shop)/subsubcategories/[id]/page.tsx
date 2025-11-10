import React from "react";
import Image from "next/image";
import ProductCard from "./../../product/ProductCard";
import bannerImage from "@/public/assets/product/bannerImage.webp";
import { getAllProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
import Sort from "./../../product/Sort";
import Filter from "./../../product/Filter";
import Pagination from "./../../product/Pagination";
import { getAllBrands } from "@/actions/brands/brand";
import { getAllModels } from "@/actions/model/model";
import ProductVarientTab from "./../../product/ProductVarientTab";
import { searchItems } from "@/actions/search/search";
import { ICategory } from "@/types/category";
import { ISubCategory } from "@/types/subcategory";
import { getSubSubCategoryById } from "@/actions/subsubcategories/subsubcategory";
import { getSubcategoryById } from "@/actions/subcategories/subcategory";

interface SearchResults {
  products: IProduct[];
  categories: ICategory[];
  subCategories: ISubCategory[];
  error?: string;
}

interface ProductPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductPage:any = async ({
  params,
  searchParams = {},
}: ProductPageProps) => {
  const id = params.id;

  const currentPage = parseInt(
    (Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page) || "1",
    10
  );

  const search = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search || "";

  const sortByParam = Array.isArray(searchParams.sortBy)
    ? searchParams.sortBy[0]
    : searchParams.sortBy || "default";

  const brandFilter = Array.isArray(searchParams.brand)
    ? searchParams.brand[0]
    : searchParams.brand;

  const modelFilter = Array.isArray(searchParams.model)
    ? searchParams.model[0]
    : searchParams.model;
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
  let categoryName = "Category";
  let subcategoryName = "Subcategory";
  let subcategoryDescription = "No description available";

  // Fetch subsubcategory data
  const subsubcategoryResponse = await getSubSubCategoryById(params.id);
  if (!subsubcategoryResponse.success || !subsubcategoryResponse.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] custom-container">
        <p className="text-lg text-gray-600">
          {subsubcategoryResponse.message || "Sub-subcategory not found"}
        </p>
      </div>
    );
  }

  const { subsubcategory, products: subsubcategoryProducts } =
    subsubcategoryResponse.data;
  products = subsubcategoryProducts || [];

  // Fetch subcategory to get name and description
  const subcategoryResponse = await getSubcategoryById(
    subsubcategory.subcategoryId
  );
  if (subcategoryResponse.success && subcategoryResponse.data) {
    subcategoryName =
      subcategoryResponse.data.subcategory?.name || "Subcategory";
    subcategoryDescription =
      subcategoryResponse.data.subcategory?.description ||
      "No description available";

    // Fetch category to get category name 
    const categoryId = subcategoryResponse.data.subcategory?.category;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const categoryResponse = await fetch(
      `${baseUrl}/api/category?categoryId=${categoryId}`
    );

    const categoryData = await categoryResponse.json();

    // Fix: use 'product' instead of 'category'
    if (categoryData.success && categoryData.data?.product) {
      console.log("Category data from API:", categoryData.data.product);
      categoryName = categoryData.data.product.name || "Category";
    }
  }

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

  // Apply filters and sorting
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

  const hasProducts = products.length > 0;

  // Search Results Handling
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.query as string) || "";

  let results: SearchResults = {
    products: [],
    categories: [],
    subCategories: [],
  };

  if (query) {
    try {
      const formData = new FormData();
      formData.append("query", query);
      results = await searchItems(formData);
      console.log("Search Results:", {
        products: results.products.length,
        categories: results.categories.length,
        subCategories: results.subCategories.length,
        error: results.error,
      });
    } catch (error) {
      console.error("Error executing search action:", error);
      results = {
        products: [],
        categories: [],
        subCategories: [],
        error: "Failed to load search results",
      };
    }
  } else {
    console.log("No query provided, returning empty results");
  }

  return (
    <div className="flex flex-col pb-[32px] md:pb-[36px]">
      <div className="relative">
        <Image
          src={bannerImage}
          alt="bannerimg"
          className="hidden md:block w-screen h-[468px] object-cover object-top mt-[108px]"
          style={{ objectPosition: "center 10%" }}
        />
        <Image
          src={bannerImage}
          alt="bannerImage mobile"
          className="block md:hidden w-screen h-[318px] object-cover object-center pt-14 "
          style={{ objectPosition: "center 10%" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-2/3 sm:h-1/2 recommend:h-[244px] blur-banner backdrop-blur-[3px]"></div>

        <div className="absolute md:top-[50px] bottom-0 w-full h-full flex items-end md:items-center justify-center">
          <div className="text-white text-center max-w-2xl p-4 md:max-w-[866px] md:w-full">
            <h2 className="text-2xl md:text-[40px] font-kaiseiHarunoUmi mb-3">
              {categoryName} - {subcategoryName}
            </h2>
            <p className="text-[14px] font-lora font-normal md:text-base sm:leading-6 leading-relaxed">
              {subcategoryDescription}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start mt-0">
        <ProductVarientTab subcategoryId={subsubcategory.subcategoryId} />
      </div>

      <div className="flex flex-col gap-[20px] justify-center max-w-[1440px] mx-auto w-full custom-container md:py-0">
        {query && (
          <div className="flex flex-col pb-5">
            <div className="font-bold font-[Arial] leading-6 mt-6 pb-5 md:mt-8 md:pb-6">
              Search Results for "{query}"
            </div>
            {results.products.length === 0 &&
            results.categories.length === 0 &&
            results.subCategories.length === 0 ? (
              <p className="text-center min-h-[200px] flex items-center justify-center">
                No search data found
              </p>
            ) : (
              <>
                {results.products.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="leading-[19px]">Products</p>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:justify-start">
                      {results.products.map((product: IProduct) => (
                        <ProductCard
                          key={product._id.toString()}
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!query && (
          <div className="flex flex-row min-h-[34px] justify-between items-center font-[Arial] pt-6 pb-5 md:pt-8 md:pb-6">
            <div className="font-bold text-base leading-6">
              {products.length} Products
            </div>
            <div className="flex flex-row gap-4 h-[34px]">
              <button className="cursor-not-allowed" disabled>
                <Sort />
              </button>
              <button className="cursor-not-allowed" disabled>
                <Filter />
              </button>
            </div>
          </div>
        )}
        {!query && (
          <>
            {hasProducts ? (
              <>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:justify-center md:mb-9">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
