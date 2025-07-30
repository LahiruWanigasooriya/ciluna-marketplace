// app/search/page.tsx
import Image from "next/image";
import Img from "@/public/assets/product/img.webp";
import ImgM from "@/public/assets/product/imgm.webp";
import ProductCard from "../product/ProductCard";
import CategoryCard from "../category/CategoryCard";
import { searchItems } from "@/actions/search/search";
import { IProduct } from "@/types/product";
import { ICategory } from "@/types/category";
import { ISubCategory } from "@/types/subcategory";
import SubCategoryCard from "../category/SubCategotyCard";

interface SearchResults {
  products: IProduct[];
  categories: ICategory[];
  subCategories: ISubCategory[];
  error?: string;
}

// Define the props type with searchParams as a Promise
interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchResultsPage({
  searchParams,
}: SearchPageProps) {
  // Await the searchParams Promise to get the actual values
  const resolvedSearchParams = await searchParams;
  console.log("SearchParams received:", resolvedSearchParams);

  const query = (resolvedSearchParams.query as string) || "";
  console.log("Query extracted:", query);

  let results: SearchResults = {
    products: [],
    categories: [],
    subCategories: [],
  };

  if (query) {
    try {
      const formData = new FormData();
      formData.append("query", query);
      console.log("FormData query:", formData.get("query"));

      results = await searchItems(formData);

      console.log("Search Results:", {
        products: results.products.length,
        categories: results.categories.length,
        subCategories: results.subCategories.length,
        error: results.error,
      });
      console.log("Full Results:", results);
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
    <div className="xl:pt-[36px] pb-[90px] md:pb-[60px] xl:pb-[50px] recommend:pb-[40px]">
      <div className="flex flex-col gap-[32px] md:gap-[36px] lg:gap-[42px] recommend:gap-[48px]">
        <div>
          <Image
            src={Img}
            alt="Search Banner"
            className="hidden md:block w-full h-auto"
          />
          <Image
            src={ImgM}
            alt="Search Banner Mobile"
            className="block md:hidden w-full h-auto"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white leading-[19px] text-base text-start">
            Search Results for "{query}"
          </p>
          {results.products.length === 0 &&
          results.categories.length === 0 &&
          results.subCategories.length === 0 ? (
            <p className="text-white/70 text-center min-h-[200px] flex items-center justify-center">
              No search data found
            </p>
          ) : (
            <>
              {results.products.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-white/70 leading-[19px]">Products</p>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:justify-start">
                    {results.products.map((product: IProduct) => (
                      <ProductCard
                        key={product._id.toString()}
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              )}

              {results.subCategories.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-white/70 leading-[19px]">Sub Categories</p>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 w-full">
                    {results.subCategories.map((subCat: ISubCategory) => (
                      <SubCategoryCard
                        key={
                          subCat._id?.toString() || `subcategory-${subCat.name}`
                        }
                        category={subCat}
                      />
                    ))}
                  </div>
                </div>
              )}

              {results.categories.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-white/70 leading-[19px]">Categories</p>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4">
                    {results.categories.map((category: ICategory) => (
                      <CategoryCard
                        key={
                          category._id?.toString() ||
                          `category-${category.name}`
                        }
                        category={category}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
