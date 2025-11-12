"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import WishlistModel from "../../models/wishlist";
import { IWishlist } from "@/types/wishlist";
import { verifyToken } from "../utils/auth";
import ProductModel from "../../models/product";
import { cookies } from "next/headers";

// Get wishlist for a specific user
export const getUserWishlist = async (token?: string) => {
	try {
		await dbConnectMarketPlace();

		// Get token from cookies if not provided
		const authToken = token || (await cookies()).get("authToken")?.value;

		if (!authToken) {
			return {
				status: 401,
				success: false,
				message: "Unauthorized: No token provided",
				user: null,
			};
		}

		const tokenResponse = await verifyToken(authToken);

		if (tokenResponse.status !== 200) {
			return { success: false, message: tokenResponse.message }; // Return error if token is invalid
		}

		const userId = tokenResponse.userId; // Extract userId from the token response

		// Find the user's wishlist and explicitly type it
		const wishlist = (await WishlistModel.findOne({ user: userId })
			.populate({
				path: "products",
				select: "", // Selects all fields
			})
			.lean()) as IWishlist | null; // ✅ Explicitly cast as IWishlist

		if (!wishlist) {
			return {
				status: 200,
				success: true,
				message: "No wishlist found",
				data: { wishProductList: [] }, // Return empty array if no wishlist exists
			};
		}

		return {
			status: 200,
			success: true,
			message: "WishProductList fetched successfully",
			data: { wishProductList: JSON.parse(JSON.stringify(wishlist.products)) }, // Return only product details
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching wishlist",
			error: error.message,
		};
	}
};

// Update wishlist: Create if not exists & replace with new product array
export const updateWishlist = async ({ userId, productIds }: { userId: string; productIds: string[] }) => {
	try {
		await dbConnectMarketPlace();

		// Get the existing wishlist of the user
		let wishlist = await WishlistModel.findOne({ user: userId });

		if (!wishlist) {
			// Create a new wishlist if it doesn't exist
			wishlist = new WishlistModel({ user: userId, products: productIds });
			await wishlist.save();

			// Increment wishCount for newly added products
			await ProductModel.updateMany({ _id: { $in: productIds } }, { $inc: { wishCount: 1 } });

			return {
				status: 200,
				success: true,
				message: "Products added to wishlist",
				data: { wishlist: wishlist.products },
			};
		}

		// Ensure wishlist.products is always an array
		const prevProductIds: string[] = (wishlist.products ?? []).map((p: any) => p.toString());

		// Determine which products are being toggled (added or removed)
		const productsToAdd = productIds.filter((id) => !prevProductIds.includes(id));
		const productsToRemove = productIds.filter((id) => prevProductIds.includes(id));

		// Update wishCount for added products
		if (productsToAdd.length > 0) {
			await ProductModel.updateMany({ _id: { $in: productsToAdd } }, { $inc: { wishCount: 1 } });
		}

		// Update wishCount for removed products
		if (productsToRemove.length > 0) {
			await ProductModel.updateMany({ _id: { $in: productsToRemove } }, { $inc: { wishCount: -1 } });
		}

		// Update the wishlist
		// Remove products that are being toggled off (unliked)
		const updatedProducts = [...prevProductIds.filter((id) => !productsToRemove.includes(id)), ...productsToAdd];

		wishlist.products = updatedProducts;
		await wishlist.save();

		return {
			status: 200,
			success: true,
			message: "Wishlist updated successfully",
			data: { wishlist: updatedProducts },
		};
	} catch (error: any) {
		console.error("Error in updateWishlist:", error);
		return {
			status: 500,
			success: false,
			message: "An error occurred while updating the wishlist",
			error: error.message,
		};
	}
};

export const getProductWishCount = async (productId: string) => {
	try {
		await dbConnectMarketPlace();

		const product = await ProductModel.findById(productId).select("wishCount");

		if (!product) {
			return { success: false, message: "Product not found" };
		}

		return { success: true, wishCount: product.wishCount };
	} catch (error: any) {
		return { success: false, message: "Error fetching wishCount", error: error.message };
	}
};
