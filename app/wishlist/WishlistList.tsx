"use client";

import React from "react";
import ProductCard from "@/app/product/ProductCard";
import { useWishlistStore } from "@/store/wishlist";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const WishlistClient = ({ cilunaPrice }: { cilunaPrice: number }) => {
	const { wishlist } = useWishlistStore();
	const { isAuthenticated } = useAuthStore();
	const router = useRouter();

	return (
		<div className="flex flex-col gap-10 md:gap-20 font-[Arial] text-black">
			<div className={`flex flex-col items-center w-full ${isAuthenticated ? "hidden" : "block mt-10 md:mt-0"}`}>
				<div className="font-kaiseiHarunoUmi text-[20px] leading-6 md:text-[24px] md:leading-8">
					Never Lose Favorites Again
				</div>
				<div className="text-[14px] leading-5 md:text-[16px] md:leading-6 mt-3 mb-4 md:mb-8">
					Sign In to easily save your selections.
				</div>
				<Button
					className="w-full md:w-[121px] h-[56px] text-[18px] leading-6 bg-black text-white border-none rounded-[8px] hover:bg-obsidian-900"
					onClick={() => router.push("/login")}
				>
					Sign In
				</Button>
			</div>
			<div className="space-y-4 md:space-y-9">
				<div className="font-arialBold text-[20px] leading-6 md:text-[24px] md:leading-8">Wishlist</div>
				{wishlist.length > 0 ? (
					<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-y-5 gap-x-[15px] lg:gap-x-6 lg:gap-y-10 sm:justify-start">
						{wishlist.map((product: IProduct) => (
							<ProductCard key={product._id.toString()} product={product} />
						))}
					</div>
				) : (
					<p className="font-medium text-black text-center">Your wishlist is empty.</p>
				)}
			</div>
		</div>
	);
};

export default WishlistClient;
