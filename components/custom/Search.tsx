"use client";

import Logo from "../../public/assets/mobLogo.webp";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getTrendingProducts } from "@/backend/actions/products/product";
import { IProduct } from "@/types/product";
import ProductCard from "@/app/(shop)/product/ProductCard";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside";
import { addSearchQuery, getPopularSearchQueries, searchItems } from "@/backend/actions/search/search";
import { motion } from "framer-motion";
import Filter from "@/app/(shop)/product/Filter";

interface SearchQuery {
	_id: string;
	query: string;
}

interface SearchModalProps {
	onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [searchQuery, setSearchQuery] = useState<string>(() => searchParams?.get("search")?.trim() ?? "");
	const [suggestions, setSuggestions] = useState<SearchQuery[]>([]);
	const [products, setProducts] = useState<IProduct[]>([]);
	const [trendingProducts, setTrendingProducts] = useState<IProduct[]>([]);
	const [trendingSearches, setTrendingSearches] = useState<SearchQuery[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasSearchResults, setHasSearchResults] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);

	const router = useRouter();
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
	const [lockSuggestions, setLockSuggestions] = useState(false);
	const DEBOUNCE_MS = 300;

	useEffect(() => {
		const id = setTimeout(() => setDebouncedQuery(searchQuery), DEBOUNCE_MS);
		return () => clearTimeout(id);
	}, [searchQuery]);

	useEffect(() => {
		const fetchTrendingProducts = async () => {
			setIsLoading(true);
			try {
				const response = await getTrendingProducts();
				if (response.status !== 200 || !response.data) {
					throw new Error(response.message || "No products found!");
				}
				setTrendingProducts(response.data.products);
				setProducts(response.data.products);
				setHasSearchResults(false);
			} catch (err: any) {
				console.error("Error fetching trending products:", err?.message || err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTrendingProducts();
	}, []);

	useEffect(() => {
		const fetchTrendingSearches = async () => {
			try {
				const pastQueries: SearchQuery[] = await getPopularSearchQueries(6);
				setTrendingSearches(pastQueries);
			} catch (err: any) {
				console.error("Error fetching trending searches:", err?.message || err);
			}
		};

		fetchTrendingSearches();
	}, []);

	useEffect(() => {
		const query = debouncedQuery.trim();
		const params = new URLSearchParams(searchParams);
		if (query === "") {
			params.set("search", "");
		} else if (query.length > 1) {
			params.set("search", query);
		}
		const newUrl = `${pathname}?${params.toString()}`;
		router.replace(newUrl, { scroll: false });
	}, [debouncedQuery, pathname, router, searchParams]);

	useEffect(() => {
		const query = debouncedQuery.trim();

		if (!query) {
			setSuggestions([]);
			setShowSuggestions(false);
			setProducts(trendingProducts);
			setDebouncedQuery("");
			setHasSearchResults(false);
			setHasSearched(false);
			return;
		}

		if (query.length < 2) {
			setSuggestions([]);
			setShowSuggestions(false);
			setHasSearched(false);
			return;
		}

		let cancelled = false;

		const runSearch = async () => {
			try {
				setIsLoading(true);

				const formData = new FormData();
				formData.append("query", query);
				const searchResponse = await searchItems(formData);

				if (cancelled) return;

				const foundProducts: IProduct[] = searchResponse.products ?? [];

				if (foundProducts.length === 0) {
					setProducts(trendingProducts);
					setHasSearchResults(false);
				} else {
					setProducts(foundProducts);
					setHasSearchResults(true);
				}

				setHasSearched(true);

				const pastQueries: SearchQuery[] = await getPopularSearchQueries(3, query);
				if (cancelled) return;

				const filtered = pastQueries
					.filter((item) => item.query.toLowerCase().includes(query.toLowerCase()))
					.slice(0, 6);

				setSuggestions(filtered);
				setShowSuggestions(!lockSuggestions && filtered.length > 0);
				if (!cancelled) setIsLoading(false);
			} catch (error) {
				if (cancelled) return;
				console.error("Error executing search action:", error);
				setProducts(trendingProducts);
				setHasSearchResults(false);
				setSuggestions([]);
				setShowSuggestions(false);
				setHasSearched(true);
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		};

		runSearch();

		return () => {
			cancelled = true;
			setIsLoading(false);
		};
	}, [debouncedQuery, trendingProducts, lockSuggestions]);

	const handleClear = () => {
		setSearchQuery("");
		setDebouncedQuery("");
		setSuggestions([]);
		setShowSuggestions(false);
		setProducts(trendingProducts);
		setHasSearchResults(false);
		setLockSuggestions(false);
		setHasSearched(false);
	};

	const handleSuggestionClick = (suggestion: SearchQuery) => {
		setSearchQuery(suggestion.query);
		setDebouncedQuery(suggestion.query);
		setShowSuggestions(false);
		setLockSuggestions(true);
		submitSearchQuery(suggestion.query);
	};

	const submitSearchQuery = async (query: string) => {
		const trimmedQuery = query.toLowerCase().trim();
		if (trimmedQuery.length < 4 || !hasSearchResults) {
			return;
		}

		try {
			const formData = new FormData();
			formData.append("query", trimmedQuery);
			await addSearchQuery(formData);
		} catch (error) {
			console.error("Error creating search query:", error);
		} finally {
			setShowSuggestions(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await submitSearchQuery(searchQuery);
	};

	const handleTrendingClick = (query: string) => {
		setSearchQuery(query);
		setDebouncedQuery(query);
		setShowSuggestions(false);
		setLockSuggestions(true);
	};

	useClickOutside(wrapperRef, () => {
		setShowSuggestions(false);
	});

	const hasQuery = searchQuery.trim().length > 1;

	const highlightedSuggestions = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		return suggestions
			.filter((s) => s.query.toLowerCase() !== query)
			.map((s) => {
				const lowerText = s.query.toLowerCase();
				const matchIndex = lowerText.indexOf(query);
				if (matchIndex === -1 || !query) {
					return { ...s, before: s.query, match: "", after: "" };
				}
				return {
					...s,
					before: s.query.substring(0, matchIndex),
					match: s.query.substring(matchIndex, matchIndex + query.length),
					after: s.query.substring(matchIndex + query.length),
				};
			});
	}, [suggestions, searchQuery]);

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.25, ease: "easeInOut" }}
			className="fixed inset-0 z-50 bg-white overflow-auto font-[Arial] text-black w-full pb-8"
		>
			<div className="custom-container !py-0">
				<div
					className="w-full flex justify-center items-center mt-8 md:mt-10"
					onClick={() => {
						onClose();
						router.back();
					}}
				>
					<Image
						src={Logo}
						alt="Logo"
						loading="eager"
						className="w-[110px] h-[22px] md:h-[26px] md:min-w-[130px] items-center cursor-pointer"
					/>
				</div>

				<div className="bg-white absolute top-6 right-6">
					<button
						onClick={() => {
							onClose();
							router.back();
						}}
						className=" text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center"
						aria-label="Close Search Modal"
					>
						<X className="w-6 h-6 p-0" strokeWidth={3} />
					</button>
				</div>

				<div className="w-full relative md:w-fit mx-auto mt-12">
					<div className="w-full md:w-[600px] lg:w-[798px] relative" ref={wrapperRef}>
						<div
							className={`relative p-3 border border-neutralGray-100 ${
								showSuggestions && highlightedSuggestions.length > 0 ? "rounded-t-[8px] border-b-0" : "rounded-[8px]"
							}`}
						>
							<div className="flex items-center gap-3 w-full">
								<form onSubmit={handleSubmit} className="w-full">
									<Input
										type="text"
										value={searchQuery}
										onChange={(e) => {
											setSearchQuery(e.target.value);
											setLockSuggestions(false); // user typed → allow suggestions again
										}}
										placeholder="Search for products"
										className="cursor-black h-auto w-full text-[14px] leading-[20px] border-none focus:border-none ring-0 focus:outline-none focus-within:border-none focus-visible:ring-0 shadow-none text-black"
									/>
								</form>
								{searchQuery && (
									<Button
										type="button"
										onClick={handleClear}
										className="text-black hover:text-black/80 border-none !p-0 !h-auto"
									>
										Clear
									</Button>
								)}
							</div>
						</div>

						{showSuggestions && highlightedSuggestions.length > 0 && (
							<div className="absolute space-y-3 bg-white px-3 w-full z-20 border border-t-0 border-neutralGray-100 pb-3 rounded-b-[8px]">
								{highlightedSuggestions.map((s) => (
									<button
										key={s._id}
										onClick={() => handleSuggestionClick(s)}
										className="w-full flex items-center gap-2 text-left bg-white"
									>
										<Search className="w-4 h-4 text-neutralGray-500 flex-shrink-0" />
										<div className="flex-1 text-[14px] leading-[20px]">
											<span className="text-neutralGray-500">{s.before}</span>
											<span className="text-black font-medium">{s.match}</span>
											<span className="text-neutralGray-500">{s.after}</span>
										</div>
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{hasQuery && !isLoading && hasSearched && hasSearchResults === false && debouncedQuery.trim().length > 1 && (
					<div className="text-center text-gray-50 flex flex-col gap-3 items-center text-[14px] leading-[20px] mt-6 lg:mt-8">
						<Search className="w-8 h-8 text-black" />
						<div>
							We couldn't find any matches for <span className="font-bold">"{searchQuery}"</span>
							<div>Please check your spelling or try searching with a different keyword.</div>
						</div>
					</div>
				)}

				{searchQuery.trim().length < 2 && !isLoading && (
					<div className="mt-[28px] xl:mt-8 w-full flex justify-center items-center text-center text-neutralGray-700 text-[14px] leading-[20px]">
						<div className="overflow-x-auto scrollbar-hide w-fit">
							<div className="flex gap-6 w-max justify-center items-center">
								{trendingSearches.length > 0 && (
									<>
										Trending Searches
										{trendingSearches.map((item) => (
											<button
												key={item._id}
												className="whitespace-nowrap"
												onClick={() => handleTrendingClick(item.query)}
											>
												{item.query}
											</button>
										))}
									</>
								)}
							</div>
						</div>
					</div>
				)}

				<div className="font-bold">
					{hasQuery && hasSearchResults ? (
						<div className="text-[16px] leading-6 md:text-[18px] md:leading-6 md:mt-10 my-5 md:mb-6 h-[34px] flex items-center justify-between">
							{products.length} Search results
							<Filter aria-label="Filter products" />
						</div>
					) : (
						<div className="text-[16px] leading-6 md:text-[28px] md:leading-8 mt-5 md:mt-[72px] my-5 md:mb-10 flex items-center h-[34px]">
							Trending Products
						</div>
					)}
				</div>

				<div className="flex flex-col gap-5 md:gap-9 relative">
					<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-y-5 gap-x-[15px] lg:gap-x-6 lg:gap-y-10 sm:justify-start">
						{products.map((product) => (
							<ProductCard key={product._id.toString()} product={product} onProductClick={onClose} />
						))}
					</div>
					{isLoading && (
						<div className="absolute w-full h-full inset-0 bg-white/70 z-40 flex justify-center rounded-[0.5rem]">
							<Loader2 size={16} className="animate-spin text-neutral-400 w-10 h-10 mt-40" />
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default SearchModal;
