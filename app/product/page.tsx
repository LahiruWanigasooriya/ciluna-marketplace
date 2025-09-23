import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import bannerImage from "@/public/assets/product/bannerImage.webp";
import { getAllProducts } from "@/actions/products/product";
import { IProduct } from "@/types/product";
import Sort from "./Sort";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { getAllBrands } from "@/actions/brands/brand";
import { getAllModels } from "@/actions/model/model";
import ProductVarientTab from "./ProductVarientTab";
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

const ProductPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const searchParams = await searchParamsPromise;
  const subsubcategoryId = searchParams.subsubcategoryId;
  const subcategoryIdFromUrl = searchParams.subcategoryId;

  const currentPage = parseInt(searchParams.page || "1", 10);
  const search = searchParams.search || "";
  const sortByParam = searchParams.sortBy || "default";
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
  let subcategoryId: string | undefined;

  // Handle subsubcategoryId or subcategoryId for "View All"
  if (subsubcategoryId) {
    // Case 1: Specific subsubcategory selected
    const subsubcategoryResponse = await getSubSubCategoryById(subsubcategoryId);
    if (!subsubcategoryResponse.success || !subsubcategoryResponse.data) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] custom-container">
          <p className="text-lg text-gray-600">
            {subsubcategoryResponse.message || "Sub-subcategory not found"}
          </p>
        </div>
      );
    }
    const { subsubcategory, products: subsubcategoryProducts } = subsubcategoryResponse.data;
    products = subsubcategoryProducts || [];
    subcategoryId = subsubcategory.subcategoryId;
  } else if (subcategoryIdFromUrl) {
    // Case 2: "View All" for a subcategory
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/product?subcategoryId=${subcategoryIdFromUrl}`);
      const data = await response.json();
      console.log("Fetched products for subcategory:", data);
      if (data.success && data.data && data.data.products) {
        products = data.data.products || [];
        subcategoryId = subcategoryIdFromUrl;
      } else {
        console.warn("Failed to fetch products for subcategory:", data.message || "No data");
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] custom-container">
            <p className="text-lg text-gray-600">
              {data.message || "No products found for this subcategory"}
            </p>
          </div>
        );
      }
    } catch (err) {
      console.error("Failed to fetch products for subcategory:", err);
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] custom-container">
          <p className="text-lg text-gray-600">
            An error occurred while fetching products
          </p>
        </div>
      );
    }
  } else {
    // Case 3: No valid IDs provided
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] custom-container">
        <p className="text-lg text-gray-600">No subsubcategoryId or subcategoryId provided</p>
      </div>
    );
  }

  // Fetch subcategory to get name and description
  if (subcategoryId) {
    try {
      const subcategoryResponse = await getSubcategoryById(subcategoryId);
      if (subcategoryResponse.success && subcategoryResponse.data) {
        subcategoryName =
          subcategoryResponse.data.subcategory?.name || "Subcategory";
        subcategoryDescription =
          subcategoryResponse.data.subcategory?.description ||
          "No description available";

        // Fetch category to get category name
        const categoryId = subcategoryResponse.data.subcategory?.category;
        if (categoryId) {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            const categoryResponse = await fetch(
              `${baseUrl}/api/category?categoryId=${categoryId}`
            );
            const categoryData = await categoryResponse.json();
            console.log("Fetched category data:", categoryData);

            if (categoryData.success && categoryData.data?.product) {
              categoryName = categoryData.data.product.name || "Category";
            } else {
              console.warn("Failed to fetch category name:", categoryData.message || "No category data");
            }
          } catch (err) {
            console.error("Fetch /api/category error:", err);
          }
        }
      } else {
        console.warn("Failed to fetch subcategory:", subcategoryResponse.message || "No subcategory data");
      }
    } catch (err) {
      console.error("Fetch subcategory error:", err);
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

  const productsPerPage = 20;
  totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);

  const hasProducts = paginatedProducts.length > 0;

  // Search Results Handling
  const query = (searchParams.query as string) || "";
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
        {subcategoryId ? (
          <ProductVarientTab subcategoryId={subcategoryId} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-lg text-gray-600">No subcategory ID available</p>
          </div>
        )}
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
                    <div className="grid grid-cols-2 sm:flex sm-flex-wrap gap-4 sm:justify-start">
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
                <div className="grid grid-cols-2 sm:flex sm-flex-wrap gap-4 sm:justify-center md:mb-9">
                  {paginatedProducts.map((product: IProduct) => (
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