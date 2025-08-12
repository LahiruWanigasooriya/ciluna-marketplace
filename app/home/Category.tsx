import Title from "@/components/custom/Title";
import React from "react";
import CategoryCard from "@/app/category/CategoryCard";
import { getAllCategories } from "@/actions/categories/category";
import { ICategory } from "@/types/category";

const CategorySection = async () => {
  // Fetch categories from the server
  const response = await getAllCategories({ page: 1, limit: 100 });

  // Handle error
  if (!response.success) {
    return <div className="text-black">Failed to load categories.</div>;
  }

  const categories = response?.data?.categories; // Extract categories

  return (
    <div className="flex flex-col gap-3 items-center text-black">
      <Title title="Categories" />
      <p className="text-sm font-normal text-center md:px-[30px] lg:px-[59px]">
        {`Our extensive computer accessory selection enhances your digital
      experience. We provide goods for home office upgrades, gaming
      performance, and workspace optimization. Browse high-quality
      keyboards, mouse, cameras, headsets, external storage, cables, and
      more. Every category has carefully chosen goods from reputable
      companies for durability, efficiency, and the newest technology. Find
      the right accessories to increase productivity and upgrade your
      computer.`}
      </p>
      <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 recommend:gap-[15px] pt-3 w-full">
        {categories?.map((category: ICategory) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
