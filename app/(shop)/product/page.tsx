import React, { memo } from "react";
import Image from "next/image";
import bannerImage from "@/public/assets/product/bannerImage.webp";
import { getAllProducts } from "@/backend/actions/products/product";
import { IProduct } from "@/types/product";
import { getAllBrands } from "@/backend/actions/brands/brand";
import { getAllModels } from "@/backend/actions/model/model";
import { getSubSubCategoryById } from "@/backend/actions/subsubcategories/subsubcategory";
import { getSubcategoryById } from "@/backend/actions/subcategories/subcategory";
import { ISubSubCategory } from "@/types/subsubcategory";
import { ISubCategory } from "@/types/subcategory";
import { ICategory } from "@/types/category";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import Sort from "./Sort";
import ProductVarientTab from "./ProductVarientTab";
import { getCategoryById } from "@/backend/actions/categories/category";
import { searchItems } from "@/backend/actions/search/search";

interface ProductPageProps {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}

interface ProductData {
	products: IProduct[];
	subcategoryId: string;
	category?: ICategory;
	subcategory?: ISubCategory;
	subsubcategory?: ISubSubCategory;
	subcategories?: ISubCategory[];
	subsubcategories?: ISubSubCategory[];
}

const ITEMS_PER_PAGE = 20;
const DEFAULT_CATEGORY_NAME = "Ciluna";
const DEFAULT_SUBCATEGORY_NAME = "Products";
const DEFAULT_SUBCATEGORY_DESC = "";
const DEFAULT_SORT = { field: "createdAt" as const, order: "desc" as const };

const sortConfig = {
	latest: { field: "createdAt", order: "desc" as const },
	price_low_high: { field: "price", order: "asc" as const },
	price_high_low: { field: "price", order: "desc" as const },
	popularity: { field: "name", order: "asc" as const },
	bestsellers: { field: "name", order: "desc" as const },
	default: DEFAULT_SORT,
};

const fetchInitialData = async () => {
	const [brandRes, modelRes] = await Promise.all([
		getAllBrands({ limit: 10, sortBy: "sold", sortOrder: "desc" }),
		getAllModels({ limit: 10, sortBy: "sold", sortOrder: "desc" }),
	]);
	return {
		brands: brandRes?.data?.brands || [],
		models: modelRes?.data?.models || [],
	};
};

const fetchCategory = async (categoryId: string): Promise<ICategory | undefined> => {
	const response = await getCategoryById(categoryId);
	return response.success && response.data?.category ? response.data.category : undefined;
};

const fetchSubcategoryDetails = async (
	subcategoryId: string
): Promise<{
	subcategory?: ISubCategory;
	category?: ICategory;
	subcategoryId: string;
}> => {
	const response = await getSubcategoryById(subcategoryId);
	if (!response.success || !response.data?.subcategory) {
		return { subcategoryId, category: undefined, subcategory: undefined };
	}
	const { subcategory } = response.data;
	const category = subcategory.category ? await fetchCategory(subcategory.category) : undefined;
	return { subcategory, category, subcategoryId };
};

const fetchProductsBySubsubcategory = async (subsubcategoryId: string): Promise<ProductData> => {
	const response = await getSubSubCategoryById(subsubcategoryId);
	if (!response.success || !response.data) {
		return {
			products: [],
			subcategoryId: "",
			category: undefined,
			subcategory: undefined,
			subsubcategory: undefined,
		};
	}
	const { subsubcategory, products } = response.data;
	const subcategoryDetails = await fetchSubcategoryDetails(subsubcategory.subcategoryId);
	return {
		products: products || [],
		subcategoryId: subsubcategory.subcategoryId,
		category: subcategoryDetails.category,
		subcategory: subcategoryDetails.subcategory,
		subsubcategory,
	};
};

const fetchProductsBySubcategory = async (subcategoryId: string): Promise<ProductData> => {
	const subcategoryDetails = await fetchSubcategoryDetails(subcategoryId);
	const response = await getSubcategoryById(subcategoryId);
	const products = response.success ? response.data?.products || [] : [];
	return {
		products,
		subcategoryId,
		category: subcategoryDetails.category,
		subcategory: subcategoryDetails.subcategory,
		subsubcategory: undefined,
	};
};

const fetchAllProducts = async (): Promise<ProductData> => {
	const response = await getAllProducts({});
	return {
		products: response?.data?.products || [],
		subcategoryId: "",
		category: undefined,
		subcategory: undefined,
		subsubcategory: undefined,
	};
};

const applyFiltersAndSort = (
	products: IProduct[],
	brands: any[],
	models: any[],
	brandFilter?: string,
	modelFilter?: string,
	sortBy: string = DEFAULT_SORT.field,
	sortOrder: "asc" | "desc" = DEFAULT_SORT.order
) => {
	let filteredProducts = [...products];

	if (brandFilter) {
		const brand = brands.find((b) => b.name === brandFilter);
		if (brand) filteredProducts = filteredProducts.filter((p) => p.brand?._id === brand._id);
	}

	if (modelFilter) {
		const model = models.find((m) => m.name === modelFilter);
		if (model) filteredProducts = filteredProducts.filter((p) => p.model?._id === model._id);
	}

	return filteredProducts.sort((a, b) => {
		if (sortBy === "name") {
			return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
		}
		if (sortBy === "price") {
			return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
		}
		if (sortBy === "popularity") {
			return sortOrder === "asc" ? (a.wishCount || 0) - (b.wishCount || 0) : (b.wishCount || 0) - (a.wishCount || 0);
		}
		if (sortBy === "bestsellers") {
			return sortOrder === "asc" ? (a.sold || 0) - (b.sold || 0) : (b.sold || 0) - (a.sold || 0);
		}

		const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
		const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
		return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
	});
};

