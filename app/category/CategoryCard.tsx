"use client";

import Image from "next/image";
// import { CardVariants } from "@/utils/animations";
import { ICategory } from "@/types/category";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";
import Link from "next/link";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (category._id !== null) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [category._id]);

  const truncatedName =
    category.name.length > 20
      ? `${category.name.substring(0, 20)} ...`
      : category.name;

  return (
    <Link
      key={category._id}
      href={`/subcategories/${category._id}`}
      passHref
      className="flex flex-col gap-4 p-2 lg:p-3 justify-between cursor-pointer border border-[#ffffff00] rounded-[0.4rem] bg-[#FFFFFF0D]/5  hover:border-blue transition-all duration-300 ease-in-out recommend:min-w-[147px] min-w-[160px] sm:w-[calc(23%-0.75rem)] lg:w-[calc(13.33%-0.833rem)] xl:w-[calc(8.33%-0.833rem)] recommend:w-[calc(6.33%-0.833rem)]"
    >
      <div>
        {isLoading ? (
          <Skeleton className="h-[144.02px] md:h-[172px] w-[160px]  md:w-full" />
        ) : (
          <div className="relative">
            <Image
              alt={category.name}
              src={category.image}
              width={100}
              height={100}
              className="rounded-[0.4rem] w-full aspect-[160/146] object-cover"
            />
          </div>
        )}
      </div>
      {isLoading ? (
        <Skeleton className="w-full h-5" />
      ) : (
        <p className="truncate font-interSemiBold text-xxs md:text-sm text-white">
          {truncatedName}
        </p>
      )}
    </Link>
  );
};

export default CategoryCard;
