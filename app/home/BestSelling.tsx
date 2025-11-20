import React from "react";
import { IProduct } from "@/types/product";
import SwiperCards from "@/components/custom/SwiperCards";
import { getTrendingProducts } from "@/backend/actions/products/product";

const BestSelling = async () => {
	const productres = await getTrendingProducts();

	if (!productres.success || !productres.data) {
		return (
			<div className="p-4">
				<h2>{productres.message || "No products found in this section!"}</h2>
			</div>
		);
	}

	const products: IProduct[] = productres.data?.products;

	return (
		<div className="custom-container py-[24px] sm:py-[32px] lg:py-[96px]">
			<SwiperCards
				products={products}
				section={{
					category: "Jewellery",
					title: "Best Seller",
					description: "Chosen again and again for elegance that endures",
				}}
			/>
		</div>
	);
};

export default BestSelling;
