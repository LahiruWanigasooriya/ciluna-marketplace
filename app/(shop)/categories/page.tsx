import React from "react";
import Image from "next/image";
import Img from "@/public/assets/product/img.png";
import ImgM from "@/public/assets/product/imgm.jpg";
import { getAllCategories } from "@/backend/actions/categories/category";
import { ICategory } from "@/types/category";
import CategoryCard from "../category/CategoryCard";
import Pagination from "../product/Pagination";

const page = async ({
	searchParams: searchParamsPromise,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
	const searchParams = await searchParamsPromise;
	const currentPage = parseInt(searchParams.page || "1", 10);
	const search = searchParams.search || "";
	const sortBy = searchParams.sortBy || "createdAt";

	let catresponse;
	try {
		catresponse = await getAllCategories({
			page: currentPage,
			search,
			sortBy,
			sortOrder: "desc",
		});
	} catch (error) {
		console.error("Error fetching categories:", error);
		return (
			<div>
				<p>Error loading categories. Please try again later.</p>
			</div>
		);
	}

	const categories = catresponse?.data?.categories || [];
	const totalPages = catresponse?.data?.totalPages || 1;

	return (
		<div className="flex flex-col gap-[32px] md:gap-[36px] lg:gap-[42px] recommend:gap-[48px]">
			<div>
				<Image src={Img} alt="img" className="hidden md:block" />
				<Image src={ImgM} alt="imgm" className="block md:hidden" />
			</div>
			<div className="grid grid-cols-2 md:flex md-flex-wrap gap-4">
				{categories.length > 0 ? (
					categories.map((category: ICategory) => <CategoryCard key={category._id} category={category} />)
				) : (
					<p>No categories found.</p>
				)}
			</div>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
};

export default page;
