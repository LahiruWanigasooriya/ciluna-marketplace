"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  currentPage: number; 
  totalPages: number; 
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const numberStyle =
    "h-[36px] w-[36px] flex justify-center items-center text-white border cursor-pointer hover:bg-[#FFFFFF]/5";
  const buttonStyle =
    "flex justify-center items-center bg-[#6442C1] h-[36px] w-[36px]";

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", (currentPage - 1).toString());
      router.push(`?${params.toString()}`);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", (currentPage + 1).toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 3) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    let startPage = 1;
    let endPage = 4;

    if (currentPage >= 5) {
      startPage = currentPage - 3;
      endPage = currentPage;
    }

    if (endPage > totalPages) {
      startPage = totalPages - 3;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-end w-full">
      <div className="flex gap-2 items-center">
        <div
          className={`${buttonStyle} ${
            currentPage === 1 ? "opacity-50" : "cursor-pointer hover:bg-[#6442C1]/80"
          }`}
          onClick={goToPrevPage}
        >
          <ChevronLeft className="text-white" />
        </div>
        {getPageNumbers().map((pageNumber) => (
          <div
            key={pageNumber}
            className={`${numberStyle} ${
              currentPage === pageNumber
                ? "bg-[#6442C1]/40 border border-solid border-[#D6D6D6]"
                : "border border-solid border-[#6442C1]"
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}

        <div
          className={`${buttonStyle} ${
            currentPage === totalPages
              ? " opacity-50"
              : "cursor-pointer hover:bg-[#6442C1]/80"
          }`}
          onClick={goToNextPage}
        >
          <ChevronRight className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;