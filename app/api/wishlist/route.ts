import { NextRequest, NextResponse } from "next/server";
import { getUserWishlist, updateWishlist } from "@/backend/actions/wishlists/wishlist";

// **GET Wishlist for a Specific User**
export async function GET(request: NextRequest) {
	try {
		// Extract token from Authorization header
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		// Fetch wishlist
		const response = await getUserWishlist(token);

		return NextResponse.json(response, { status: response.status });
	} catch (error: unknown) {
		console.error("Error in GET /wishlist:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}

// **PATCH: Update Wishlist (Add or Remove Products)**
export async function PATCH(request: NextRequest) {
	try {
		// Extract token from Authorization header
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		// Parse request body for update data
		const { userId, productIds }: { userId: string; productIds: string[] } = await request.json();

		if (!userId || !Array.isArray(productIds)) {
			return NextResponse.json(
				{ success: false, message: "User ID and productIds array are required." },
				{ status: 400 }
			);
		}

		// Update wishlist with the new product array
		const response = await updateWishlist({ userId, productIds });

		return NextResponse.json(response, { status: response.status });
	} catch (error: unknown) {
		console.error("Error in PATCH /wishlist:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}
