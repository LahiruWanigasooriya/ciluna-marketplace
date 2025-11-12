import React from "react";
import WishlistList from "./WishlistList";
import SwiperCards from "@/components/custom/SwiperCards";
import { getAllProducts } from "@/backend/actions/products/product";
import { IProduct } from "@/types/product";
// import { getCilunaPrice } from "@/lib/cilunaService";
//import toFixed from "@/functions/cilunaPrice";

const WishlistPage = async () => {
	// const price = await getCilunaPrice();
	const productres = await getAllProducts();
	const products: IProduct[] = productres.data?.products || [];

	const cilunaPrice = 0;
	// toFixed(Number(price));
	return (
		<div className="flex flex-col pt-[60px] md:mt-[108px] w-full custom-container md:py-0 text-black">
			<div className="py-6 md:pt-[80px] md:pb-12">
				<WishlistList cilunaPrice={cilunaPrice} />
			</div>

			<div className="py-8 md:pt-12 md:pb-20">
				<SwiperCards
					products={products}
					section={{
						category: "Flash Deals",
						title: "Recent Viewed",
						description: "A fleeting collection of rare beauty.",
					}}
				/>
			</div>
		</div>
	);
};

export default WishlistPage;
