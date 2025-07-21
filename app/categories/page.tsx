import React from "react";
import Image from "next/image";
import Img from "@/public/assets/product/img.webp";
import ImgM from "@/public/assets/product/imgm.webp";
import { getAllCategories } from "@/actions/categories/category";
import { ICategory } from "@/types/category";
import CategoryCard from "../category/CategoryCard";
import Pagination from "@/app/product/Pagination";

const page = async ({ searchParams: searchParamsPromise }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const searchParams = await searchParamsPromise;
  const currentPage = parseInt(searchParams.page || "1", 12);
  const search = searchParams.search || "";
  const sortBy = searchParams.sortBy || "createdAt";

  const catresponse = await getAllCategories({
    page: currentPage,
    search,
    sortBy,
    sortOrder: "desc",
  });
  const categories = catresponse?.data?.categories;

  return (
    <div className="flex flex-col gap-[32px] md:gap-[36px] lg:gap-[42px] recommend:gap-[48px]">
      <div>
        <Image src={Img} alt="img" className="hidden md:block" />
        <Image src={ImgM} alt="imgm" className="block md:hidden" />
      </div>
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4">
        {categories?.map((category: ICategory) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={catresponse?.data?.totalPages || 1}
      />
    </div>
  );
};

export default page;
