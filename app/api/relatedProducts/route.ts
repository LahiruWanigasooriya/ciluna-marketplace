import { NextResponse } from "next/server";
import { getRelatedProducts } from "@/backend/actions/products/product";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract and validate query parameters
		const limitParam = searchParams.get("limit");
		const productID = searchParams.get("productID");

		// Validate productID
		if (!productID) {
			return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
		}

		// Validate limit
		const limit = limitParam ? parseInt(limitParam, 10) : 10;
		if (isNaN(limit) || limit < 1) {
			return NextResponse.json({ success: false, message: "Invalid limit parameter" }, { status: 400 });
		}

		// Call getRelatedProducts
		const result = await getRelatedProducts(productID, limit);

		return NextResponse.json(
			{
				success: result.success,
				message: result.message,
				data: result.data,
				error: result.error,
			},
			{ status: result.status }
		);
	} catch (error: unknown) {
		let errorMessage = "Internal server error";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
	}
}