const fetchSearchResults = async (query: string): Promise<ProductData> => {
	const formData = new FormData();
	formData.append("query", query);
	const result = await searchItems(formData);
	return {
		products: result?.products || [],
		subcategoryId: "",
		category: undefined,
		subcategory: undefined,
		subsubcategory: undefined,
		subcategories: result?.subCategories || [],
		subsubcategories: result?.subsubCategories || [],
	};
};

const ProductPage: React.FC<ProductPageProps> = async ({ searchParams: searchParamsPromise }) => {
	const searchParams = await searchParamsPromise;
	const { subsubcategoryId, subcategoryId, page = "1", query = "", sortBy = "default", brand, model } = searchParams;
	const currentPage = parseInt(page, 10);
	const { field: sortField, order: sortOrder } = sortConfig[sortBy as keyof typeof sortConfig] || DEFAULT_SORT;

	const { brands, models } = await fetchInitialData();

	// Fetch search results if query exists: Priority one
	const searchResults = query ? await fetchSearchResults(query) : null;

	let productData: ProductData;
	if (searchResults) {
		productData = searchResults;
	} else if (subsubcategoryId) {
		productData = await fetchProductsBySubsubcategory(subsubcategoryId);
	} else if (subcategoryId) {
		productData = await fetchProductsBySubcategory(subcategoryId);
	} else {
		productData = await fetchAllProducts();
	}

	let paginatedProducts: IProduct[] = [];
	let totalPages = 1;

	if (searchResults && query) {
		let filteredSearchProducts = searchResults.products;

		if (subsubcategoryId) {
			filteredSearchProducts = filteredSearchProducts.filter((p) => p.subsubcategory?.toString() === subsubcategoryId);
		}
		productData.products = filteredSearchProducts;
	}

	const filteredProducts = applyFiltersAndSort(
		productData.products,
		brands,
		models,
		brand,
		model,
		sortField,
		sortOrder
	);
	totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	return (
		<div className="flex flex-col pb-8 md:pb-4">
			<div className="relative">
				<Image
					src={bannerImage}
					alt="Product banner"
					className="w-full h-[318px] md:h-[468px] object-cover mt-[58px] md:mt-[108px]"
					style={{ objectPosition: "center 10%" }}
					priority
				/>
				<div className="absolute bottom-0 w-full h-3/5 sm:h-1/2 recommend:h-[244px] backdrop-blur-[2px] blur-banner-hero" />
				<div className="absolute inset-0 md:top-1/4 flex items-end md:items-center justify-center">
					<div className="text-white text-center max-w-2xl p-4 md:max-w-[866px] w-full">
						<h2 className="text-2xl md:text-[40px] md:leading-[48px] font-kaiseiHarunoUmi mb-3">
							{query
								? `Search results for "${query}"`
								: `${productData.category?.name || DEFAULT_CATEGORY_NAME} - ${
										productData.subcategory?.name || DEFAULT_SUBCATEGORY_NAME
								  }`}
						</h2>
						<p className="text-sm md:text-base font-arial md:leading-6 font-normal leading-5">
							{query
								? "Explore our curated collection of premium products."
								: productData.subcategory?.description || DEFAULT_SUBCATEGORY_DESC}
						</p>
					</div>
				</div>
			</div>

			<ProductVarientTab subcategoryId={productData.subcategoryId} />

			<div className="flex flex-col gap-5 max-w-[1440px] mx-auto w-full custom-container md:py-0">
				<div className="flex flex-col">
					<div className="flex flex-row min-h-[34px] justify-between items-center font-arial pt-6 pb-5 md:pt-8 md:pb-6">
						<h3 className="font-arialBold text-base md:text-lg leading-6">{paginatedProducts.length} Products</h3>
						<div className="flex flex-row space-x-6 md:space-x-8 h-[24px] justify-center items-center">
							<Sort aria-label="Sort products" />
							<Filter aria-label="Filter products" />
						</div>
					</div>
					{paginatedProducts.length === 0 ? (
						<p className="text-center min-h-[200px] flex items-center justify-center text-gray-600">
							{query && searchResults?.products?.length === 0 ? "No search Products found" : "No Products Found"}
						</p>
					) : (
						<div className="flex flex-col gap-5 md:gap-9">
							<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-y-5 gap-x-[15px] lg:gap-x-6 lg:gap-y-10 sm:justify-start">
								{paginatedProducts.map((product) => (
									<ProductCard key={product._id.toString()} product={product} />
								))}
							</div>
							<Pagination currentPage={currentPage} totalPages={totalPages} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(ProductPage);
