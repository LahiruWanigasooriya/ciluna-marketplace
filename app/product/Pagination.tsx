"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React,{useState} from "react";

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
    <div className="flex items-center justify-center w-full flex-col">
      <p className="flex text-[#707070] text-base font-arial">{` ${currentPage} - ${totalPages}`}</p>
    
    {currentPage < totalPages &&(
      <button 
      onClick={goToNextPage}
      className="bg-inherit pt-4 pr-8 pb-4 pl-8 gap-2.5 text-[#252525] border rounded-[8px] border-[#252525] w-[176px] h-[56px]">
        Load 20 more

      </button>
    )}


    
    </div>
  );
};

export default Pagination;