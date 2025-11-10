import Image from "next/image";
import Img from "@/public/assets/product/img.png";
import ImgM from "@/public/assets/product/imgm.jpg";
import { getAllSubCategories } from "@/actions/subcategories/subcategory";
import { ISubCategory } from "@/types/subcategory";
import Pagination from "@/app/product/Pagination";
import SubCategoryCard from "@/app/(shop)/category/SubCategotyCard";

const SubCategoryPage = async ({
	params: searchParamsPromise,
}: {
	params: Promise<{ [key: string]: string | undefined }>;
}) => {
	const params = await searchParamsPromise;
	const currentPage = parseInt(params.page || "1", 12);
	const search = params.search || "";
	const sortBy = params.sortBy || "createdAt";

	const subCatResponse = await getAllSubCategories({
		page: currentPage,
		search,
		sortBy,
		sortOrder: "desc",
		limit: 100,
	});

	const allSubCategories = subCatResponse?.data?.subcategories || [];
	const subCategories = allSubCategories.filter((subCategory: ISubCategory) => subCategory.category === params.id);

	return (
		<div className="xl:pt-[36px] pb-[90px] md:pb-[60px] xl:pb-[50px] recommend:pb-[40px]">
			<div className="flex flex-col gap-[32px] md:gap-[36px] lg:gap-[42px] recommend:gap-[48px]">
				<div>
					<Image src={Img} alt="img" className="hidden md:block" />
					<Image src={ImgM} alt="imgm" className="block md:hidden" />
				</div>
				{subCategories.length > 0 ? (
					<div className="flex flex-col gap-[32px] md:gap-[36px] lg:gap-[42px] recommend:gap-[48px]">
						<div className="flex flex-wrap gap-4 recommend:gap-[15px]">
							{subCategories.map((subCategory: ISubCategory) => (
								<SubCategoryCard key={subCategory._id} category={subCategory} />
							))}
						</div>
						<Pagination currentPage={currentPage} totalPages={subCategories?.data?.totalPages || 1} />
					</div>
				) : (
					<div className="flex justify-center items-center">
						<p className="text-center text-lg text-gray-400">No Subcategory items</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SubCategoryPage;
